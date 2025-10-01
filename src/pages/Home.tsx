import { useNavigate } from 'react-router-dom';
import CTAButton from '../components/CTAButton';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-[100dvh] bg-[#f8f9fa] flex justify-center items-center font-['Pretendard_GOV',sans-serif]">
      <div className="bg-white p-10 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.05)] w-full max-w-[400px] text-center">
        <h1 className="text-[22px] font-bold text-[#212529] mb-8">홈</h1>
        <div className="flex flex-col gap-4">
          <CTAButton onClick={() => navigate('/check-in')}>출근 인증</CTAButton>
          <CTAButton onClick={() => navigate('/schedule')}>근로 시간 관리</CTAButton>
          <CTAButton onClick={() => navigate('/tasks/today')}>오늘 할 일</CTAButton>
          <CTAButton variant="tertiary" onClick={() => navigate('/login')}>
            로그아웃
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
