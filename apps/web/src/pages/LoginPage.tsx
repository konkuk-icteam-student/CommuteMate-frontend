import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@repo/auth';
import { loginApi } from '@repo/auth';
import { Button, Input } from '@repo/shared-ui';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 임시: API 없이 바로 로그인 (UI 테스트용)
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email: email,
        name: '테스트 사용자',
        role: email.includes('admin') ? ('admin' as const) : ('student' as const),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      login(mockUser, 'mock-token-12345');
      navigate('/');
      setIsLoading(false);
    }, 500);

    // 실제 API 연동 시 아래 코드 사용
    // try {
    //   const response = await loginApi({ email, password });
    //   login(response.user, response.accessToken);
    //   navigate('/');
    // } catch (err) {
    //   setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">CommuteMate</h2>
        <p className="mt-2 text-center text-sm text-gray-600">출근부 & 업무일지 관리 시스템</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
            />

            <Input
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
