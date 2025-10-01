import { useNavigate } from 'react-router-dom';
import CTAButton from '../../components/CTAButton';
import left_chevron from '../../assets/chevron/left_chevronImg.svg';

const ScheduleHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(var(--vh,1vh)*100)] w-screen bg-[#f8f9fa] flex justify-center items-center font-['Pretendard_GOV',sans-serif]">
      <div className="bg-white py-10 px-6 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.05)] w-full max-w-[400px] relative text-center">
        <div className="flex items-center gap-2 mb-6">
          <button
            className="bg-transparent border-0 p-0 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <img src={left_chevron} alt="뒤로가기" className="w-6 h-6" />
          </button>
          <h2 className="text-[25px] font-semibold text-[#212121]">근로 시간 관리</h2>
        </div>

        <div className="flex flex-col gap-4">
          <CTAButton onClick={() => navigate('apply')}>근로 시간 신청</CTAButton>
          <CTAButton onClick={() => navigate('change')}>근로 시간 변경</CTAButton>
          <CTAButton onClick={() => navigate('history')}>내 근로 시간 조회</CTAButton>
        </div>
      </div>
    </div>
  );
};

export default ScheduleHome;
