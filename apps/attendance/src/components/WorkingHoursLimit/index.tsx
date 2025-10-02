import React from 'react';
import { MAX_WEEKLY_HOURS, MAX_MONTHLY_HOURS } from '@repo/shared-types';

export interface WorkingHoursLimitProps {
  weeklyHours: number;
  monthlyHours: number;
  className?: string;
}

export const WorkingHoursLimit: React.FC<WorkingHoursLimitProps> = ({
  weeklyHours,
  monthlyHours,
  className = '',
}) => {
  const weeklyPercentage = (weeklyHours / MAX_WEEKLY_HOURS) * 100;
  const monthlyPercentage = (monthlyHours / MAX_MONTHLY_HOURS) * 100;

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className={`working-hours-limit ${className}`}>
      <h3 className="text-lg font-semibold mb-4">근무시간 현황</h3>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>주간 근무시간</span>
          <span className={getStatusColor(weeklyPercentage)}>
            {weeklyHours} / {MAX_WEEKLY_HOURS}시간
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              weeklyPercentage >= 100
                ? 'bg-red-600'
                : weeklyPercentage >= 90
                  ? 'bg-yellow-500'
                  : 'bg-green-600'
            }`}
            style={{ width: `${Math.min(weeklyPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span>월간 근무시간</span>
          <span className={getStatusColor(monthlyPercentage)}>
            {monthlyHours} / {MAX_MONTHLY_HOURS}시간
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              monthlyPercentage >= 100
                ? 'bg-red-600'
                : monthlyPercentage >= 90
                  ? 'bg-yellow-500'
                  : 'bg-green-600'
            }`}
            style={{ width: `${Math.min(monthlyPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {(weeklyPercentage >= 90 || monthlyPercentage >= 90) && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">⚠️ 근무시간 제한에 근접했습니다.</p>
        </div>
      )}
    </div>
  );
};
