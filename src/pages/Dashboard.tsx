import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useLeaveContext } from '../context/LeaveContext';
import StatCard from '../components/dashboard/StatCard';
import RecentRequests from '../components/dashboard/RecentRequests';
import { CheckCircle, XCircle, Clock, Users, Calendar } from 'lucide-react';
import './Dashboard.css';  // Add this CSS file

const Dashboard: React.FC = () => {
  const { leaveRequests, loading, statusCounts } = useLeaveContext();

  // Count unique students
  const uniqueStudentIds = new Set<string>();
  leaveRequests.forEach(request => uniqueStudentIds.add(request.student_id));
  const studentCount = uniqueStudentIds.size;

  const approvalRate = statusCounts.total ? Math.round((statusCounts.approved / statusCounts.total) * 100) : 0;
  const rejectionRate = statusCounts.total ? Math.round((statusCounts.rejected / statusCounts.total) * 100) : 0;

  return (
    <PageLayout 
      title="Dashboard" 
      subtitle="Overview of leave management statistics and recent requests"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Requests"
          value={statusCounts.total}
          icon={<Calendar size={24} />}
          color="primary"
        />
        <StatCard
          title="Pending Requests"
          value={statusCounts.pending}
          icon={<Clock size={24} />}
          color="warning"
        />
        <StatCard
          title="Approved Requests"
          value={statusCounts.approved}
          icon={<CheckCircle size={24} />}
          color="success"
        />
        <StatCard
          title="Rejected Requests"
          value={statusCounts.rejected}
          icon={<XCircle size={24} />}
          color="error"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <RecentRequests requests={leaveRequests} isLoading={loading} />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Leave Request Distribution</h3>
            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
              <div className="flex-1">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-primary-800">
                        Approval Rate
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-primary-800">
                        {approvalRate}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                    <div className="progress-bar bg-primary-500"></div>
                  </div>
                </div>
              </div>
              <div className="flex-1 sm:ml-8">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-error-800">
                        Rejection Rate
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-error-800">
                        {rejectionRate}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-error-200">
                    <div className="progress-bar bg-error-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <h2 className="text-2xl font-bold text-gray-900">{studentCount}</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Stats</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Avg. requests per student</span>
                    <span className="text-sm font-medium text-gray-900">
                      {studentCount ? (statusCounts.total / studentCount).toFixed(1) : 0}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Pending approval</span>
                    <span className="text-sm font-medium text-warning-600">
                      {statusCounts.pending}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Students with requests</span>
                    <span className="text-sm font-medium text-gray-900">
                      {studentCount}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">
                  The dashboard provides a quick overview of all leave management activities. For detailed 
                  information, visit the Leave Requests or Students pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
