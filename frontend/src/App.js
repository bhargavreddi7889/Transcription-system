import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import TranscriptionList from './components/TranscriptionList';
import Header from './components/Header';
import { transcriptionService } from './services/transcriptionService';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await transcriptionService.getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    
    // Poll for updates every 2 seconds
    const interval = setInterval(fetchJobs, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = async (file, language = 'en') => {
    try {
      const response = await transcriptionService.uploadFile(file, language);
      // Refresh jobs list
      fetchJobs();
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await transcriptionService.deleteJob(jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleDownload = async (jobId) => {
    try {
      await transcriptionService.downloadTranscript(jobId);
    } catch (error) {
      console.error('Error downloading transcript:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FileUpload onUpload={handleFileUpload} />
              
              {/* Stats Card */}
              <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Jobs</span>
                    <span className="font-semibold text-slate-900">{jobs.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Completed</span>
                    <span className="font-semibold text-green-600">
                      {jobs.filter(job => job.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Processing</span>
                    <span className="font-semibold text-blue-600">
                      {jobs.filter(job => job.status === 'processing').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Failed</span>
                    <span className="font-semibold text-red-600">
                      {jobs.filter(job => job.status === 'error').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transcriptions List */}
          <div className="lg:col-span-2">
            <TranscriptionList 
              jobs={jobs}
              loading={loading}
              onDelete={handleDeleteJob}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 