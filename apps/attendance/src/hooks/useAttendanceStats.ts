import { useMemo } from 'react';
import type { AttendanceRecord } from '@repo/shared-types';
import { getWeekRange, getMonthRange, isDateInRange, parseDate } from '@repo/shared-utils';

export interface AttendanceStats {
  weeklyHours: number;
  monthlyHours: number;
  totalRecords: number;
}

export const useAttendanceStats = (
  records: AttendanceRecord[],
  targetDate: Date = new Date()
): AttendanceStats => {
  return useMemo(() => {
    const { start: weekStart, end: weekEnd } = getWeekRange(targetDate);
    const { start: monthStart, end: monthEnd } = getMonthRange(targetDate);

    const weeklyRecords = records.filter((record) =>
      isDateInRange(parseDate(record.date), weekStart, weekEnd)
    );

    const monthlyRecords = records.filter((record) =>
      isDateInRange(parseDate(record.date), monthStart, monthEnd)
    );

    const weeklyHours = weeklyRecords.reduce((sum, r) => sum + r.duration, 0);
    const monthlyHours = monthlyRecords.reduce((sum, r) => sum + r.duration, 0);

    return {
      weeklyHours,
      monthlyHours,
      totalRecords: records.length,
    };
  }, [records, targetDate]);
};
