# Transcription System Frontend

A modern React frontend for the AI transcription system, featuring drag-and-drop file uploads, real-time progress tracking, and beautiful UI components.

## Features

- 🎨 **Modern UI**: Built with React 18 and Tailwind CSS
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎯 **Drag & Drop**: Intuitive file upload experience
- ⏱️ **Real-time Updates**: Live transcription progress tracking
- 🌐 **Multi-language**: Support for 10+ languages
- 📄 **Easy Export**: View, copy, or download transcriptions

## Tech Stack

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful SVG icons
- **React Dropzone**: Drag-and-drop functionality
- **Axios**: HTTP client for API calls

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Environment Variables

Create a `.env` file in the frontend directory to customize settings:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── FileUpload.js
│   │   ├── TranscriptionList.js
│   │   ├── TranscriptionCard.js
│   │   └── TranscriptionModal.js
│   ├── services/
│   │   └── transcriptionService.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Styling
The app uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom colors
        }
      }
    }
  }
}
```

### API Integration
Update the API base URL in `src/services/transcriptionService.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
```bash
npx vercel --prod
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request 