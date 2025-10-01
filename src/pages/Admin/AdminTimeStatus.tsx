import { useNavigate } from 'react-router-dom';
import left_chevron from '../../assets/chevron/left_chevronImg.svg';
import { useState, useMemo } from 'react';

type WeeklyRecord = { week: string; minutes: number };
type UserSheet = { id: string; name: string; weeklyRecords: WeeklyRecord[] };

const USERS: UserSheet[] = [
  {
    id: 'junseo@naver.com',
    name: '최준서',
    weeklyRecords: [
      { week: '1주차 (8.1 ~ 8.7)', minutes: 210 },
      { week: '2주차 (8.8 ~ 8.14)', minutes: 240 },
      { week: '3주차 (8.15 ~ 8.21)', minutes: 300 },
      { week: '4주차 (8.22 ~ 8.28)', minutes: 120 },
      { week: '5주차 (8.29 ~ 8.31)', minutes: 0 },
    ],
  },
  {
    id: 'damin@naver.com',
    name: '이다민',
    weeklyRecords: [
      { week: '1주차 (8.1 ~ 8.7)', minutes: 180 },
      { week: '2주차 (8.8 ~ 8.14)', minutes: 60 },
      { week: '3주차 (8.15 ~ 8.21)', minutes: 90 },
      { week: '4주차 (8.22 ~ 8.28)', minutes: 180 },
      { week: '5주차 (8.29 ~ 8.31)', minutes: 0 },
    ],
  },
  {
    id: 'Better@naver.com',
    name: '나은정',
    weeklyRecords: [
      { week: '1주차 (8.1 ~ 8.7)', minutes: 240 },
      { week: '2주차 (8.8 ~ 8.14)', minutes: 180 },
      { week: '3주차 (8.15 ~ 8.21)', minutes: 210 },
      { week: '4주차 (8.22 ~ 8.28)', minutes: 180 },
      { week: '5주차 (8.29 ~ 8.31)', minutes: 0 },
    ],
  },
];

const fmt = (min: number) => `${Math.floor(min / 60)}시간 ${min % 60}분`;

const AdminTimeStatus = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(USERS[0].id);

  const activeUser = useMemo(() => USERS.find((u) => u.id === activeId)!, [activeId]);

  const totalMinutes = useMemo(
    () => activeUser.weeklyRecords.reduce((sum, r) => sum + r.minutes, 0),
    [activeUser]
  );

  return (
    <div className="w-full h-[100dvh] p-6 bg-[#f8f9fa] font-['Pretendard_GOV',sans-serif]">
      <div className="flex items-center gap-2 mb-6">
        <button
          className="bg-transparent border-0 p-0 cursor-pointer"
          onClick={() => navigate('/admin/home')}
        >
          <img src={left_chevron} alt="뒤로가기" className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-[#212121]">근로학생 근무시간 통계</h1>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 mb-4 flex-wrap" role="tablist" aria-label="직원 선택">
        {USERS.map((u) => {
          const selected = u.id === activeId;
          return (
            <button
              key={u.id}
              id={`tab-${u.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${u.id}`}
              className={`appearance-none bg-white border border-[#dee2e6] rounded-full py-2 px-4 text-sm font-medium text-[#495057] cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus-visible:outline-2 focus-visible:outline-[#1d4ed8] focus-visible:outline-offset-2 ${selected ? 'bg-[#1d4ed8] text-white border-transparent' : ''}`}
              onClick={() => setActiveId(u.id)}
              type="button"
            >
              {u.name}
            </button>
          );
        })}
      </div>

      {/* 패널 */}
      <div id={`panel-${activeUser.id}`} role="tabpanel" aria-labelledby={`tab-${activeUser.id}`}>
        <div className="bg-white rounded-2xl p-4 shadow-[0_4px_8px_rgba(0,0,0,0.04)] mb-6">
          <div className="text-sm text-[#6c757d]">총 누적 근무 시간</div>
          <div className="mt-2 text-2xl font-bold text-[#0056b3]">{fmt(totalMinutes)}</div>
        </div>

        <div className="flex flex-col gap-3">
          {activeUser.weeklyRecords.map((record, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex justify-between items-center"
            >
              <div className="text-sm text-[#343a40]">{record.week}</div>
              <div className="text-base font-semibold text-[#1d4ed8]">{fmt(record.minutes)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTimeStatus;
