import React, { useState } from 'react';
import { format } from 'date-fns';
import { LeaveRequest, LeaveStatusUpdate } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';
import { Check, X } from 'lucide-react';

interface LeaveRequestCardProps {
  request: LeaveRequest;
  onStatusChange: (update: LeaveStatusUpdate) => Promise<void>;
}

const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({ request, onStatusChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: 'approved' | 'rejected') => {
    setIsUpdating(true);
    try {
      await onStatusChange({
        student_id: request.student_id,
        date: request.date,
        new_status: newStatus,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-900">Student ID: {request.student_id}</h3>
          <StatusBadge status={request.status} />
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Date Requested</p>
            <p className="font-medium">{format(new Date(request.date), 'MMMM dd, yyyy')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Reason</p>
            <p className="font-medium">{request.reason}</p>
          </div>
        </div>
      </CardContent>
      {request.status === 'pending' && (
        <CardFooter className="flex justify-end space-x-3 bg-gray-50 py-3">
          <Button
            variant="danger"
            leftIcon={<X size={16} />}
            onClick={() => handleStatusChange('rejected')}
            isLoading={isUpdating}
            disabled={isUpdating}
            size="sm"
          >
            Reject
          </Button>
          <Button
            variant="success"
            leftIcon={<Check size={16} />}
            onClick={() => handleStatusChange('approved')}
            isLoading={isUpdating}
            disabled={isUpdating}
            size="sm"
          >
            Approve
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LeaveRequestCard;