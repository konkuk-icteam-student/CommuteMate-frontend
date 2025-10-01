import { useNavigate } from 'react-router-dom';
import left_chevron from '../assets/chevron/left_chevronImg.svg';
import nfcIcon from '../../resources/img/component/icon/ico_flag.svg'; // 예시 아이콘

const CheckIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] w-full bg-[#f8f9fa] flex justify-center items-center font-['Pretendard_GOV',sans-serif]">
      <div className="relative bg-white py-10 px-6 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.05)] w-full max-w-[360px] text-center">
        <div className="absolute top-6 left-6 cursor-pointer" onClick={() => navigate('/home')}>
          <img src={left_chevron} alt="뒤로가기" className="w-6 h-6" />
        </div>

        <h2 className="text-[22px] font-bold text-[#212529] mb-10">출근 인증</h2>

        <div className="flex flex-col items-center gap-3">
          <img src={nfcIcon} alt="NFC 아이콘" className="w-20 h-20" />
          <p className="text-base font-medium text-[#495057]">태그기에 스마트폰을 가까이 대세요</p>
          <p className="text-sm text-[#4d7cfe] font-semibold">NFC 대기 중...</p>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
