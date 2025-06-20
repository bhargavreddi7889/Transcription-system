import React from 'react';
import { SpeakerWaveIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg">
              <SpeakerWaveIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">AI Transcription</h1>
              <p className="text-slate-600">Convert audio & video to text instantly</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-600">
              <MicrophoneIcon className="w-5 h-5" />
              <span className="text-sm">Powered by OpenAI Whisper</span>
            </div>
            <div className="h-6 w-px bg-slate-300"></div>
            <div className="text-sm text-slate-600">
              Supports MP3, WAV, MP4, and more
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 