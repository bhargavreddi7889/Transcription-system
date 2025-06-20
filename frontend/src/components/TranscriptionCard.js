import React from 'react';
import { 
  DocumentIcon, 
  MusicalNoteIcon, 
  VideoCameraIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const TranscriptionCard = ({ job, onDelete, onDownload, onViewTranscript }) => {
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['mp3', 'wav', 'aac', 'm4a'].includes(ext)) {
      return <MusicalNoteIcon className="w-5 h-5" />;
    } else if (['mp4', 'mkv', 'mov', 'flv'].includes(ext)) {
      return <VideoCameraIcon className="w-5 h-5" />;
    }
    return <DocumentIcon className="w-5 h-5" />;
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircleIcon className="w-5 h-5" />,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          text: 'Completed'
        };
      case 'processing':
        return {
          icon: <Cog6ToothIcon className="w-5 h-5 animate-spin" />,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          text: 'Processing'
        };
      case 'queued':
        return {
          icon: <ClockIcon className="w-5 h-5" />,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          text: 'Queued'
        };
      case 'error':
        return {
          icon: <XCircleIcon className="w-5 h-5" />,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          text: 'Failed'
        };
      default:
        return {
          icon: <ClockIcon className="w-5 h-5" />,
          color: 'text-slate-600',
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-200',
          text: 'Unknown'
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const statusInfo = getStatusInfo(job.status);

  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* File Icon */}
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 flex-shrink-0">
            {getFileIcon(job.filename)}
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-slate-900 truncate" title={job.filename}>
              {job.filename}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Uploaded {formatDate(job.created_at)}
            </p>
            
            {/* Progress Bar for Processing */}
            {job.status === 'processing' && job.progress > 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Progress</span>
                  <span>{job.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${job.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {job.status === 'error' && job.error && (
              <p className="text-sm text-red-600 mt-1 p-2 bg-red-50 rounded border border-red-200">
                {job.error}
              </p>
            )}
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center space-x-3 ml-4">
          {/* Status Badge */}
          <div className={`
            inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border
            ${statusInfo.color} ${statusInfo.bgColor} ${statusInfo.borderColor}
          `}>
            {statusInfo.icon}
            <span>{statusInfo.text}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1">
            {job.status === 'completed' && (
              <>
                <button
                  onClick={() => onViewTranscript(job)}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View transcript"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDownload(job.id)}
                  className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Download transcript"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => onDelete(job.id)}
              className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete job"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionCard; 