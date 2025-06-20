import React, { useState } from 'react';
import TranscriptionCard from './TranscriptionCard';
import TranscriptionModal from './TranscriptionModal';

const TranscriptionList = ({ jobs, loading, onDelete, onDownload }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewTranscript = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-slate-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            Transcriptions ({jobs.length})
          </h2>
          <p className="text-slate-600 mt-1">
            Monitor your transcription jobs and download results
          </p>
        </div>

        <div className="p-6">
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No transcriptions yet</h3>
              <p className="text-slate-600">Upload an audio or video file to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <TranscriptionCard
                  key={job.id}
                  job={job}
                  onDelete={onDelete}
                  onDownload={onDownload}
                  onViewTranscript={handleViewTranscript}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedJob && (
        <TranscriptionModal
          job={selectedJob}
          onClose={closeModal}
          onDownload={onDownload}
        />
      )}
    </>
  );
};

export default TranscriptionList; 