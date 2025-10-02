import React, { useState, useEffect } from 'react';
import { getIrregularWorks, completeIrregularWork } from '@repo/api-client';
import { Button, Table } from '@repo/shared-ui';
import type { IrregularWork } from '@repo/shared-types';

const IrregularWorkPage: React.FC = () => {
  const [works, setWorks] = useState<IrregularWork[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    setIsLoading(true);
    try {
      const response = await getIrregularWorks();
      if (response.success && response.data) {
        setWorks(response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async (workId: string) => {
    if (!confirm('완료 처리하시겠습니까?')) {
      return;
    }

    const response = await completeIrregularWork(workId);
    if (response.success) {
      alert('완료 처리되었습니다.');
      loadWorks();
    } else {
      alert(response.error?.message || '처리에 실패했습니다.');
    }
  };

  const pendingWorks = works.filter((w) => !w.completedAt);
  const completedWorks = works.filter((w) => w.completedAt);

  return (
    <div className="irregular-work-page max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">비정기 업무</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">진행중인 업무 ({pendingWorks.length})</h2>

          {isLoading ? (
            <p>로딩 중...</p>
          ) : pendingWorks.length === 0 ? (
            <p className="text-gray-500">진행중인 업무가 없습니다.</p>
          ) : (
            <Table
              data={pendingWorks}
              columns={[
                {
                  key: 'description',
                  header: '업무 내용',
                },
                {
                  key: 'assignedBy',
                  header: '지시자',
                },
                {
                  key: 'dueDate',
                  header: '마감일',
                  render: (work) => work.dueDate || '-',
                },
                {
                  key: 'actions',
                  header: '처리',
                  render: (work) => (
                    <Button onClick={() => handleComplete(work.id)} size="sm" variant="primary">
                      완료
                    </Button>
                  ),
                },
              ]}
            />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">완료된 업무 ({completedWorks.length})</h2>

          {completedWorks.length === 0 ? (
            <p className="text-gray-500">완료된 업무가 없습니다.</p>
          ) : (
            <Table
              data={completedWorks}
              columns={[
                {
                  key: 'description',
                  header: '업무 내용',
                },
                {
                  key: 'assignedBy',
                  header: '지시자',
                },
                {
                  key: 'completedAt',
                  header: '완료일',
                  render: (work) =>
                    work.completedAt ? new Date(work.completedAt).toLocaleDateString() : '-',
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IrregularWorkPage;
