import React, { useState, useEffect } from 'react';
import { AttendanceCalendar } from '../../components/AttendanceCalendar';
import { useAttendanceStats } from '../../hooks/useAttendanceStats';
import { getMyAttendanceRecords } from '@repo/api-client';
import { Table } from '@repo/shared-ui';
import { formatTimeSlot } from '@repo/shared-utils';
import type { AttendanceRecord } from '@repo/shared-types';

const MyRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const stats = useAttendanceStats(records);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setIsLoading(true);
    try {
      const response = await getMyAttendanceRecords();
      if (response.success && response.data) {
        setRecords(response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecords = selectedDate
    ? records.filter((r) => new Date(r.date).toDateString() === selectedDate.toDateString())
    : records;

  return (
    <div className="my-records-page max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">내 근무 내역</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600">주간 근무시간</h3>
          <p className="text-2xl font-bold">{stats.weeklyHours}시간</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600">월간 근무시간</h3>
          <p className="text-2xl font-bold">{stats.monthlyHours}시간</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600">총 근무 횟수</h3>
          <p className="text-2xl font-bold">{stats.totalRecords}회</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">달력</h2>
          <AttendanceCalendar
            records={records}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {selectedDate ? '선택한 날짜 근무 내역' : '전체 근무 내역'}
            </h2>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(undefined)}
                className="text-sm text-blue-600 hover:underline"
              >
                전체 보기
              </button>
            )}
          </div>

          {isLoading ? (
            <p>로딩 중...</p>
          ) : filteredRecords.length === 0 ? (
            <p className="text-gray-500">근무 내역이 없습니다.</p>
          ) : (
            <Table
              data={filteredRecords}
              columns={[
                {
                  key: 'date',
                  header: '날짜',
                },
                {
                  key: 'startTime',
                  header: '시간',
                  render: (record) => formatTimeSlot(record.startTime, record.duration),
                },
                {
                  key: 'duration',
                  header: '근무시간',
                  render: (record) => `${record.duration}시간`,
                },
                {
                  key: 'status',
                  header: '상태',
                  render: (record) => {
                    const statusMap = {
                      pending: '대기중',
                      approved: '승인',
                      rejected: '반려',
                    };
                    return statusMap[record.status];
                  },
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRecordsPage;
