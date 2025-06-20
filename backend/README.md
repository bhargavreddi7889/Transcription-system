# Transcription System Backend

A Flask-based REST API for transcribing audio and video files using OpenAI's Whisper model. Handles file uploads, asynchronous transcription processing, and result management.

## Features

- 🎵 **Multi-format Support**: MP3, WAV, MP4, MOV, AAC, M4A, MKV, FLV
- 🌐 **Multi-language**: Support for 10+ languages
- 🔄 **Asynchronous Processing**: Non-blocking transcription with progress tracking
- 📊 **RESTful API**: Clean, well-documented endpoints
- 🚀 **OpenAI Whisper**: State-of-the-art speech recognition

## Tech Stack

- **Flask**: Web framework
- **OpenAI Whisper**: AI transcription model
- **Flask-CORS**: Cross-origin resource sharing
- **Werkzeug**: File handling utilities

## Installation

1. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the server**
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Upload File
```http
POST /api/upload
Content-Type: multipart/form-data

Form Data:
- file: Audio/video file
- language: Language code (optional, default: "en")
```

### Get All Jobs
```http
GET /api/jobs
```

### Get Job Status
```http
GET /api/status/<job_id>
```

### Download Transcript
```http
GET /api/download/<job_id>
```

### Delete Job
```http
DELETE /api/delete/<job_id>
```

### Health Check
```http
GET /api/health
```

## Supported Languages

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Japanese (ja)
- Korean (ko)
- Chinese (zh)

## Configuration

### Environment Variables

You can customize the following settings:

```python
# Configuration
UPLOAD_FOLDER = './uploads'
TRANSCRIPTIONS_FOLDER = './transcriptions'
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB
```

### Whisper Model

The API uses the "base" Whisper model by default for faster processing. You can change this in `app.py`:

```python
model = whisper.load_model("medium")  # or "small", "large", etc.
```

Available models:
- `tiny`: Fastest, least accurate
- `base`: Good balance of speed and accuracy
- `small`: Better accuracy, slower
- `medium`: High accuracy, slower
- `large`: Best accuracy, slowest

## File Storage

The API stores files in local directories:
- `uploads/`: Temporary storage for uploaded files
- `transcriptions/`: Completed transcription text files

For production, consider using cloud storage (AWS S3, Google Cloud Storage, etc.).

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad request (invalid file, missing parameters)
- `404`: Job not found
- `500`: Server error

## Production Deployment

### Using Gunicorn

1. **Install Gunicorn**
   ```bash
   pip install gunicorn
   ```

2. **Run with Gunicorn**
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

### Using Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM python:3.9-slim
   
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   
   COPY . .
   
   EXPOSE 5000
   CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
   ```

2. **Build and run**
   ```bash
   docker build -t transcription-api .
   docker run -p 5000:5000 transcription-api
   ```

### Environment Variables for Production

```bash
export FLASK_ENV=production
export CORS_ORIGINS=https://your-frontend-domain.com
export MAX_CONTENT_LENGTH=104857600  # 100MB
```

## Performance Considerations

- **CPU**: Whisper is CPU-intensive. Use multiple workers for better performance
- **Memory**: Larger models require more RAM (base: ~1GB, large: ~3GB)
- **Storage**: Consider implementing file cleanup for old transcriptions
- **Caching**: Cache Whisper models to avoid reloading

## Security

- **File Validation**: Only allows specific file types and sizes
- **Secure Filenames**: Uses `secure_filename()` to prevent path traversal
- **CORS**: Configure CORS origins for production
- **Rate Limiting**: Consider implementing rate limiting for production use

## Monitoring

Consider adding:
- Logging for all API requests
- Metrics for transcription times
- Health checks for model availability
- Alert system for failures

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for any new functionality
4. Submit a pull request 