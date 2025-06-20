import React from 'react';
import { 
  XMarkIcon, 
  DocumentDuplicateIcon, 
  ArrowDownTrayIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const TranscriptionModal = ({ job, onClose, onDownload }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(job.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Transcription Result
            </h2>
            <p className="text-slate-600 mt-1 truncate">{job.filename}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <p className="text-slate-900 leading-relaxed whitespace-pre-wrap">
                {job.result || 'No transcription available.'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="text-sm text-slate-600">
              {job.completed_at && (
                <span>Completed {new Date(job.completed_at).toLocaleString()}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={copyToClipboard}
                className={`
                  inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${copied 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }
                `}
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <DocumentDuplicateIcon className="w-4 h-4" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => onDownload(job.id)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionModal; 