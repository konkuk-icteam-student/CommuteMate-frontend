import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@repo/auth';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">환영합니다, {user?.name}님!</h1>
        <p className="text-lg text-gray-600">출근부 신청 및 업무일지를 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">출근부</h2>
          <p className="text-gray-600 mb-4">근무 시간을 신청하고 내역을 확인하세요</p>
          <div className="space-y-2">
            <Link
              to="/attendance/apply"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              근무 신청
            </Link>
            <Link
              to="/attendance/records"
              className="block w-full px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-center"
            >
              내 근무 내역
            </Link>
            <Link
              to="/attendance/edit-request"
              className="block w-full px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-center"
            >
              수정 요청
            </Link>
          </div>

          {user?.role === 'admin' && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-semibold mb-2">관리자 메뉴</h3>
              <div className="space-y-2">
                <Link
                  to="/attendance/admin/timeslot"
                  className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-center text-sm"
                >
                  시간대별 관리
                </Link>
                <Link
                  to="/attendance/admin/statistics"
                  className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-center text-sm"
                >
                  통계
                </Link>
                <Link
                  to="/attendance/admin/approval"
                  className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-center text-sm"
                >
                  승인/반려
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Work Log Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-green-600">업무일지</h2>
          <p className="text-gray-600 mb-4">업무 내용을 기록하고 관리하세요</p>
          <div className="space-y-2">
            <Link
              to="/work-log/write"
              className="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
            >
              일지 작성
            </Link>
            <Link
              to="/work-log"
              className="block w-full px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 text-center"
            >
              내 일지 목록
            </Link>
            <Link
              to="/work-log/irregular"
              className="block w-full px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 text-center"
            >
              비정기 업무
            </Link>
          </div>

          {user?.role === 'admin' && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-semibold mb-2">관리자 메뉴</h3>
              <div className="space-y-2">
                <Link
                  to="/work-log/admin/review"
                  className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-center text-sm"
                >
                  일지 검토
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
