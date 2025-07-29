import { useNavigate } from "react-router-dom";
import left_chevron from "../assets/chevron/left_chevronImg.svg";

const CheckIn = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate("/home")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>
      <div>출근 인증</div>
    </div>
  );
};

export default CheckIn;
