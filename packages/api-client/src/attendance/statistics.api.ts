import { apiClient } from '../client';
import type { TimeSlotStats, UserWorkingHoursStats, ApiResponse } from '@repo/shared-types';

/**
 * 시간대별 근로자 통계 조회
 */
export const getTimeSlotStats = async (params: {
  date: string;
}): Promise<ApiResponse<TimeSlotStats[]>> => {
  return apiClient.get<TimeSlotStats[]>('/attendance/stats/time-slots', { params });
};

/**
 * 특정 시간대 근로자 확인
 */
export const getTimeSlotWorkers = async (params: {
  date: string;
  startTime: string;
}): Promise<ApiResponse<TimeSlotStats>> => {
  return apiClient.get<TimeSlotStats>('/attendance/stats/time-slot', { params });
};

/**
 * 사용자별 근무시간 통계 조회 (관리자)
 */
export const getUserWorkingHoursStats = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<ApiResponse<UserWorkingHoursStats[]>> => {
  return apiClient.get<UserWorkingHoursStats[]>('/attendance/stats/working-hours', { params });
};

/**
 * 내 근무시간 통계 조회
 */
export const getMyWorkingHoursStats = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<ApiResponse<UserWorkingHoursStats>> => {
  return apiClient.get<UserWorkingHoursStats>('/attendance/stats/my-working-hours', { params });
};
