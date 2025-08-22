import { useNavigate } from "react-router-dom";
import left_chevron from "../../assets/chevron/left_chevronImg.svg";
import "../../styles/schedule/schedule-history.scss";

const AdminTimeStatus = () => {
  const navigate = useNavigate();

  const weeklyRecords = [
    { week: "1주차 (8.1 ~ 8.7)", hours: "3시간 30분" },
    { week: "2주차 (8.8 ~ 8.14)", hours: "4시간 0분" },
    { week: "3주차 (8.15 ~ 8.21)", hours: "5시간 0분" },
    { week: "4주차 (8.22 ~ 8.28)", hours: "2시간 0분" },
    { week: "5주차 (8.29 ~ 8.31)", hours: "0시간 0분" },
  ];

  return (
    <div className="schedule-history">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/admin/home")}>
          <img src={left_chevron} alt="뒤로가기" />
        </button>
        <h1 className="title">근로 시간 조회</h1>
      </div>

      <div className="month-selector">최준서</div>

      <div className="summary-card">
        <div className="label">총 누적 근무 시간</div>
        <div className="total-time">14시간 30분</div>
      </div>

      <div className="weekly-list">
        {weeklyRecords.map((record, idx) => (
          <div key={idx} className="weekly-card">
            <div className="week">{record.week}</div>
            <div className="hours">{record.hours}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTimeStatus;
