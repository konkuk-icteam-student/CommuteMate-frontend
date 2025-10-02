import type { AttendanceRecord } from '@repo/shared-types';
import { MAX_WEEKLY_HOURS, MAX_MONTHLY_HOURS, MAX_WORKERS_PER_TIMESLOT } from '@repo/shared-types';
import { getWeekRange, getMonthRange, isDateInRange, parseDate } from './date.utils';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * 주간 근무시간 제한 검증 (최대 13시간)
 */
export const validateWeeklyHours = (
  records: AttendanceRecord[],
  newDuration: number,
  targetDate: Date = new Date()
): ValidationResult => {
  const { start, end } = getWeekRange(targetDate);

  const weeklyRecords = records.filter((record) =>
    isDateInRange(parseDate(record.date), start, end)
  );

  const totalHours = weeklyRecords.reduce((sum, r) => sum + r.duration, 0) + newDuration;

  const isValid = totalHours <= MAX_WEEKLY_HOURS;
  const errors = isValid
    ? []
    : [`주간 근무시간이 ${MAX_WEEKLY_HOURS}시간을 초과합니다 (현재: ${totalHours}시간)`];
  const warnings =
    totalHours >= MAX_WEEKLY_HOURS * 0.9 && isValid
      ? [`주간 근무시간이 ${MAX_WEEKLY_HOURS}시간에 근접합니다`]
      : [];

  return { isValid, errors, warnings };
};

/**
 * 월간 근무시간 제한 검증 (최대 27시간)
 */
export const validateMonthlyHours = (
  records: AttendanceRecord[],
  newDuration: number,
  targetDate: Date = new Date()
): ValidationResult => {
  const { start, end } = getMonthRange(targetDate);

  const monthlyRecords = records.filter((record) =>
    isDateInRange(parseDate(record.date), start, end)
  );

  const totalHours = monthlyRecords.reduce((sum, r) => sum + r.duration, 0) + newDuration;

  const isValid = totalHours <= MAX_MONTHLY_HOURS;
  const errors = isValid
    ? []
    : [`월간 근무시간이 ${MAX_MONTHLY_HOURS}시간을 초과합니다 (현재: ${totalHours}시간)`];
  const warnings =
    totalHours >= MAX_MONTHLY_HOURS * 0.9 && isValid
      ? [`월간 근무시간이 ${MAX_MONTHLY_HOURS}시간에 근접합니다`]
      : [];

  return { isValid, errors, warnings };
};

/**
 * 시간대별 인원 제한 검증 (최대 6명)
 */
export const validateTimeSlotCapacity = (currentWorkers: number): ValidationResult => {
  const isValid = currentWorkers < MAX_WORKERS_PER_TIMESLOT;
  const errors = isValid
    ? []
    : [`해당 시간대는 정원(${MAX_WORKERS_PER_TIMESLOT}명)이 마감되었습니다`];
  const warnings =
    currentWorkers >= MAX_WORKERS_PER_TIMESLOT - 1 && isValid
      ? [`해당 시간대 정원이 얼마 남지 않았습니다 (${currentWorkers}/${MAX_WORKERS_PER_TIMESLOT})`]
      : [];

  return { isValid, errors, warnings };
};

/**
 * 종합 근무 신청 검증
 */
export const validateAttendanceApplication = (
  userRecords: AttendanceRecord[],
  newDuration: number,
  targetDate: Date,
  timeSlotWorkers: number
): ValidationResult => {
  const weeklyValidation = validateWeeklyHours(userRecords, newDuration, targetDate);
  const monthlyValidation = validateMonthlyHours(userRecords, newDuration, targetDate);
  const capacityValidation = validateTimeSlotCapacity(timeSlotWorkers);

  const isValid =
    weeklyValidation.isValid && monthlyValidation.isValid && capacityValidation.isValid;
  const errors = [
    ...weeklyValidation.errors,
    ...monthlyValidation.errors,
    ...capacityValidation.errors,
  ];
  const warnings = [
    ...weeklyValidation.warnings,
    ...monthlyValidation.warnings,
    ...capacityValidation.warnings,
  ];

  return { isValid, errors, warnings };
};

/**
 * 이메일 형식 검증
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 비밀번호 강도 검증
 */
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('비밀번호는 최소 8자 이상이어야 합니다');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('비밀번호는 대문자를 포함해야 합니다');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('비밀번호는 소문자를 포함해야 합니다');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('비밀번호는 숫자를 포함해야 합니다');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
  };
};
