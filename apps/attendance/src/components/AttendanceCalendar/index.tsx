import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import type { AttendanceRecord } from '@repo/shared-types';

export interface AttendanceCalendarProps {
  records: AttendanceRecord[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  records,
  selectedDate,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const hasRecord = (date: Date) => {
    return records.some((record) => {
      const recordDate = new Date(record.date);
      return isSameDay(recordDate, date);
    });
  };

  const getRecordsForDate = (date: Date) => {
    return records.filter((record) => {
      const recordDate = new Date(record.date);
      return isSameDay(recordDate, date);
    });
  };

  return (
    <div className="attendance-calendar">
      <div className="calendar-header flex justify-between items-center mb-4">
        <button
          onClick={() => {
            const prev = new Date(currentMonth);
            prev.setMonth(prev.getMonth() - 1);
            setCurrentMonth(prev);
          }}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold">{format(currentMonth, 'yyyy년 MM월')}</h3>
        <button
          onClick={() => {
            const next = new Date(currentMonth);
            next.setMonth(next.getMonth() + 1);
            setCurrentMonth(next);
          }}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          →
        </button>
      </div>

      <div className="calendar-grid grid grid-cols-7 gap-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const hasAttendance = hasRecord(day);
          const dayRecords = getRecordsForDate(day);

          return (
            <div
              key={day.toString()}
              onClick={() => onDateSelect?.(day)}
              className={`
                p-2 border rounded cursor-pointer min-h-[60px]
                ${!isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''}
                ${isSelected ? 'ring-2 ring-blue-500' : ''}
                ${hasAttendance ? 'bg-blue-50' : ''}
                hover:bg-blue-100
              `}
            >
              <div className="text-sm">{format(day, 'd')}</div>
              {dayRecords.length > 0 && (
                <div className="text-xs mt-1">
                  {dayRecords.map((record, idx) => (
                    <div key={idx} className="text-blue-600">
                      {record.startTime} ({record.duration}h)
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
