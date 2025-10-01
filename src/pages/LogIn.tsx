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
    <div className="w-screen min-h-screen flex justify-center items-center bg-[#f8f9fa] font-['Pretendard_GOV',sans-serif]">
      <div className="bg-white p-10 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.05)] w-full max-w-[360px]">
        <h1 className="text-2xl font-bold text-center text-[#212529] mb-8">근로 학생 출근 관리</h1>
        <div className="flex flex-col gap-4">
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
