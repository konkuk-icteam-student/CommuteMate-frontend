import { useMemo } from 'react';
import type { AttendanceRecord } from '@repo/shared-types';
import { validateAttendanceApplication, type ValidationResult } from '@repo/shared-utils';

export const useWorkingHoursValidation = (
  userRecords: AttendanceRecord[],
  newDuration: number,
  targetDate: Date,
  timeSlotWorkers: number
): ValidationResult => {
  return useMemo(() => {
    return validateAttendanceApplication(
      userRecords,
      newDuration,
      targetDate,
      timeSlotWorkers
    );
  }, [userRecords, newDuration, targetDate, timeSlotWorkers]);
};
