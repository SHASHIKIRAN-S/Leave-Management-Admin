import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { LeaveRequest, Student } from '../../types';
import Card, { CardContent } from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import { Search, Users } from 'lucide-react';
import { format } from 'date-fns';

interface StudentStats {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
  recentRequest: LeaveRequest | null;
}

// ==========================================================
// IMPORTANT: Moved these utility functions ABOVE the component
// This resolves "Cannot find name 'getUniqueStudents'" error
// ==========================================================

// Get unique student IDs from students array
const getUniqueStudents = (students: Student[]) => {
  return students.map(student => student.student_id);
};

// Get leave statistics for a student
const getStudentStats = (studentId: string, requests: LeaveRequest[]) => {
  const studentRequests = requests.filter((req) => req.student_id === studentId);

  const stats = {
    total: studentRequests.length,
    approved: studentRequests.filter((req) => req.status === 'approved').length,
    rejected: studentRequests.filter((req) => req.status === 'rejected').length,
    pending: studentRequests.filter((req) => req.status === 'pending').length,
    recentRequest: studentRequests.length > 0
      ? studentRequests.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
      : null
  };

  return stats;
};
// ==========================================================


interface StudentsListProps {
  leaveRequests: LeaveRequest[];
  isLoading: boolean;
  allStudents: Student[];
}

const StudentsList: React.FC<StudentsListProps> = ({ leaveRequests, isLoading, allStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentDetails, setStudentDetails] = useState<Record<string, StudentStats>>({});

  const currentStudents = allStudents || [];

  const uniqueStudentIds = React.useMemo(() => getUniqueStudents(currentStudents), [currentStudents]);

  const filteredStudents = React.useMemo(() => {
    return uniqueStudentIds.filter((studentId: string) => {
      const student = currentStudents.find(s => s.student_id === studentId);
      return student ?
        student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
        : false;
    });
  }, [uniqueStudentIds, searchTerm, currentStudents]);

  // ==========================================================
  // New console log to track 'allStudents' reference
  // ==========================================================
  const prevAllStudentsRef = useRef<Student[]>();
  useEffect(() => {
    if (prevAllStudentsRef.current && prevAllStudentsRef.current !== allStudents) {
      console.log('StudentsList - allStudents prop reference CHANGED!');
    } else if (!prevAllStudentsRef.current && allStudents) {
      console.log('StudentsList - allStudents prop received for the first time.');
    }
    prevAllStudentsRef.current = allStudents;
  }, [allStudents]);
  // ==========================================================

  // Original PROBLEM useEffect - Line 84 in your previous code
  useEffect(() => {
    // Prepare student statistics
    const details: Record<string, StudentStats> = {};
    uniqueStudentIds.forEach((studentId) => {
      details[studentId] = getStudentStats(studentId, leaveRequests);
    });
    setStudentDetails(details);
  }, [leaveRequests, uniqueStudentIds]); // Dependencies are correct here if uniqueStudentIds is stable


  // Console logs are correctly placed here
  console.log("StudentsList Component - isLoading:", isLoading);
  console.log("StudentsList Component - allStudents (received prop):", allStudents); // Original prop
  console.log("StudentsList Component - currentStudents (used internally):", currentStudents); // The one used in logic
  console.log("StudentsList Component - leaveRequests:", leaveRequests);
  console.log("StudentsList Component - Unique Student IDs:", uniqueStudentIds);
  console.log("StudentsList Component - Filtered Students (after search):", filteredStudents.length);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="flex space-x-4 mt-4">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          id="student-search-input"
          name="studentSearch"
          placeholder="Search students by ID or Name..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {currentStudents.length === 0 && searchTerm === '' ? ( // Only show "No students" if no search term
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No students found</p>
          <p className="text-gray-400 text-sm mt-2">
            There are no students in the system.
          </p>
        </div>
      ) : filteredStudents.length === 0 && searchTerm !== '' ? ( // Show "No matching students" if search term is active
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No students found</p>
          <p className="text-gray-400 text-sm mt-2">
            No students matching "{searchTerm}"
          </p>
        </div>
      ) : ( // Render the list if there are filtered students
        <div>
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredStudents.length} of {uniqueStudentIds.length} students
          </p>
          <div className="space-y-4">
            {filteredStudents.map((studentId: string) => {
              const stats = studentDetails[studentId];
              const student = currentStudents.find(s => s.student_id === studentId);
              if (!student || !stats) return null; // Defensive check for student and stats existence
              return (
                <Card key={studentId} className="transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Student ID: {studentId}</h3>
                        <p className="text-sm text-gray-500 mt-1">Name: {student.student_name}</p>
                        {stats.recentRequest && (
                          <p className="text-sm text-gray-500 mt-1">
                            Last request: {format(new Date(stats.recentRequest.date), 'MMM dd,yyyy')}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-4 mt-4 sm:mt-0">
                        <div className="text-center">
                          <span className="block text-sm font-medium text-gray-500">Total</span>
                          <span className="block text-lg font-semibold text-gray-900">{stats.total}</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-sm font-medium text-gray-500">Approved</span>
                          <span className="block text-lg font-semibold text-success-600">{stats.approved}</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-sm font-medium text-gray-500">Rejected</span>
                          <span className="block text-lg font-semibold text-error-600">{stats.rejected}</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-sm font-medium text-gray-500">Pending</span>
                          <span className="block text-lg font-semibold text-warning-600">{stats.pending}</span>
                        </div>
                      </div>
                    </div>
                    {stats.recentRequest && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">Recent request: {stats.recentRequest.reason.substring(0, 50)}
                              {stats.recentRequest.reason.length > 50 ? '...' : ''}
                            </p>
                          </div>
                          <StatusBadge status={stats.recentRequest.status} />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;