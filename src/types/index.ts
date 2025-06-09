export interface Student {
  student_id: string;
  student_name: string;
}

export interface LeaveRequest {
  id?: number;
  student_id: string;
  date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface LeaveStatusUpdate {
  student_id: string;
  date: string;
  new_status: 'approved' | 'rejected';
}

export interface AIRequest {
  prompt: string;
  student_id?: string;
}

export interface AIResponse {
  response: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source_data?: Record<string, any>[];
}

export interface StatusCount {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}