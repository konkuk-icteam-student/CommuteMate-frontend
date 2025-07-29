import CTAButton from "../components/CTAButton";
import Input from "../components/Input";
import { useUserForm } from "../hooks/useUserForm";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };
  const moveHome = () => {
    navigate("/home");
  };
  const { ID, setID, password, setPassword, isFormFilled } = useUserForm();
  return (
    <div className="w-[353px]">
      <div className="text-[30px] text-center mb-[50px]">
        근로 학생 출근 관리
      </div>
      <div className="flex flex-col gap-[10px]">
        <Input
          placeholder="아이디"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CTAButton
          variant={isFormFilled ? "green" : "thickGray"}
          onClick={moveHome}
        >
          로그인
        </CTAButton>
        <CTAButton variant="gray" onClick={handleClick}>
          회원가입
        </CTAButton>
      </div>
    </div>
  );
};

export default LogIn;
