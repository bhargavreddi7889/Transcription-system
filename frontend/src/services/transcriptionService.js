import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

export const transcriptionService = {
  // Upload a file for transcription
  uploadFile: async (file, language = 'en') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);
    
    return await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get status of a specific job
  getJobStatus: async (jobId) => {
    return await api.get(`/status/${jobId}`);
  },

  // Get all jobs
  getAllJobs: async () => {
    return await api.get('/jobs');
  },

  // Download transcript
  downloadTranscript: async (jobId) => {
    const response = await api.get(`/download/${jobId}`, {
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transcript_${jobId}.txt`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  // Delete a job
  deleteJob: async (jobId) => {
    return await api.delete(`/delete/${jobId}`);
  },

  // Health check
  healthCheck: async () => {
    return await api.get('/health');
  },
}; 