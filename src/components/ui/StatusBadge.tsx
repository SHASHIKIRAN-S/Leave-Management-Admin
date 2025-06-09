import React from 'react';

type StatusType = 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800 border-warning-300';
      case 'approved':
        return 'bg-success-100 text-success-800 border-success-300';
      case 'rejected':
        return 'bg-error-100 text-error-800 border-error-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(
        status
      )} ${className}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;