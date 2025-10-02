export type WorkLogType = 'regular' | 'irregular';
export type WorkLogStatus = 'draft' | 'submitted' | 'reviewed';

export interface WorkLog {
  id: string;
  userId: string;
  userName: string;
  type: WorkLogType;
  date: string;
  content: string;
  status: WorkLogStatus;
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkLogCreateRequest {
  type: WorkLogType;
  date: string;
  content: string;
}

export interface WorkLogUpdateRequest {
  id: string;
  content?: string;
  status?: WorkLogStatus;
}

export interface IrregularWork {
  id: string;
  userId: string;
  description: string;
  assignedBy: string;
  dueDate?: string;
  completedAt?: Date;
  createdAt: Date;
}
