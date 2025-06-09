import axios from 'axios';
import { LeaveRequest, LeaveStatusUpdate, Student, AIRequest, AIResponse } from '../types';

// Define your FastAPI backend URL
const API_BASE_URL = 'http://127.0.0.1:8000';


// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const leaveService = {
  // Get all leave requests (admin)
  getAllLeaveRequests: async (): Promise<LeaveRequest[]> => {
    try {
      const response = await apiClient.get('/admin/leaves');
      return response.data;
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      throw error;
    }
  },

  // Get leave history for a specific student
  getLeaveHistory: async (studentId: string): Promise<LeaveRequest[]> => {
    try {
      const response = await apiClient.get(`/leave/history/${studentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching leave history for student ${studentId}:`, error);
      throw error;
    }
  },

  // Submit a new leave request
  submitLeaveRequest: async (leaveRequest: LeaveRequest): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post('/leave/submit', leaveRequest);
      return response.data;
    } catch (error) {
      console.error('Error submitting leave request:', error);
      throw error;
    }
  },

  // Update leave request status
  updateLeaveStatus: async (update: LeaveStatusUpdate): Promise<{ message: string }> => {
    try {
      const response = await apiClient.put('/leave/update-status', update);
      return response.data;
    } catch (error) {
      console.error('Error updating leave status:', error);
      throw error;
    }
  },

  // Accept leave (admin)
  acceptLeave: async (studentId: string, date: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post(`/admin/leaves/${studentId}/${date}/accept`);
      return response.data;
    } catch (error) {
      console.error('Error accepting leave request:', error);
      throw error;
    }
  },

  // Reject leave (admin)
  rejectLeave: async (studentId: string, date: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post(`/admin/leaves/${studentId}/${date}/reject`);
      return response.data;
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      throw error;
    }
  },

  // Register a new student
  registerStudent: async (student: Student): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post('/students/register', student);
      return response.data;
    } catch (error) {
      console.error('Error registering student:', error);
      throw error;
    }
  },

  // Get total number of students
  getTotalStudents: async (): Promise<{ count: number }> => {
    try {
      const response = await apiClient.get('/students/total');
      return response.data;
    } catch (error) {
      console.error('Error fetching total students:', error);
      throw error;
    }
  },

  // Get all students
  getAllStudents: async (): Promise<Student[]> => {
    try {
      const response = await apiClient.get('/students/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all students:', error);
      throw error;
    }
  },

  // AI query endpoint
  sendAIQuery: async (request: AIRequest): Promise<AIResponse> => {
    try {
      const response = await apiClient.post('/ai/query', request);
      return response.data;
    } catch (error) {
      console.error('Error sending AI query:', error);
      throw error;
    }
  }
};
