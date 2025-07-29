import { useNavigate } from "react-router-dom";
import left_chevron from "../assets/chevron/left_chevronImg.svg";

const TasksToday = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate("/home")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>
      <div>오늘 할 일</div>
    </div>
  );
};

export default TasksToday;
