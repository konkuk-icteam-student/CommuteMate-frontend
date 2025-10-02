import React, { useState, useEffect } from 'react';
import { getMyAttendanceRecords, requestAttendanceEdit } from '@repo/api-client';
import { Button, Table } from '@repo/shared-ui';
import { formatTimeSlot } from '@repo/shared-utils';
import type { AttendanceRecord } from '@repo/shared-types';

const EditRequestPage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const response = await getMyAttendanceRecords();
    if (response.success && response.data) {
      // 승인된 기록만 수정 가능
      setRecords(response.data.filter((r) => r.status === 'approved'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRecord || !reason.trim()) {
      alert('근무 내역과 사유를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await requestAttendanceEdit({
        recordId: selectedRecord.id,
        reason,
      });

      if (response.success) {
        alert('수정 요청이 제출되었습니다.');
        setSelectedRecord(null);
        setReason('');
        loadRecords();
      } else {
        alert(response.error?.message || '요청에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-request-page max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">근무시간 수정 요청</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">승인된 근무 내역</h2>

          {records.length === 0 ? (
            <p className="text-gray-500">수정 가능한 근무 내역이 없습니다.</p>
          ) : (
            <Table
              data={records}
              columns={[
                {
                  key: 'date',
                  header: '날짜',
                },
                {
                  key: 'startTime',
                  header: '시간',
                  render: (record) => formatTimeSlot(record.startTime, record.duration),
                },
              ]}
              onRowClick={(record) => setSelectedRecord(record)}
            />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">수정 요청</h2>

          {selectedRecord ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4 p-4 bg-blue-50 rounded">
                <h3 className="font-semibold mb-2">선택한 근무 내역</h3>
                <p>날짜: {selectedRecord.date}</p>
                <p>
                  시간: {formatTimeSlot(selectedRecord.startTime, selectedRecord.duration)}
                </p>
              </div>

              <div className="mb-4">
                <label className="block mb-2">수정 사유</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={5}
                  placeholder="수정이 필요한 사유를 상세히 입력해주세요."
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? '제출 중...' : '요청 제출'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setSelectedRecord(null);
                    setReason('');
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  취소
                </Button>
              </div>
            </form>
          ) : (
            <p className="text-gray-500">
              왼쪽 목록에서 수정할 근무 내역을 선택해주세요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditRequestPage;
