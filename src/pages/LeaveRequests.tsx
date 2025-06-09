import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useLeaveContext } from '../context/LeaveContext';
import LeaveRequestsList from '../components/leave/LeaveRequestsList';

const LeaveRequests: React.FC = () => {
  const { leaveRequests, loading, updateLeaveStatus } = useLeaveContext();

  return (
    <PageLayout
      title="Leave Requests"
      subtitle="View and manage all student leave requests"
    >
      <LeaveRequestsList 
        requests={leaveRequests} 
        isLoading={loading} 
        onStatusChange={updateLeaveStatus} 
      />
    </PageLayout>
  );
};

export default LeaveRequests;