import { useNavigate } from 'react-router-dom';
import CTAButton from '../../components/CTAButton';
import '../../styles/home.scss'; // SCSS import

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">관리자 홈</h1>
        <div className="home-buttons">
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
