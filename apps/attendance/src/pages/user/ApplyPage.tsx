import React, { useState, useEffect } from 'react';
import { TimeSlotPicker } from '../../components/TimeSlotPicker';
import { WorkingHoursLimit } from '../../components/WorkingHoursLimit';
import { useWorkingHoursValidation } from '../../hooks/useWorkingHoursValidation';
import { useAttendanceStats } from '../../hooks/useAttendanceStats';
import { applyAttendance, getMyAttendanceRecords, getTimeSlotWorkers } from '@repo/api-client';
import { Button } from '@repo/shared-ui';
import { formatDate } from '@repo/shared-utils';
import type { AttendanceRecord } from '@repo/shared-types';

const ApplyPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(0.5);
  const [myRecords, setMyRecords] = useState<AttendanceRecord[]>([]);
  const [timeSlotWorkers, setTimeSlotWorkers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const stats = useAttendanceStats(myRecords);
  const validation = useWorkingHoursValidation(
    myRecords,
    duration,
    new Date(selectedDate),
    timeSlotWorkers
  );

  useEffect(() => {
    loadMyRecords();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      loadTimeSlotWorkers();
    }
  }, [selectedDate, selectedTime]);

  const loadMyRecords = async () => {
    const response = await getMyAttendanceRecords();
    if (response.success && response.data) {
      setMyRecords(response.data);
    }
  };

  const loadTimeSlotWorkers = async () => {
    const response = await getTimeSlotWorkers({
      date: selectedDate,
      startTime: selectedTime,
    });
    if (response.success && response.data) {
      setTimeSlotWorkers(response.data.totalWorkers);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return;
    }

    if (validation.warnings.length > 0) {
      const confirmed = confirm(validation.warnings.join('\n') + '\n\n계속 진행하시겠습니까?');
      if (!confirmed) return;
    }

    setIsLoading(true);
    try {
      const response = await applyAttendance({
        date: selectedDate,
        startTime: selectedTime,
        duration,
      });

      if (response.success) {
        alert('근무 신청이 완료되었습니다.');
        loadMyRecords();
        setSelectedTime('');
        setDuration(0.5);
      } else {
        alert(response.error?.message || '신청에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="apply-page max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">근무 신청</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">신청 정보</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">날짜</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <TimeSlotPicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              duration={duration}
              onTimeChange={setSelectedTime}
              onDurationChange={setDuration}
            />

            {validation.errors.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                {validation.errors.map((error, idx) => (
                  <p key={idx} className="text-sm text-red-800">
                    ❌ {error}
                  </p>
                ))}
              </div>
            )}

            {validation.warnings.length > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                {validation.warnings.map((warning, idx) => (
                  <p key={idx} className="text-sm text-yellow-800">
                    ⚠️ {warning}
                  </p>
                ))}
              </div>
            )}

            <Button
              type="submit"
              disabled={!selectedTime || !duration || isLoading}
              className="w-full mt-6"
            >
              {isLoading ? '신청 중...' : '신청하기'}
            </Button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <WorkingHoursLimit weeklyHours={stats.weeklyHours} monthlyHours={stats.monthlyHours} />
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
