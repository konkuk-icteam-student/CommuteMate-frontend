import CTAButton from "../components/CTAButton";
import { useNavigate } from "react-router-dom";
import left_chevron from "../assets/chevron/left_chevronImg.svg";
import Input from "../components/Input";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[353px] gap-[15px]">
      <div onClick={() => navigate("/login")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>
      <Input placeholder="이메일" />
      <Input placeholder="인증번호" />
      <CTAButton>인증번호 요청</CTAButton>
      <Input placeholder="비밀번호" type="password" />
      <CTAButton onClick={() => navigate("/home")}>회원가입 완료</CTAButton>
    </div>
  );
};

export default Register;
