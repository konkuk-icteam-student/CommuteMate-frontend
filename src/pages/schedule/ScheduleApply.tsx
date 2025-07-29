import React from "react";
import { useNavigate } from "react-router-dom";
import left_chevron from "../../assets/chevron/left_chevronImg.svg";

const ScheduleApply = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate("/schedule")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>
      <div>스케줄 신청</div>
    </div>
  );
};

export default ScheduleApply;
