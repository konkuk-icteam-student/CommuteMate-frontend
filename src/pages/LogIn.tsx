import CTAButton from '../components/CTAButton';
import Input from '../components/Input';
import { useUserForm } from '../hooks/useUserForm';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';

const LogIn = () => {
  const navigate = useNavigate();
  const { ID, setID, password, setPassword, isFormFilled } = useUserForm();

  const handleRegisterClick = () => navigate('/register');
  const handleLoginClick = () => navigate('/home');

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">근로 학생 출근 관리</h1>
        <div className="login-form">
          <Input placeholder="아이디" value={ID} onChange={(e) => setID(e.target.value)} />
          <Input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CTAButton variant={isFormFilled ? 'primary' : 'secondary'} onClick={handleLoginClick}>
            로그인
          </CTAButton>
          <CTAButton variant="tertiary" onClick={handleRegisterClick}>
            회원가입
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
