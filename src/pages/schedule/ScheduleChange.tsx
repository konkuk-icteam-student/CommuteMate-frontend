import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import left_chevron from '../../assets/chevron/left_chevronImg.svg';
import CTAButton from '../../components/CTAButton';
import classNames from 'classnames';
import { addDays, startOfWeek } from 'date-fns';

const today = new Date();
const YEAR = today.getFullYear();
const TARGET_MONTH = today.getMonth();

const getWeekDates = (week: number): { label: string; date: Date; disabled: boolean }[] => {
  const start = new Date(YEAR, TARGET_MONTH, 1); // 9월 1일 시작
  const base = addDays(start, (week - 1) * 7);
  const monday = startOfWeek(base, { weekStartsOn: 1 }); // 월요일 기준

  return Array.from({ length: 5 }, (_, i) => {
    const day = addDays(monday, i); // 월~금
    return {
      label: `${day.getMonth() + 1}/${day.getDate()}`, // 예: 9/1
      date: day,
      disabled: day.getMonth() !== TARGET_MONTH,
    };
  });
};

const TIMES = Array.from({ length: 17 }, (_, i) => {
  const startHour = 9 + Math.floor(i / 2);
  const startMin = i % 2 === 0 ? 0 : 30;

  const endMinutes = startHour * 60 + startMin + 30;
  const endHour = Math.floor(endMinutes / 60);
  const endMin = endMinutes % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  const start = `${pad(startHour)}:${pad(startMin)}`;
  const end = `${pad(endHour)}:${pad(endMin)}`;

  return `${start}~${end}`;
});

const DISABLED_TIMES = ['11:30~12:00', '12:00~12:30', '12:30~13:00'];

const ScheduleChange = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const toggleCell = (day: string, time: string) => {
    const key = `${currentWeek}-${day}-${time}`;
    setSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getWeeklyHours = (week: number) => {
    const count = Object.entries(selected).filter(
      ([key, value]) => key.startsWith(`${week}-`) && value === true
    ).length;
    return (count * 0.5).toFixed(1);
  };

  const getMonthlyHours = () => {
    const count = Object.values(selected).filter((v) => v === true).length;
    return (count * 0.5).toFixed(1);
  };

  const dates = getWeekDates(currentWeek);
  return (
    <div className="h-[100dvh] w-full bg-[#f8f9fa] font-['Pretendard_GOV',sans-serif] p-6 box-border text-[#212529]">
      <div className="flex items-center gap-2 mb-6">
        <div className="mb-4 cursor-pointer overflow-hidden" onClick={() => navigate('/schedule')}>
          <img src={left_chevron} alt="뒤로가기" className="w-6 h-6" />
        </div>
        <h2 className="text-[22px] font-bold text-[#212529] mb-6 text-center">{TARGET_MONTH + 1}월 근로 시간 변경</h2>
      </div>

      <div className="flex justify-center gap-1.5 mb-6">
        {[1, 2, 3, 4, 5].map((week) => (
          <button
            key={week}
            onClick={() => setCurrentWeek(week)}
            className={classNames(
              'py-2 px-4 text-sm rounded-full border border-[#dee2e6] bg-white text-[#495057] cursor-pointer',
              { 'bg-[#4d7cfe] text-white font-semibold': currentWeek === week }
            )}
          >
            {week}주차
          </button>
        ))}
      </div>

      <div className="overflow-x-auto border border-[#dee2e6] rounded-xl bg-white mb-6">
        <div className="flex">
          <div className="w-[100px] min-w-[90px] text-[13px] font-medium bg-[#f1f3f5] text-[#212529] p-2 text-center border-r border-[#dee2e6]" />
          {dates.map((d, i) => (
            <div key={i} className="flex-1 border-r border-[#dee2e6] p-2 text-center bg-[#f1f3f5]">
              <div className="text-xs text-[#868e96]">{d.label}</div>
              <div className="text-sm font-semibold text-[#212529]">{['월', '화', '수', '목', '금'][i]}</div>
            </div>
          ))}
        </div>

        {TIMES.map((time) => (
          <div key={time} className="flex border-t border-[#dee2e6]">
            <div className="w-[100px] min-w-[90px] text-[13px] font-medium bg-[#f1f3f5] text-[#212529] p-2 text-center border-r border-[#dee2e6]">{time}</div>
            {dates.map((d) => {
              const timeKey = `${currentWeek}-${d.label}-${time}`;
              const isDisabled = d.disabled || DISABLED_TIMES.includes(time);

              return (
                <div
                  key={timeKey}
                  className={classNames(
                    'flex-1 h-9 border-r border-[#dee2e6] cursor-pointer transition-colors duration-150',
                    {
                      'bg-[#d0f0c0]': selected[timeKey],
                      'bg-[#e9ecef] cursor-not-allowed': isDisabled,
                      'active:bg-[#e9f8e2]': !isDisabled,
                    }
                  )}
                  onClick={() => {
                    if (!isDisabled) {
                      toggleCell(d.label, time);
                    }
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="text-center text-sm mb-6">
        <p className={classNames('my-1.5', { 'text-[#d32f2f] font-semibold': parseFloat(getWeeklyHours(currentWeek)) >= 13.5 })}>
          {currentWeek}주차 근무 시간: {getWeeklyHours(currentWeek)}시간
        </p>

        <p
          className={classNames('my-1.5', {
            'text-[#d32f2f] font-semibold': parseFloat(getMonthlyHours()) >= 27.5,
            'text-[#2e7d32] font-semibold': parseFloat(getMonthlyHours()) === 27,
          })}
        >
          {TARGET_MONTH + 1}월 총 근무 시간: {getMonthlyHours()}시간
        </p>
      </div>
      <div className="flex pb-5">
        <CTAButton>변경 요청</CTAButton>
      </div>
    </div>
  );
};

export default ScheduleChange;
