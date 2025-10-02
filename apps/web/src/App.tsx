import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, ProtectedRoute } from '@repo/auth';

// Attendance pages
import {
  ApplyPage,
  MyRecordsPage,
  EditRequestPage,
  TimeSlotManagePage,
  StatisticsPage,
  ApprovalPage,
} from '@repo/attendance';

// Work-log pages
import {
  WorkLogListPage,
  WorkLogWritePage,
  IrregularWorkPage,
  WorkLogReviewPage,
} from '@repo/work-log';

// Layout components
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />

        {/* Attendance routes */}
        <Route path="attendance">
          <Route path="apply" element={<ApplyPage />} />
          <Route path="records" element={<MyRecordsPage />} />
          <Route path="edit-request" element={<EditRequestPage />} />

          {/* Admin routes */}
          <Route
            path="admin/timeslot"
            element={
              <ProtectedRoute requiredRole="admin">
                <TimeSlotManagePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/statistics"
            element={
              <ProtectedRoute requiredRole="admin">
                <StatisticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/approval"
            element={
              <ProtectedRoute requiredRole="admin">
                <ApprovalPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Work-log routes */}
        <Route path="work-log">
          <Route index element={<WorkLogListPage />} />
          <Route path="write" element={<WorkLogWritePage />} />
          <Route path="irregular" element={<IrregularWorkPage />} />

          {/* Admin routes */}
          <Route
            path="admin/review"
            element={
              <ProtectedRoute requiredRole="admin">
                <WorkLogReviewPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
