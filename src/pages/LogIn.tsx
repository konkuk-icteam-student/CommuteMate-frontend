import CTAButton from '../components/CTAButton';
import Input from '../components/Input';
import { useUserForm } from '../hooks/useUserForm';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();
  const { ID, setID, password, setPassword, isFormFilled } = useUserForm();

  const handleRegisterClick = () => navigate('/register');
  const handleLoginClick = () => navigate('/home');

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-white font-['Pretendard_GOV',sans-serif]">
      <div className="w-full max-w-[360px] px-6">
        <h1 className="text-2xl font-bold text-[#111] mb-10 text-center">근로 학생 출근 관리</h1>
        <div className="flex flex-col gap-3">
          <Input placeholder="아이디" value={ID} onChange={(e) => setID(e.target.value)} />
          <Input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="h-2"></div>
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
