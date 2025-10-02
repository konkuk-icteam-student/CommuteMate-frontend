import { apiClient } from '../client';
import type {
  WorkLog,
  WorkLogCreateRequest,
  WorkLogUpdateRequest,
  IrregularWork,
  ApiResponse,
  PaginatedResponse,
} from '@repo/shared-types';

/**
 * 업무일지 목록 조회
 */
export const getWorkLogs = async (params?: {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<PaginatedResponse<WorkLog>>> => {
  return apiClient.get<PaginatedResponse<WorkLog>>('/work-log', { params });
};

/**
 * 내 업무일지 목록 조회
 */
export const getMyWorkLogs = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<ApiResponse<WorkLog[]>> => {
  return apiClient.get<WorkLog[]>('/work-log/my-logs', { params });
};

/**
 * 업무일지 상세 조회
 */
export const getWorkLog = async (logId: string): Promise<ApiResponse<WorkLog>> => {
  return apiClient.get<WorkLog>(`/work-log/${logId}`);
};

/**
 * 업무일지 작성
 */
export const createWorkLog = async (
  request: WorkLogCreateRequest
): Promise<ApiResponse<WorkLog>> => {
  return apiClient.post<WorkLog>('/work-log', request);
};

/**
 * 업무일지 수정
 */
export const updateWorkLog = async (
  request: WorkLogUpdateRequest
): Promise<ApiResponse<WorkLog>> => {
  return apiClient.put<WorkLog>(`/work-log/${request.id}`, request);
};

/**
 * 업무일지 삭제
 */
export const deleteWorkLog = async (logId: string): Promise<ApiResponse<void>> => {
  return apiClient.delete<void>(`/work-log/${logId}`);
};

/**
 * 비정기 업무 목록 조회
 */
export const getIrregularWorks = async (): Promise<ApiResponse<IrregularWork[]>> => {
  return apiClient.get<IrregularWork[]>('/work-log/irregular');
};

/**
 * 비정기 업무 추가 (관리자)
 */
export const createIrregularWork = async (data: {
  userId: string;
  description: string;
  dueDate?: string;
}): Promise<ApiResponse<IrregularWork>> => {
  return apiClient.post<IrregularWork>('/work-log/irregular', data);
};

/**
 * 비정기 업무 완료 처리
 */
export const completeIrregularWork = async (
  workId: string
): Promise<ApiResponse<IrregularWork>> => {
  return apiClient.post<IrregularWork>(`/work-log/irregular/${workId}/complete`);
};

/**
 * 업무일지 검토 (관리자)
 */
export const reviewWorkLog = async (
  logId: string,
  status: 'reviewed'
): Promise<ApiResponse<WorkLog>> => {
  return apiClient.patch<WorkLog>(`/work-log/${logId}/review`, { status });
};
