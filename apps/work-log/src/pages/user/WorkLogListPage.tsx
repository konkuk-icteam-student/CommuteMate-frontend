import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyWorkLogs } from '@repo/api-client';
import { WorkLogCard } from '../../components/WorkLogCard';
import { Button } from '@repo/shared-ui';
import type { WorkLog } from '@repo/shared-types';

const WorkLogListPage: React.FC = () => {
  const navigate = useNavigate();
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'draft' | 'submitted' | 'reviewed'>('all');

  useEffect(() => {
    loadWorkLogs();
  }, []);

  const loadWorkLogs = async () => {
    setIsLoading(true);
    try {
      const response = await getMyWorkLogs();
      if (response.success && response.data) {
        setWorkLogs(response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = filter === 'all'
    ? workLogs
    : workLogs.filter((log) => log.status === filter);

  return (
    <div className="work-log-list-page max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">내 업무일지</h1>
        <Button onClick={() => navigate('/work-log/write')}>
          새 일지 작성
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded ${
              filter === 'draft'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            작성중
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`px-4 py-2 rounded ${
              filter === 'submitted'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            제출완료
          </button>
          <button
            onClick={() => setFilter('reviewed')}
            className={`px-4 py-2 rounded ${
              filter === 'reviewed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            검토완료
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : filteredLogs.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 mb-4">업무일지가 없습니다.</p>
          <Button onClick={() => navigate('/work-log/write')}>
            첫 일지 작성하기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLogs.map((log) => (
            <WorkLogCard
              key={log.id}
              workLog={log}
              onClick={(log) => navigate(`/work-log/${log.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkLogListPage;
