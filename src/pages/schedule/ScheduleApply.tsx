import { useState } from "react";
import { useNavigate } from "react-router-dom";
import left_chevron from "../../assets/chevron/left_chevronImg.svg";
import "../../styles/schedule/schedule.scss";
import CTAButton from "../../components/CTAButton";
import classNames from "classnames";

const DAYS = ["월", "화", "수", "목", "금"];
const TIMES = Array.from({ length: 18 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  const min = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${min}`;
});
const DISABLED_TIMES = ["11:30", "12:00", "12:30"];

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

  return (
    <div className="schedule-container">
      <div className="back-button" onClick={() => navigate("/schedule")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>

      <h2 className="schedule-title">근로 시간 신청</h2>

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
          {DAYS.map((day) => (
            <div key={day} className="day-cell">
              {day}
            </div>
          ))}
        </div>

        {TIMES.map((time) => (
          <div key={time} className="row">
            <div className="time-cell">{time}</div>
            {DAYS.map((day) => {
              const key = `${currentWeek}-${day}-${time}`;
              const isDisabled = DISABLED_TIMES.includes(time);

              return (
                <div
                  key={key}
                  className={classNames("cell", {
                    selected: selected[key],
                    disabled: isDisabled,
                  })}
                  onClick={() => {
                    if (!isDisabled) toggleCell(day, time);
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <CTAButton>일괄신청</CTAButton>
    </div>
  );
};

export default ScheduleApply;
