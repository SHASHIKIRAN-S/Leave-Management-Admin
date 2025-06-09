// This is the content that should be in src/pages/Students.tsx
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useLeaveContext } from '../context/LeaveContext';
import StudentsList from '../components/students/StudentsList'; // <-- Pay attention to this path

const Students: React.FC = () => {
  const { leaveRequests, loading, error, allStudents } = useLeaveContext();

  console.log("Students Page - Loading:", loading);
  console.log("Students Page - Error:", error);
  console.log("Students Page - Leave Requests received:", leaveRequests);
  console.log("Students Page - All Students received:", allStudents);

  if (error) {
    return (
      <PageLayout
        title="Students"
        subtitle="View all students and their leave history"
      >
        <div className="text-center py-12 text-red-600">
          <p className="text-lg font-medium">{error}</p>
          <p className="text-sm text-gray-500 mt-2">Please try refreshing the page or contact support.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Students"
      subtitle="View all students and their leave history"
    >
      <StudentsList
        leaveRequests={leaveRequests}
        isLoading={loading}
        allStudents={allStudents}
      />
    </PageLayout>
  );
};

export default Students;