import { useNavigate } from "react-router-dom";
import left_chevron from "../../assets/chevron/left_chevronImg.svg";

const ScheduleChange = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate("/schedule")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>
      <div>근로 시간 변경/삭제</div>
    </div>
  );
};

export default ScheduleChange;
