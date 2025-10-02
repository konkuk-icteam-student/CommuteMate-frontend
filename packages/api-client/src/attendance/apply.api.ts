import { apiClient } from '../client';
import type {
  AttendanceApplyRequest,
  AttendanceRecord,
  AttendanceEditRequest,
  ApiResponse,
} from '@repo/shared-types';

/**
 * 근무 신청
 */
export const applyAttendance = async (
  request: AttendanceApplyRequest
): Promise<ApiResponse<AttendanceRecord>> => {
  return apiClient.post<AttendanceRecord>('/attendance/apply', request);
};

/**
 * 근무 수정 요청
 */
export const requestAttendanceEdit = async (
  request: AttendanceEditRequest
): Promise<ApiResponse<AttendanceRecord>> => {
  return apiClient.post<AttendanceRecord>('/attendance/edit-request', request);
};

/**
 * 근무 수정 요청 승인 (관리자)
 */
export const approveAttendanceEdit = async (
  requestId: string
): Promise<ApiResponse<AttendanceRecord>> => {
  return apiClient.post<AttendanceRecord>(`/attendance/edit-request/${requestId}/approve`);
};

/**
 * 근무 수정 요청 반려 (관리자)
 */
export const rejectAttendanceEdit = async (
  requestId: string,
  reason: string
): Promise<ApiResponse<AttendanceRecord>> => {
  return apiClient.post<AttendanceRecord>(`/attendance/edit-request/${requestId}/reject`, {
    reason,
  });
};

/**
 * 근무 신청 취소
 */
export const cancelAttendance = async (recordId: string): Promise<ApiResponse<void>> => {
  return apiClient.delete<void>(`/attendance/${recordId}`);
};
