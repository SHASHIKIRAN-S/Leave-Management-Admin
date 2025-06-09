import React from 'react';
import { format } from 'date-fns';
import { LeaveRequest } from '../../types';
import Card, { CardHeader, CardContent } from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface RecentRequestsProps {
  requests: LeaveRequest[];
  isLoading: boolean;
}

const RecentRequests: React.FC<RecentRequestsProps> = ({ requests, isLoading }) => {
  // Display only the 5 most recent requests
  const recentRequests = [...requests]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Recent Leave Requests</h3>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="py-4 border-b border-gray-100 last:border-0">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Recent Leave Requests</h3>
        <Link 
          to="/leave-requests" 
          className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center"
        >
          View all <ChevronRight size={16} />
        </Link>
      </CardHeader>
      <CardContent>
        {recentRequests.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent leave requests</p>
        ) : (
          recentRequests.map((request, index) => (
            <div key={index} className="py-4 border-b border-gray-100 last:border-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Student ID: {request.student_id}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(request.date), 'MMM dd, yyyy')} - {request.reason.substring(0, 30)}
                    {request.reason.length > 30 ? '...' : ''}
                  </p>
                </div>
                <StatusBadge status={request.status} />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RecentRequests;