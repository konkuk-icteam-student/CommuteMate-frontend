import React from "react";
import CTAButton from "../components/CTAButton";
import { useNavigate } from "react-router-dom";
import left_chevron from "../assets/chevron/left_chevronImg.svg";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[353px]">
      <div onClick={() => navigate("/login")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>
      <CTAButton onClick={() => navigate("/home")}>회원가입 완료</CTAButton>
    </div>
  );
};

export default Register;
