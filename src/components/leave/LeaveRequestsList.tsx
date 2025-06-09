import React, { useState } from 'react';
import { LeaveRequest, LeaveStatusUpdate } from '../../types';
import LeaveRequestCard from './LeaveRequestCard';
import { Filter, Calendar } from 'lucide-react';

interface LeaveRequestsListProps {
  requests: LeaveRequest[];
  isLoading: boolean;
  onStatusChange: (update: LeaveStatusUpdate) => Promise<void>;
}

const LeaveRequestsList: React.FC<LeaveRequestsListProps> = ({
  requests,
  isLoading,
  onStatusChange,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredRequests = requests.filter((request) => {
    if (statusFilter === 'all') return true;
    return request.status === statusFilter;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  if (isLoading) {
    return (
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 h-60">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full mt-8"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          <div className="flex space-x-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  statusFilter === status
                    ? `bg-${status === 'all' ? 'primary' : status}-100 text-${status === 'all' ? 'primary' : status}-800`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={18} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Sort by date:</span>
          <button
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              sortOrder === 'desc'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSortOrder('desc')}
          >
            Newest first
          </button>
          <button
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              sortOrder === 'asc'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSortOrder('asc')}
          >
            Oldest first
          </button>
        </div>
      </div>

      {sortedRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No leave requests found</p>
          <p className="text-gray-400 text-sm mt-2">
            {statusFilter !== 'all'
              ? `There are no ${statusFilter} leave requests.`
              : 'There are no leave requests in the system.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRequests.map((request, index) => (
            <LeaveRequestCard
              key={`${request.student_id}-${request.date}-${index}`}
              request={request}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveRequestsList;
