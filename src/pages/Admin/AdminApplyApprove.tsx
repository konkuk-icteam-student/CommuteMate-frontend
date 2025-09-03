import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/admin/applyApprove.scss';
import left_chevron from '../../assets/chevron/left_chevronImg.svg';
import { useNavigate } from 'react-router-dom';

/* ===== Types ===== */
type ApplyStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

type StudentApply = {
  studentId: string;
  name: string;
  applications: Array<{
    id: string; // 개별 신청 ID (날짜 단위)
    date: string; // "YYYY-MM-DD" (한 달 내)
    slots: string[]; // ["09:00–09:30","10:00–10:30"] 등 30분 단위
    note?: string;
    status: ApplyStatus; // 해당 날짜 신청 상태
    submittedAt: string; // ISO
  }>;
};

/* ===== Helpers ===== */
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const validStart = toMinutes('09:00');
const validEnd = toMinutes('17:30'); // inclusive boundary for 30-min slot end

const isValidSlot = (slot: string) => {
  // "HH:MM–HH:MM"
  const [a, b] = slot.split('–');
  const s = toMinutes(a);
  const e = toMinutes(b);
  return s >= validStart && e <= validEnd && e - s >= 60;
};
const allValid = (slots: string[]) => slots.length > 0 && slots.every(isValidSlot);

/* ===== Mock APIs (교체 지점) ===== */
// 관리자는 "월" 단위로 불러오기, 결과는 학생별 카드 구조
async function fetchAppliesByStudent(monthISO: string): Promise<StudentApply[]> {
  // GET /api/apply-requests?month=YYYY-MM&groupBy=student
  // 데모 데이터: 같은 month 내에서 "신청한 날짜만" 포함됨
  const demo: StudentApply[] = [
    {
      studentId: 's1',
      name: '최준서',
      applications: [
        {
          id: 'a1',
          date: `${monthISO}-03`,
          slots: ['09:00–11:30', '13:00–17:30'],
          note: '',
          status: 'PENDING',
          submittedAt: new Date().toISOString(),
        },
        {
          id: 'a2',
          date: `${monthISO}-11`,
          slots: ['13:00–16:30'],
          status: 'PENDING',
          submittedAt: new Date().toISOString(),
        },
        {
          id: 'a3',
          date: `${monthISO}-19`,
          slots: ['09:00–11:30', '13:30–17:00'],
          status: 'PENDING',
          submittedAt: new Date().toISOString(),
        },
        {
          id: 'a4',
          date: `${monthISO}-26`,
          slots: ['09:00–11:30'],
          status: 'PENDING',
          submittedAt: new Date().toISOString(),
        },
      ],
    },
    {
      studentId: 's2',
      name: '이다민',
      applications: [
        {
          id: 'a3',
          date: `${monthISO}-03`,
          slots: ['13:00–17:30'],
          status: 'APPROVED',
          submittedAt: new Date().toISOString(),
        },
        {
          id: 'a4',
          date: `${monthISO}-05`,
          slots: ['08:30–09:00'],
          status: 'PENDING',
          submittedAt: new Date().toISOString(),
        }, // 유효범위 밖 슬롯 포함 → 경고
      ],
    },
    {
      studentId: 's3',
      name: '나은정',
      applications: [
        {
          id: 'a5',
          date: `${monthISO}-10`,
          slots: ['09:30–11:30', '13:00–16:30'],
          status: 'REJECTED',
          submittedAt: new Date().toISOString(),
        },
      ],
    },
  ];
  return new Promise((res) => setTimeout(() => res(demo), 150));
}

/* ===== Component ===== */
const AdminApplyApproveByStudent: React.FC = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`; // "YYYY-MM"
  });
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<StudentApply[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchAppliesByStudent(month);
        setCards(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [month]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return (
      cards
        .filter((c) => !ql || c.name.toLowerCase().includes(ql))
        // 신청이 하나도 없는 학생(이론상 없음) 제거
        .filter((c) => c.applications.length > 0)
    );
  }, [cards, q]);

  const handleApproveOne = async (dayId: string) => {
    // optimistic update
    setCards((prev) =>
      prev.map((stu) => ({
        ...stu,
        applications: stu.applications.map((app) =>
          app.id === dayId ? { ...app, status: 'APPROVED' } : app
        ),
      }))
    );
  };

  const handleRejectOne = async (dayId: string) => {
    setCards((prev) =>
      prev.map((stu) => ({
        ...stu,
        applications: stu.applications.map((app) =>
          app.id === dayId ? { ...app, status: 'REJECTED' } : app
        ),
      }))
    );
  };

  const handleApproveAll = async (studentId: string) => {
    // 해당 학생의 PENDING + 유효 슬롯 신청만 APPROVED
    setCards((prev) =>
      prev.map((stu) =>
        stu.studentId === studentId
          ? {
              ...stu,
              applications: stu.applications.map((app) =>
                app.status === 'PENDING' && allValid(app.slots)
                  ? { ...app, status: 'APPROVED' }
                  : app
              ),
            }
          : stu
      )
    );
  };

  const handleRejectAll = async (studentId: string) => {
    setCards((prev) =>
      prev.map((stu) =>
        stu.studentId === studentId
          ? {
              ...stu,
              applications: stu.applications.map((app) =>
                app.status === 'PENDING' ? { ...app, status: 'REJECTED' } : app
              ),
            }
          : stu
      )
    );
  };

  return (
    <div className="krds-page krds-page--w400">
      <header className="krds-header">
        <div className="krds-parent">
          <img src={left_chevron} alt="뒤로가기" onClick={() => navigate('/admin/home')} />
          <h1 className="krds-h1">근로 신청 승인(월)</h1>
          <p className="krds-desc">선택한 월에 **신청한 날짜만** 학생 카드로 표시</p>
        </div>

        <div className="krds-toolbar">
          <label className="krds-field">
            <span className="krds-label">월 선택</span>
            <input
              type="month"
              className="krds-input"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </label>

          <label className="krds-field krds-field--grow">
            <span className="krds-label">이름 검색</span>
            <input
              type="search"
              className="krds-input"
              placeholder="학생 이름…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>
      </header>

      <section className="krds-card">
        {loading && <div className="krds-empty">불러오는 중…</div>}
        {!loading && filtered.length === 0 && (
          <div className="krds-empty">해당 월에 신청한 학생이 없습니다.</div>
        )}

        {!loading &&
          filtered.map((stu) => {
            // 신청 요약: 총 신청일수 / PENDING 수
            const totalDays = stu.applications.length;
            const pendingCount = stu.applications.filter((a) => a.status === 'PENDING').length;

            return (
              <article key={stu.studentId} className="student-card">
                <div className="student-head">
                  <div className="student-name">{stu.name}</div>
                  <div className="student-meta">
                    <span className="meta-chip">신청일수 {totalDays}</span>
                    {pendingCount > 0 && (
                      <span className="meta-chip meta-chip--pending">대기 {pendingCount}</span>
                    )}
                  </div>
                </div>

                <ul className="apply-list">
                  {stu.applications.map((app) => {
                    const valid = allValid(app.slots);
                    return (
                      <li
                        key={app.id}
                        className={'apply-item' + (valid ? '' : ' apply-item--warn')}
                      >
                        <div className="apply-row">
                          <div className="apply-date">{app.date}</div>
                          <span className={`status status--${app.status.toLowerCase()}`}>
                            {app.status === 'PENDING'
                              ? '대기'
                              : app.status === 'APPROVED'
                                ? '승인'
                                : '반려'}
                          </span>
                        </div>

                        <div className="apply-slots">
                          {app.slots.map((s) => (
                            <span
                              key={s}
                              className={'slot' + (isValidSlot(s) ? '' : ' slot--error')}
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        {app.note && <div className="apply-note">메모: {app.note}</div>}
                        {!valid && (
                          <div className="apply-warn">
                            허용 시간(09:00–17:30) 밖 슬롯이 포함되어 있습니다.
                          </div>
                        )}

                        <div className="apply-actions">
                          <button
                            className="krds-btn"
                            onClick={() => handleApproveOne(app.id)}
                            disabled={app.status !== 'PENDING' || !valid}
                            title={!valid ? '허용 범위 밖 신청은 승인할 수 없습니다.' : ''}
                          >
                            승인
                          </button>
                          <button
                            className="krds-btn krds-btn--ghost"
                            onClick={() => handleRejectOne(app.id)}
                            disabled={app.status !== 'PENDING'}
                          >
                            반려
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="student-actions">
                  <button
                    className="krds-btn"
                    onClick={() => handleApproveAll(stu.studentId)}
                    disabled={pendingCount === 0}
                  >
                    대기 전체 승인
                  </button>
                  <button
                    className="krds-btn krds-btn--ghost"
                    onClick={() => handleRejectAll(stu.studentId)}
                    disabled={pendingCount === 0}
                  >
                    대기 전체 반려
                  </button>
                </div>
              </article>
            );
          })}
      </section>
    </div>
  );
};

export default AdminApplyApproveByStudent;
