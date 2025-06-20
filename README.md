# AI Transcription System

A modern, full-stack web application for transcribing audio and video files using OpenAI's Whisper model. Features a beautiful React frontend with real-time progress tracking and a Flask backend for processing.

## Features

- 🎵 **Multi-format Support**: MP3, WAV, MP4, MOV, AAC, M4A, MKV, FLV
- 🌐 **Multi-language**: Support for 10+ languages including English, Spanish, French, German, etc.
- 📱 **Modern UI**: Beautiful, responsive interface with drag-and-drop upload
- ⏱️ **Real-time Progress**: Live transcription progress with status updates
- 📄 **Easy Export**: View, copy, or download transcriptions as text files
- 🚀 **Fast Processing**: Powered by OpenAI Whisper for accurate transcriptions

## Screenshots

- Drag-and-drop file upload with language selection
- Real-time transcription progress tracking
- Beautiful transcription results with copy/download options
- Responsive design that works on all devices

## Tech Stack

### Backend
- **Flask**: Web framework
- **OpenAI Whisper**: AI transcription model
- **Flask-CORS**: Cross-origin resource sharing
- **Werkzeug**: File handling utilities

### Frontend
- **React 18**: Modern UI framework
- **Tailwind CSS**: Utility-first styling
- **Heroicons**: Beautiful icon set
- **React Dropzone**: Drag-and-drop functionality
- **Axios**: HTTP client

## Project Structure

```
transcription-system/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── uploads/           # Temporary file storage
│   ├── transcriptions/    # Completed transcripts
│   └── README.md          # Backend documentation
├── frontend/               # React web application
│   ├── src/               
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── App.js         # Main React component
│   ├── public/            # Static files
│   ├── package.json       # Node.js dependencies
│   ├── tailwind.config.js # Tailwind CSS config
│   └── README.md          # Frontend documentation
├── media_folder/           # Your original transcription files
├── transcription_system.py # Your original Python script
├── transcribe.py          # Your original simple script
└── README.md              # This file
```

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd transcription-system
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the Flask server**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

## Usage

1. **Open the application** in your browser at `http://localhost:3000`

2. **Select language** from the dropdown (defaults to English)

3. **Upload a file** by either:
   - Dragging and dropping onto the upload area
   - Clicking to browse and select a file

4. **Monitor progress** as your file is transcribed

5. **View results** by clicking the eye icon when complete

6. **Download or copy** the transcription text

## API Endpoints

- `POST /api/upload` - Upload a file for transcription
- `GET /api/jobs` - Get all transcription jobs
- `GET /api/status/<job_id>` - Get status of specific job
- `GET /api/download/<job_id>` - Download transcript file
- `DELETE /api/delete/<job_id>` - Delete a transcription job
- `GET /api/health` - Health check endpoint

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

## File Size Limits

- Maximum file size: 100MB per upload
- Supported formats: MP3, WAV, MP4, MOV, AAC, M4A, MKV, FLV

## Development

### Building for Production

1. **Build the React app**
   ```bash
   npm run build
   ```

2. **Serve with a production server** (e.g., nginx, Apache)

### Environment Variables

You can customize the following environment variables:

- `FLASK_ENV`: Set to `production` for production deployment
- `UPLOAD_FOLDER`: Custom upload directory path
- `MAX_FILE_SIZE`: Maximum file size in bytes

## Deployment

For production deployment:

1. **Use a production WSGI server** like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. **Build and serve the React app** with a web server

3. **Configure CORS** for your production domain

4. **Set up file storage** and consider using cloud storage for uploads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include error messages and system information

## Acknowledgments

- OpenAI for the amazing Whisper model
- The React and Flask communities
- All contributors to this project 