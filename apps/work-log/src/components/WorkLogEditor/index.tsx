import React from 'react';

export interface WorkLogEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export const WorkLogEditor: React.FC<WorkLogEditorProps> = ({
  content,
  onChange,
  placeholder = '업무 내용을 입력하세요...',
  className = '',
}) => {
  return (
    <div className={`work-log-editor ${className}`}>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={15}
        style={{ fontFamily: 'monospace' }}
      />
      <div className="text-sm text-gray-500 mt-2">{content.length}자</div>
    </div>
  );
};
