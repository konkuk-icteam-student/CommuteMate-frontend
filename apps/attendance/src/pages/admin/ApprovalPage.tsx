import React, { useState, useEffect } from 'react';
import {
  getAllAttendanceRecords,
  approveAttendanceEdit,
  rejectAttendanceEdit,
} from '@repo/api-client';
import { Button, Table, Modal } from '@repo/shared-ui';
import { formatTimeSlot } from '@repo/shared-utils';
import type { AttendanceRecord } from '@repo/shared-types';

const ApprovalPage: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<AttendanceRecord[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AttendanceRecord | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPendingRequests();
  }, []);

  const loadPendingRequests = async () => {
    const response = await getAllAttendanceRecords();
    if (response.success && response.data) {
      // 대기중인 요청만 필터링
      setPendingRequests(response.data.items.filter((r) => r.status === 'pending'));
    }
  };

  const handleApprove = async (request: AttendanceRecord) => {
    if (!confirm(`${request.userName}님의 요청을 승인하시겠습니까?`)) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await approveAttendanceEdit(request.id);
      if (response.success) {
        alert('승인되었습니다.');
        loadPendingRequests();
      } else {
        alert(response.error?.message || '승인에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest || !rejectReason.trim()) {
      alert('반려 사유를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await rejectAttendanceEdit(selectedRequest.id, rejectReason);
      if (response.success) {
        alert('반려되었습니다.');
        setIsModalOpen(false);
        setSelectedRequest(null);
        setRejectReason('');
        loadPendingRequests();
      } else {
        alert(response.error?.message || '반려에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openRejectModal = (request: AttendanceRecord) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <div className="approval-page max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">수정 요청 승인/반려</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">대기중인 요청 ({pendingRequests.length}건)</h2>

        {pendingRequests.length === 0 ? (
          <p className="text-gray-500">대기중인 요청이 없습니다.</p>
        ) : (
          <Table
            data={pendingRequests}
            columns={[
              {
                key: 'userName',
                header: '이름',
              },
              {
                key: 'date',
                header: '날짜',
              },
              {
                key: 'startTime',
                header: '시간',
                render: (record) => formatTimeSlot(record.startTime, record.duration),
              },
              {
                key: 'createdAt',
                header: '신청일시',
                render: (record) => new Date(record.createdAt).toLocaleString(),
              },
              {
                key: 'actions',
                header: '처리',
                render: (record) => (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(record)}
                      disabled={isLoading}
                      size="sm"
                      variant="primary"
                    >
                      승인
                    </Button>
                    <Button
                      onClick={() => openRejectModal(record)}
                      disabled={isLoading}
                      size="sm"
                      variant="outline"
                    >
                      반려
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRequest(null);
          setRejectReason('');
        }}
        title="요청 반려"
      >
        {selectedRequest && (
          <div>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p>이름: {selectedRequest.userName}</p>
              <p>날짜: {selectedRequest.date}</p>
              <p>시간: {formatTimeSlot(selectedRequest.startTime, selectedRequest.duration)}</p>
            </div>

            <div className="mb-4">
              <label className="block mb-2">반려 사유</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="반려 사유를 입력해주세요."
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleReject} disabled={isLoading} className="flex-1">
                {isLoading ? '처리 중...' : '반려하기'}
              </Button>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedRequest(null);
                  setRejectReason('');
                }}
                variant="outline"
                className="flex-1"
              >
                취소
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApprovalPage;
