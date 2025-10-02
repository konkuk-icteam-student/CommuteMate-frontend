import { apiClient } from '../client';
import type {
  AttendanceRecord,
  ApiResponse,
  PaginatedResponse,
  DateRangeParams,
} from '@repo/shared-types';

/**
 * 내 근무 내역 조회
 */
export const getMyAttendanceRecords = async (
  params?: DateRangeParams
): Promise<ApiResponse<AttendanceRecord[]>> => {
  return apiClient.get<AttendanceRecord[]>('/attendance/my-records', { params });
};

/**
 * 특정 근무 내역 조회
 */
export const getAttendanceRecord = async (
  recordId: string
): Promise<ApiResponse<AttendanceRecord>> => {
  return apiClient.get<AttendanceRecord>(`/attendance/${recordId}`);
};

/**
 * 전체 근무 내역 조회 (관리자)
 */
export const getAllAttendanceRecords = async (params?: {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<PaginatedResponse<AttendanceRecord>>> => {
  return apiClient.get<PaginatedResponse<AttendanceRecord>>('/attendance/all-records', {
    params,
  });
};

/**
 * 사용자별 근무 내역 조회 (관리자)
 */
export const getUserAttendanceRecords = async (
  userId: string,
  params?: DateRangeParams
): Promise<ApiResponse<AttendanceRecord[]>> => {
  return apiClient.get<AttendanceRecord[]>(`/attendance/user/${userId}/records`, { params });
};
