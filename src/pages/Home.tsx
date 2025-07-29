import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[353px] gap-[15px]">
      <CTAButton onClick={() => navigate("/schedule")}>
        근로 시간 관리
      </CTAButton>
      <CTAButton onClick={() => navigate("/tasks/today")}>오늘 할 일</CTAButton>
      <CTAButton onClick={() => navigate("/check-in")}>출근 인증</CTAButton>
      <CTAButton onClick={() => navigate("/login")}>로그아웃</CTAButton>
    </div>
  );
};

export default Home;
