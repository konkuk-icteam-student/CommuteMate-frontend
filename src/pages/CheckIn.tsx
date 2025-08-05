import { useNavigate } from "react-router-dom";
import left_chevron from "../assets/chevron/left_chevronImg.svg";
import nfcIcon from "../../resources/img/component/icon/ico_flag.svg"; // 예시 아이콘
import "../styles/check-in.scss";

const CheckIn = () => {
  const navigate = useNavigate();

  return (
    <div className="checkin-container">
      <div className="checkin-box">
        <div className="back-button" onClick={() => navigate("/home")}>
          <img src={left_chevron} alt="뒤로가기" />
        </div>

        <h2 className="checkin-title">출근 인증</h2>

        <div className="nfc-visual">
          <img src={nfcIcon} alt="NFC 아이콘" className="nfc-icon" />
          <p className="nfc-text">태그기에 스마트폰을 가까이 대세요</p>
          <p className="nfc-status">NFC 대기 중...</p>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
