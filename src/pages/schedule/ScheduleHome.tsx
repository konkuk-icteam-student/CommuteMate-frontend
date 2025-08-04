import { useNavigate } from "react-router-dom";
import CTAButton from "../../components/CTAButton";
import left_chevron from "../../assets/chevron/left_chevronImg.svg";
import "../../styles/schedule-home.scss";

const ScheduleHome = () => {
  const navigate = useNavigate();

  return (
    <div className="schedule-home-container">
      <div className="back-button" onClick={() => navigate("/home")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>
      <CTAButton onClick={() => navigate("apply")}>근로 시간 신청</CTAButton>
      <CTAButton onClick={() => navigate("change")}>
        근로 시간 변경/삭제
      </CTAButton>
      <CTAButton onClick={() => navigate("history")}>
        내 근로 시간 조회
      </CTAButton>
    </div>
  );
};

export default ScheduleHome;
