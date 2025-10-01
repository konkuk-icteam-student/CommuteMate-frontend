import { useNavigate } from 'react-router-dom';
import CTAButton from '../../components/CTAButton';

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-[100dvh] bg-[#f8f9fa] flex justify-center items-center font-['Pretendard_GOV',sans-serif]">
      <div className="bg-white p-10 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.05)] w-full max-w-[400px] text-center">
        <h1 className="text-[22px] font-bold text-[#212529] mb-8">관리자 홈</h1>
        <div className="flex flex-col gap-4">
          <CTAButton onClick={() => navigate('/admin/applyapprove')}>근로 신청 승인</CTAButton>
          <CTAButton onClick={() => navigate('/admin/changeapprove')}>
            근로 수정 요청 승인
          </CTAButton>
          <CTAButton onClick={() => navigate('/admin/checktime')}>시간대별 근로학생 확인</CTAButton>
          <CTAButton onClick={() => navigate('/admin/settodo')}>할 일 설정</CTAButton>
          <CTAButton onClick={() => navigate('/admin/timestatus')}>
            근로학생 근무시간 통계
          </CTAButton>
          <CTAButton variant="tertiary" onClick={() => navigate('/login')}>
            로그아웃
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
