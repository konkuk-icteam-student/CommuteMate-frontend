import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkLog } from '@repo/api-client';
import { WorkLogEditor } from '../../components/WorkLogEditor';
import { Button } from '@repo/shared-ui';
import { formatDate } from '@repo/shared-utils';
import type { WorkLogType } from '@repo/shared-types';

const WorkLogWritePage: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(formatDate(new Date()));
  const [type, setType] = useState<WorkLogType>('regular');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveDraft = async () => {
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await createWorkLog({
        date,
        type,
        content,
      });

      if (response.success) {
        alert('임시저장되었습니다.');
        navigate('/work-log');
      } else {
        alert(response.error?.message || '저장에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (!confirm('제출하시겠습니까? 제출 후에는 수정할 수 없습니다.')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await createWorkLog({
        date,
        type,
        content,
      });

      if (response.success) {
        alert('제출되었습니다.');
        navigate('/work-log');
      } else {
        alert(response.error?.message || '제출에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="work-log-write-page max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">업무일지 작성</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-semibold">날짜</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">업무 유형</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as WorkLogType)}
              className="w-full p-2 border rounded"
            >
              <option value="regular">정기</option>
              <option value="irregular">비정기</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">업무 내용</label>
          <WorkLogEditor
            content={content}
            onChange={setContent}
            placeholder="오늘의 업무 내용을 상세히 작성해주세요..."
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button onClick={() => navigate('/work-log')} variant="outline" disabled={isLoading}>
            취소
          </Button>
          <Button onClick={handleSaveDraft} variant="outline" disabled={isLoading}>
            임시저장
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? '제출 중...' : '제출'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkLogWritePage;
