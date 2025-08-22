import { useState } from "react";
import { useNavigate } from "react-router-dom";
import left_chevron from "../../assets/chevron/left_chevronImg.svg";
import "../../styles/schedule/schedule.scss";
import CTAButton from "../../components/CTAButton";
import classNames from "classnames";
import { addDays, startOfWeek } from "date-fns";
import { MONTH_LIMIT, WEEK_LIMIT, INTERVAL } from "../../constants/global";

const today = new Date();
today.setDate(today.getDate() + INTERVAL);
const YEAR = today.getFullYear();
const TARGET_MONTH = today.getMonth();

const getWeekDates = (
  week: number
): { label: string; date: Date; disabled: boolean }[] => {
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

  const pad = (n: number) => String(n).padStart(2, "0");

  const start = `${pad(startHour)}:${pad(startMin)}`;
  const end = `${pad(endHour)}:${pad(endMin)}`;

  return `${start}~${end}`;
});

const DISABLED_TIMES = ["11:30~12:00", "12:00~12:30", "12:30~13:00"];

const ScheduleApply = () => {
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
    <div className="schedule-container">
      <div className="header">
        <div className="back-button" onClick={() => navigate("/schedule")}>
          <img src={left_chevron} alt="뒤로가기" />
        </div>
        <h2 className="schedule-title">{TARGET_MONTH + 1}월 근로 시간 신청</h2>
      </div>
      <div className="week-selector">
        {[1, 2, 3, 4, 5].map((week) => (
          <button
            key={week}
            onClick={() => setCurrentWeek(week)}
            className={currentWeek === week ? "active" : ""}
          >
            {week}주차
          </button>
        ))}
      </div>

      <div className="schedule-grid">
        <div className="header-row">
          <div className="time-cell" />
          {dates.map((d, i) => (
            <div key={i} className="day-cell">
              <div className="date-label">{d.label}</div>
              <div className="weekday-label">
                {["월", "화", "수", "목", "금"][i]}
              </div>
            </div>
          ))}
        </div>

        {TIMES.map((time) => (
          <div key={time} className="row">
            <div className="time-cell">{time}</div>
            {dates.map((d) => {
              const timeKey = `${currentWeek}-${d.label}-${time}`; // label 사용
              const isDisabled = d.disabled || DISABLED_TIMES.includes(time);

              return (
                <div
                  key={timeKey}
                  className={classNames("cell", {
                    selected: selected[timeKey],
                    disabled: isDisabled,
                  })}
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
      <div className="summary">
        <p
          className={
            parseFloat(getWeeklyHours(currentWeek)) > WEEK_LIMIT
              ? "text-red"
              : ""
          }
        >
          {currentWeek}주차 근무 시간: {getWeeklyHours(currentWeek)}시간
        </p>

        <p
          className={
            parseFloat(getMonthlyHours()) > MONTH_LIMIT
              ? "text-red"
              : parseFloat(getMonthlyHours()) === MONTH_LIMIT
              ? "text-green"
              : ""
          }
        >
          {TARGET_MONTH + 1}월 총 근무 시간: {getMonthlyHours()}시간
        </p>
      </div>
      <div className="button-box">
        <CTAButton
          variant={
            parseFloat(getMonthlyHours()) !== MONTH_LIMIT
              ? "secondary"
              : parseFloat(getWeeklyHours(currentWeek)) > WEEK_LIMIT
              ? "secondary"
              : "primary"
          }
        >
          일괄 신청
        </CTAButton>
        <CTAButton variant="tertiary">신청 취소</CTAButton>
      </div>
    </div>
  );
};

export default ScheduleApply;
