import React, { useState, useEffect } from 'react';
import { getUserWorkingHoursStats } from '@repo/api-client';
import { Table } from '@repo/shared-ui';
import { exportToExcel } from '@repo/shared-utils';
import { MAX_WEEKLY_HOURS, MAX_MONTHLY_HOURS } from '@repo/shared-types';
import type { UserWorkingHoursStats } from '@repo/shared-types';

const StatisticsPage: React.FC = () => {
  const [stats, setStats] = useState<UserWorkingHoursStats[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const response = await getUserWorkingHoursStats({
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      if (response.success && response.data) {
        setStats(response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    exportToExcel(
      stats,
      [
        { key: 'userName', label: '이름' },
        { key: 'weeklyHours', label: '주간 근무시간' },
        { key: 'monthlyHours', label: '월간 근무시간' },
      ],
      `근무시간_통계_${new Date().toISOString().split('T')[0]}.csv`
    );
  };

  const getHoursStatus = (hours: number, max: number) => {
    const percentage = (hours / max) * 100;
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="statistics-page max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">사용자별 근무시간 통계</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <label className="block text-sm mb-1">시작 날짜</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">종료 날짜</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={loadStats}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-5"
          >
            조회
          </button>
          <button
            onClick={handleExport}
            disabled={stats.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 mt-5"
          >
            엑셀 다운로드
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">근무시간 현황</h2>

        {isLoading ? (
          <p>로딩 중...</p>
        ) : stats.length === 0 ? (
          <p className="text-gray-500">데이터가 없습니다.</p>
        ) : (
          <Table
            data={stats}
            columns={[
              {
                key: 'userName',
                header: '이름',
              },
              {
                key: 'weeklyHours',
                header: '주간 근무시간',
                render: (stat) => (
                  <span className={getHoursStatus(stat.weeklyHours, MAX_WEEKLY_HOURS)}>
                    {stat.weeklyHours} / {MAX_WEEKLY_HOURS}시간
                  </span>
                ),
              },
              {
                key: 'monthlyHours',
                header: '월간 근무시간',
                render: (stat) => (
                  <span className={getHoursStatus(stat.monthlyHours, MAX_MONTHLY_HOURS)}>
                    {stat.monthlyHours} / {MAX_MONTHLY_HOURS}시간
                  </span>
                ),
              },
              {
                key: 'records',
                header: '총 근무 횟수',
                render: (stat) => `${stat.records.length}회`,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
