import React, { ReactNode } from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'primary',
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary-600 bg-primary-100';
      case 'secondary':
        return 'text-secondary-600 bg-secondary-100';
      case 'success':
        return 'text-success-600 bg-success-100';
      case 'warning':
        return 'text-warning-600 bg-warning-100';
      case 'error':
        return 'text-error-600 bg-error-100';
      default:
        return 'text-primary-600 bg-primary-100';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              {trend && (
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    trend.isPositive ? 'text-success-600' : 'text-error-600'
                  }`}
                >
                  <span className="sr-only">
                    {trend.isPositive ? 'Increased' : 'Decreased'} by
                  </span>
                  {trend.isPositive ? '↑' : '↓'} {trend.value}%
                </p>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-full ${getColorClasses(color)}`}>{icon}</div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;