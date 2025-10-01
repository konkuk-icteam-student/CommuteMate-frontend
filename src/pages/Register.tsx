import { useState, useEffect } from 'react';
import CTAButton from '../components/CTAButton';
import { useNavigate } from 'react-router-dom';
import left_chevron from '../assets/chevron/left_chevronImg.svg';
import Input from '../components/Input';
import classNames from 'classnames';

const Register = () => {
  const navigate = useNavigate();
  const [isRequested, setIsRequested] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleRequestVerification = () => {
    setIsRequested(true);
    setTimeLeft(180); // 3분 타이머
    // TODO: 인증번호 요청 API 호출
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-screen min-h-screen bg-[#f8f9fa] flex justify-center items-center font-['Pretendard_GOV',sans-serif]">
      <div className="bg-white p-10 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.05)] w-full max-w-[400px]">
        <div className="mb-4 cursor-pointer" onClick={() => navigate('/login')}>
          <img src={left_chevron} alt="뒤로가기" className="w-6 h-6" />
        </div>

        <h1 className="text-[22px] font-bold mb-7 text-[#212529] text-center">회원가입</h1>

        <div className="flex flex-col gap-4">
          <Input placeholder="이름" />
          <Input placeholder="이메일" />

          <div className="relative">
            <Input placeholder="인증번호 입력" className="w-full pr-20" />
            {isRequested && timeLeft > 0 && (
              <span
                className={classNames(
                  'absolute top-1/2 right-4 -translate-y-1/2 text-sm pointer-events-none font-["Pretendard_GOV",sans-serif]',
                  {
                    'text-[#d32f2f]': timeLeft <= 60,
                    'text-[#6c757d]': timeLeft > 60,
                  }
                )}
              >
                {formatTime(timeLeft)}
              </span>
            )}
          </div>

          <CTAButton onClick={handleRequestVerification}>
            {isRequested ? '인증번호 재요청' : '인증번호 요청'}
          </CTAButton>

          <Input placeholder="비밀번호" type="password" />
          <CTAButton onClick={() => navigate('/home')}>회원가입 완료</CTAButton>
        </div>
      </div>
    </div>
  );
};

export default Register;
