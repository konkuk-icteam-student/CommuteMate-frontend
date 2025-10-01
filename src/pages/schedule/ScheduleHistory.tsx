import { useNavigate } from 'react-router-dom';
import left_chevron from '../../assets/chevron/left_chevronImg.svg';

const ScheduleHistory = () => {
  const navigate = useNavigate();

  const weeklyRecords = [
    { week: '1주차 (8.1 ~ 8.7)', hours: '3시간 30분' },
    { week: '2주차 (8.8 ~ 8.14)', hours: '4시간 0분' },
    { week: '3주차 (8.15 ~ 8.21)', hours: '5시간 0분' },
    { week: '4주차 (8.22 ~ 8.28)', hours: '2시간 0분' },
    { week: '5주차 (8.29 ~ 8.31)', hours: '0시간 0분' },
  ];

  return (
    <div className="w-full h-[100dvh] p-6 bg-[#f8f9fa] font-['Pretendard_GOV',sans-serif]">
      <div className="flex items-center gap-2 mb-6">
        <button
          className="bg-transparent border-0 p-0 cursor-pointer"
          onClick={() => navigate('/schedule')}
        >
          <img src={left_chevron} alt="뒤로가기" className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-[#212121]">근로 시간 조회</h1>
      </div>

      <div className="inline-block bg-white border border-[#dee2e6] rounded-full py-2 px-4 text-sm font-medium text-[#495057] mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        2025년 9월
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_8px_rgba(0,0,0,0.04)] mb-6">
        <div className="text-sm text-[#6c757d]">총 누적 근무 시간</div>
        <div className="mt-2 text-2xl font-bold text-[#0056b3]">14시간 30분</div>
      </div>

      <div className="flex flex-col gap-3">
        {weeklyRecords.map((record, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex justify-between items-center"
          >
            <div className="text-sm text-[#343a40]">{record.week}</div>
            <div className="text-base font-semibold text-[#1d4ed8]">{record.hours}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleHistory;
