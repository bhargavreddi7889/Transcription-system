from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import whisper
import json
import uuid
from werkzeug.utils import secure_filename
import threading
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = './uploads'
TRANSCRIPTIONS_FOLDER = './transcriptions'
SUPPORTED_FORMATS = {'.mp3', '.wav', '.mp4', '.mkv', '.mov', '.flv', '.aac', '.m4a'}
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(TRANSCRIPTIONS_FOLDER, exist_ok=True)

# In-memory storage for job status (in production, use a database)
transcription_jobs = {}

def allowed_file(filename):
    return '.' in filename and \
           os.path.splitext(filename)[1].lower() in SUPPORTED_FORMATS

def transcribe_file_async(job_id, file_path, language="en"):
    """Asynchronous transcription function"""
    try:
        transcription_jobs[job_id]['status'] = 'processing'
        transcription_jobs[job_id]['progress'] = 0
        
        # Load Whisper model
        model = whisper.load_model("base")  # Using base model for faster processing
        transcription_jobs[job_id]['progress'] = 20
        
        # Transcribe
        result = model.transcribe(file_path, language=language)
        transcription_jobs[job_id]['progress'] = 80
        
        # Save transcription
        transcript_filename = f"{job_id}_transcript.txt"
        transcript_path = os.path.join(TRANSCRIPTIONS_FOLDER, transcript_filename)
        
        with open(transcript_path, "w", encoding="utf-8") as f:
            f.write(result['text'])
        
        transcription_jobs[job_id]['status'] = 'completed'
        transcription_jobs[job_id]['progress'] = 100
        transcription_jobs[job_id]['result'] = result['text']
        transcription_jobs[job_id]['transcript_file'] = transcript_filename
        transcription_jobs[job_id]['completed_at'] = datetime.now().isoformat()
        
    except Exception as e:
        transcription_jobs[job_id]['status'] = 'error'
        transcription_jobs[job_id]['error'] = str(e)
        print(f"Error transcribing file: {e}")

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not supported'}), 400
    
    # Generate unique job ID
    job_id = str(uuid.uuid4())
    
    # Save file
    filename = secure_filename(file.filename)
    original_ext = os.path.splitext(filename)[1]
    saved_filename = f"{job_id}{original_ext}"
    file_path = os.path.join(UPLOAD_FOLDER, saved_filename)
    file.save(file_path)
    
    # Initialize job
    transcription_jobs[job_id] = {
        'id': job_id,
        'filename': filename,
        'status': 'queued',
        'progress': 0,
        'created_at': datetime.now().isoformat(),
        'file_path': file_path
    }
    
    # Start transcription in background
    language = request.form.get('language', 'en')
    thread = threading.Thread(target=transcribe_file_async, args=(job_id, file_path, language))
    thread.daemon = True
    thread.start()
    
    return jsonify({'job_id': job_id, 'status': 'queued'})

@app.route('/api/status/<job_id>')
def get_status(job_id):
    if job_id not in transcription_jobs:
        return jsonify({'error': 'Job not found'}), 404
    
    return jsonify(transcription_jobs[job_id])

@app.route('/api/jobs')
def get_all_jobs():
    # Return all jobs sorted by created_at
    jobs = list(transcription_jobs.values())
    jobs.sort(key=lambda x: x['created_at'], reverse=True)
    return jsonify(jobs)

@app.route('/api/download/<job_id>')
def download_transcript(job_id):
    if job_id not in transcription_jobs:
        return jsonify({'error': 'Job not found'}), 404
    
    job = transcription_jobs[job_id]
    if job['status'] != 'completed':
        return jsonify({'error': 'Transcription not completed'}), 400
    
    return send_from_directory(TRANSCRIPTIONS_FOLDER, job['transcript_file'], as_attachment=True)

@app.route('/api/delete/<job_id>', methods=['DELETE'])
def delete_job(job_id):
    if job_id not in transcription_jobs:
        return jsonify({'error': 'Job not found'}), 404
    
    job = transcription_jobs[job_id]
    
    # Delete files
    try:
        if os.path.exists(job['file_path']):
            os.remove(job['file_path'])
        if 'transcript_file' in job:
            transcript_path = os.path.join(TRANSCRIPTIONS_FOLDER, job['transcript_file'])
            if os.path.exists(transcript_path):
                os.remove(transcript_path)
    except Exception as e:
        print(f"Error deleting files: {e}")
    
    # Remove from jobs
    del transcription_jobs[job_id]
    
    return jsonify({'message': 'Job deleted successfully'})

@app.route('/api/health')
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Transcription API is running'})

if __name__ == '__main__':
    print("Starting Transcription API server...")
    print("Supported formats:", list(SUPPORTED_FORMATS))
    app.run(debug=True, host='0.0.0.0', port=5000) 