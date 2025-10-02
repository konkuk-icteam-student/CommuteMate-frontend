import React, { useState, useEffect } from 'react';
import { getTimeSlotStats } from '@repo/api-client';
import { Table } from '@repo/shared-ui';
import { formatDate, formatTimeSlot } from '@repo/shared-utils';
import { MAX_WORKERS_PER_TIMESLOT } from '@repo/shared-types';
import type { TimeSlotStats } from '@repo/shared-types';

const TimeSlotManagePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()));
  const [timeSlots, setTimeSlots] = useState<TimeSlotStats[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTimeSlots();
  }, [selectedDate]);

  const loadTimeSlots = async () => {
    setIsLoading(true);
    try {
      const response = await getTimeSlotStats({ date: selectedDate });
      if (response.success && response.data) {
        setTimeSlots(response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCapacityStatus = (current: number) => {
    const percentage = (current / MAX_WORKERS_PER_TIMESLOT) * 100;
    if (percentage >= 100) return { text: '마감', color: 'text-red-600 bg-red-50' };
    if (percentage >= 80) return { text: '거의 마감', color: 'text-yellow-600 bg-yellow-50' };
    return { text: '여유', color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="timeslot-manage-page max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">시간대별 근로자 확인</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <label className="font-semibold">날짜 선택:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{selectedDate} 시간대별 현황</h2>

        {isLoading ? (
          <p>로딩 중...</p>
        ) : timeSlots.length === 0 ? (
          <p className="text-gray-500">해당 날짜에 근무 신청이 없습니다.</p>
        ) : (
          <Table
            data={timeSlots}
            columns={[
              {
                key: 'startTime',
                header: '시간대',
              },
              {
                key: 'totalWorkers',
                header: '근무 인원',
                render: (slot) => {
                  const status = getCapacityStatus(slot.totalWorkers);
                  return (
                    <span className={`px-2 py-1 rounded ${status.color}`}>
                      {slot.totalWorkers} / {MAX_WORKERS_PER_TIMESLOT}명 ({status.text})
                    </span>
                  );
                },
              },
              {
                key: 'workers',
                header: '근로자 명단',
                render: (slot) => (
                  <div>
                    {slot.workers.map((worker, idx) => (
                      <div key={idx} className="text-sm">
                        {worker.userName} ({worker.duration}시간)
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default TimeSlotManagePage;
