export type AttendanceStatus = 'pending' | 'approved' | 'rejected';

export interface TimeSlot {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm (30분 단위)
  duration: number; // 0.5 단위
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  duration: number;
  status: AttendanceStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceApplyRequest {
  date: string;
  startTime: string;
  duration: number;
}

export interface AttendanceEditRequest {
  recordId: string;
  date?: string;
  startTime?: string;
  duration?: number;
  reason: string;
}

export interface TimeSlotStats {
  date: string;
  startTime: string;
  workers: Array<{
    userId: string;
    userName: string;
    duration: number;
  }>;
  totalWorkers: number;
}

export interface UserWorkingHoursStats {
  userId: string;
  userName: string;
  weeklyHours: number;
  monthlyHours: number;
  records: AttendanceRecord[];
}

export const MAX_WORKERS_PER_TIMESLOT = 6;
export const MAX_WEEKLY_HOURS = 13;
export const MAX_MONTHLY_HOURS = 27;
export const TIME_SLOT_UNIT = 0.5; // 30분
