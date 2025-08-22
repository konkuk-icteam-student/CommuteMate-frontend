import { useNavigate } from "react-router-dom";
import left_chevron from "../../assets/chevron/left_chevronImg.svg";
import "../../styles/schedule/schedule-history.scss";
import { useState, useMemo } from "react";

type WeeklyRecord = { week: string; minutes: number };
type UserSheet = { id: string; name: string; weeklyRecords: WeeklyRecord[] };

const USERS: UserSheet[] = [
  {
    id: "junseo@naver.com",
    name: "최준서",
    weeklyRecords: [
      { week: "1주차 (8.1 ~ 8.7)", minutes: 210 },
      { week: "2주차 (8.8 ~ 8.14)", minutes: 240 },
      { week: "3주차 (8.15 ~ 8.21)", minutes: 300 },
      { week: "4주차 (8.22 ~ 8.28)", minutes: 120 },
      { week: "5주차 (8.29 ~ 8.31)", minutes: 0 },
    ],
  },
  {
    id: "damin@naver.com",
    name: "이다민",
    weeklyRecords: [
      { week: "1주차 (8.1 ~ 8.7)", minutes: 180 },
      { week: "2주차 (8.8 ~ 8.14)", minutes: 60 },
      { week: "3주차 (8.15 ~ 8.21)", minutes: 90 },
      { week: "4주차 (8.22 ~ 8.28)", minutes: 180 },
      { week: "5주차 (8.29 ~ 8.31)", minutes: 0 },
    ],
  },
  {
    id: "Better@naver.com",
    name: "나은정",
    weeklyRecords: [
      { week: "1주차 (8.1 ~ 8.7)", minutes: 240 },
      { week: "2주차 (8.8 ~ 8.14)", minutes: 180 },
      { week: "3주차 (8.15 ~ 8.21)", minutes: 210 },
      { week: "4주차 (8.22 ~ 8.28)", minutes: 180 },
      { week: "5주차 (8.29 ~ 8.31)", minutes: 0 },
    ],
  },
];

const fmt = (min: number) => `${Math.floor(min / 60)}시간 ${min % 60}분`;

const AdminTimeStatus = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(USERS[0].id);

  const activeUser = useMemo(
    () => USERS.find((u) => u.id === activeId)!,
    [activeId]
  );

  const totalMinutes = useMemo(
    () => activeUser.weeklyRecords.reduce((sum, r) => sum + r.minutes, 0),
    [activeUser]
  );

  return (
    <div className="schedule-history">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/admin/home")}>
          <img src={left_chevron} alt="뒤로가기" />
        </button>
        <h1 className="title">근로학생 근무시간 통계</h1>
      </div>

      {/* 탭 */}
      <div className="tabs" role="tablist" aria-label="직원 선택">
        {USERS.map((u) => {
          const selected = u.id === activeId;
          return (
            <button
              key={u.id}
              id={`tab-${u.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${u.id}`}
              className={`tab ${selected ? "is-active" : ""}`}
              onClick={() => setActiveId(u.id)}
              type="button"
            >
              {u.name}
            </button>
          );
        })}
      </div>

      {/* 패널 */}
      <div
        id={`panel-${activeUser.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeUser.id}`}
      >
        <div className="summary-card">
          <div className="label">총 누적 근무 시간</div>
          <div className="total-time">{fmt(totalMinutes)}</div>
        </div>

        <div className="weekly-list">
          {activeUser.weeklyRecords.map((record, idx) => (
            <div key={idx} className="weekly-card">
              <div className="week">{record.week}</div>
              <div className="hours">{fmt(record.minutes)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTimeStatus;
