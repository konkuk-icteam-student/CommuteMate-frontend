import { useNavigate } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import '../styles/home.scss'; // SCSS import

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">홈</h1>
        <div className="home-buttons">
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
