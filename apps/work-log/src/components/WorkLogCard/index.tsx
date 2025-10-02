import React from 'react';
import type { WorkLog } from '@repo/shared-types';
import { formatDate } from '@repo/shared-utils';

export interface WorkLogCardProps {
  workLog: WorkLog;
  onClick?: (workLog: WorkLog) => void;
  showStatus?: boolean;
}

export const WorkLogCard: React.FC<WorkLogCardProps> = ({
  workLog,
  onClick,
  showStatus = true,
}) => {
  const statusMap = {
    draft: { text: '작성중', color: 'bg-gray-100 text-gray-800' },
    submitted: { text: '제출완료', color: 'bg-blue-100 text-blue-800' },
    reviewed: { text: '검토완료', color: 'bg-green-100 text-green-800' },
  };

  const typeMap = {
    regular: '정기',
    irregular: '비정기',
  };

  const status = statusMap[workLog.status];

  return (
    <div
      className={`work-log-card bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={() => onClick?.(workLog)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-sm text-gray-600">{typeMap[workLog.type]}</span>
          <h3 className="text-lg font-semibold">{workLog.date}</h3>
        </div>
        {showStatus && (
          <span className={`px-2 py-1 rounded text-xs ${status.color}`}>
            {status.text}
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-2 line-clamp-3">{workLog.content}</p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{workLog.userName}</span>
        <span>{formatDate(new Date(workLog.createdAt), 'yyyy-MM-dd HH:mm')}</span>
      </div>

      {workLog.reviewedBy && (
        <div className="mt-2 pt-2 border-t text-xs text-gray-500">
          검토자: {workLog.reviewedBy} ({formatDate(new Date(workLog.reviewedAt!), 'yyyy-MM-dd')})
        </div>
      )}
    </div>
  );
};
