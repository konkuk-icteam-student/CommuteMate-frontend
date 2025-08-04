import { useState, useEffect } from "react";
import CTAButton from "../components/CTAButton";
import { useNavigate } from "react-router-dom";
import left_chevron from "../assets/chevron/left_chevronImg.svg";
import Input from "../components/Input";
import "../styles/register.scss"; // import SCSS
import classNames from "classnames";

const Register = () => {
  const navigate = useNavigate();
  const [isRequested, setIsRequested] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleRequestVerification = () => {
    setIsRequested(true);
    setTimeLeft(180); // 3분
    // TODO: 실제 인증번호 요청 API 호출
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="register-container">
      <div className="back-button" onClick={() => navigate("/login")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>

      <Input placeholder="이메일" />

      <div className="input-with-timer">
        <Input placeholder="인증번호" />
        {isRequested && timeLeft > 0 && (
          <span
            className={classNames("input-timer", {
              "timer-danger": timeLeft <= 60,
            })}
          >
            {formatTime(timeLeft)}
          </span>
        )}
      </div>

      <CTAButton onClick={handleRequestVerification}>
        {isRequested ? "인증번호 재요청" : "인증번호 요청"}
      </CTAButton>

      <Input placeholder="비밀번호" type="password" />
      <CTAButton onClick={() => navigate("/home")}>회원가입 완료</CTAButton>
    </div>
  );
};

export default Register;
