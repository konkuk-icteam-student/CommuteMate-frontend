import React, { useState, useEffect } from 'react';
import { getWorkLogs, reviewWorkLog, createIrregularWork } from '@repo/api-client';
import { WorkLogCard } from '../../components/WorkLogCard';
import { Button, Modal } from '@repo/shared-ui';
import type { WorkLog } from '@repo/shared-types';

const WorkLogReviewPage: React.FC = () => {
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<WorkLog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadWorkLogs();
  }, []);

  const loadWorkLogs = async () => {
    const response = await getWorkLogs();
    if (response.success && response.data) {
      setWorkLogs(response.data.items);
    }
  };

  const handleReview = async (logId: string) => {
    if (!confirm('검토 완료 처리하시겠습니까?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await reviewWorkLog(logId, 'reviewed');
      if (response.success) {
        alert('검토가 완료되었습니다.');
        loadWorkLogs();
      } else {
        alert(response.error?.message || '처리에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submittedLogs = workLogs.filter((log) => log.status === 'submitted');
  const reviewedLogs = workLogs.filter((log) => log.status === 'reviewed');

  return (
    <div className="work-log-review-page max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">업무일지 검토</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            검토 대기 ({submittedLogs.length})
          </h2>

          {submittedLogs.length === 0 ? (
            <p className="text-gray-500">검토할 일지가 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {submittedLogs.map((log) => (
                <div key={log.id} className="relative">
                  <WorkLogCard
                    workLog={log}
                    onClick={(log) => {
                      setSelectedLog(log);
                      setIsModalOpen(true);
                    }}
                  />
                  <div className="mt-2">
                    <Button
                      onClick={() => handleReview(log.id)}
                      disabled={isLoading}
                      size="sm"
                      className="w-full"
                    >
                      검토 완료
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            검토 완료 ({reviewedLogs.length})
          </h2>

          {reviewedLogs.length === 0 ? (
            <p className="text-gray-500">검토 완료된 일지가 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {reviewedLogs.slice(0, 10).map((log) => (
                <WorkLogCard
                  key={log.id}
                  workLog={log}
                  onClick={(log) => {
                    setSelectedLog(log);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLog(null);
        }}
        title="업무일지 상세"
      >
        {selectedLog && (
          <div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">날짜</h3>
              <p>{selectedLog.date}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">작성자</h3>
              <p>{selectedLog.userName}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">업무 내용</h3>
              <div className="p-4 bg-gray-50 rounded whitespace-pre-wrap">
                {selectedLog.content}
              </div>
            </div>
            {selectedLog.status === 'submitted' && (
              <Button
                onClick={() => {
                  handleReview(selectedLog.id);
                  setIsModalOpen(false);
                }}
                disabled={isLoading}
                className="w-full"
              >
                검토 완료
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WorkLogReviewPage;
