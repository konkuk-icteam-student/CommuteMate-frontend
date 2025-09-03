// KRDSWorkSchedulePage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/admin/checkTime.scss';
import { useNavigate } from 'react-router-dom';
import left_chevron from '../../assets/chevron/left_chevronImg.svg';

/** ---------- Types ---------- */
type StudentShift = {
  studentId: string;
  name: string;
  role?: string; // 예: "사무", "지원", "개발" 등
  location?: string; // 근무 장소(사무실/도서관/랩실 등)
  start: string; // "HH:mm"
  end: string; // "HH:mm" (end exclusive)
};

type FetchResult = {
  date: string; // "YYYY-MM-DD"
  shifts: StudentShift[];
  locations: string[]; // 필터 옵션 구성용
};

/** ---------- Time Helpers ---------- */
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const fmt = (min: number) => `${pad2(Math.floor(min / 60))}:${pad2(min % 60)}`;

const generateIntervals = (dayStart = '09:00', dayEnd = '17:30', stepMin = 30) => {
  const start = toMinutes(dayStart);
  const end = toMinutes(dayEnd);
  const out: { startMin: number; endMin: number; label: string }[] = [];
  for (let t = start; t < end; t += stepMin) {
    const s = t;
    const e = Math.min(t + stepMin, end);
    out.push({ startMin: s, endMin: e, label: `${fmt(s)}–${fmt(e)}` });
  }
  return out;
};

const isOnDuty = (shift: StudentShift, intervalStart: number, intervalEnd: number) => {
  const s = toMinutes(shift.start);
  const e = toMinutes(shift.end);
  return s <= intervalStart && intervalEnd <= e;
};

const todayISO = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`;
};

const isNowInInterval = (intervalStart: number, intervalEnd: number) => {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  return intervalStart <= nowMin && nowMin < intervalEnd;
};

async function fetchShifts(dateISO: string): Promise<FetchResult> {
  const demo: StudentShift[] = [
    {
      studentId: 's1',
      name: '최준서',
      role: '근로학생',
      location: '정보운영팀',
      start: '09:00',
      end: '17:30',
    },
    {
      studentId: 's2',
      name: '이다민',
      role: '근로학생',
      location: '정보운영팀',
      start: '13:00',
      end: '15:30',
    },
    {
      studentId: 's3',
      name: '나은정',
      role: '근로학생',
      location: '정보운영팀',
      start: '13:00',
      end: '17:30',
    },
    {
      studentId: 's4',
      name: '김민우',
      role: '근로학생',
      location: '정보운영팀',
      start: '09:30',
      end: '14:30',
    },
  ];
  const locs = Array.from(new Set(demo.map((d) => d.location!).filter(Boolean)));
  return new Promise((res) =>
    setTimeout(() => res({ date: dateISO, shifts: demo, locations: locs }), 150)
  );
}

const AdminCheckTime: React.FC = () => {
  const [date, setDate] = useState<string>(todayISO());
  const [loading, setLoading] = useState(false);
  const [raw, setRaw] = useState<FetchResult | null>(null);
  const navigate = useNavigate();

  // 필터 상태
  const [q, setQ] = useState('');
  const [location, setLocation] = useState<string>('ALL');
  const [showOnlyBusy, setShowOnlyBusy] = useState(false);

  // 30분 간격 구간(09:00–17:30)
  const intervals = useMemo(() => generateIntervals('09:00', '17:30', 30), []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchShifts(date);
        setRaw(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [date]);

  const filtered = useMemo(() => {
    const shifts = raw?.shifts ?? [];
    const nameQ = q.trim().toLowerCase();
    return shifts.filter((s) => {
      const passName = !nameQ || s.name.toLowerCase().includes(nameQ);
      const passLoc = location === 'ALL' || s.location === location;
      return passName && passLoc;
    });
  }, [raw, q, location]);

  const rows = useMemo(() => {
    return intervals
      .filter((intv) => {
        // 11:30(690분) ~ 13:00(780분) 사이 구간 제외
        return !(intv.startMin >= 690 && intv.endMin <= 780);
      })
      .map((intv) => {
        const people = filtered.filter((s) => isOnDuty(s, intv.startMin, intv.endMin));
        return { ...intv, people };
      })
      .filter((r) => (showOnlyBusy ? r.people.length > 0 : true));
  }, [intervals, filtered, showOnlyBusy]);

  const locations = useMemo(() => ['ALL', ...(raw?.locations ?? [])], [raw]);

  const scrollToNow = () => {
    if (date !== todayISO()) return;
    const el = document.querySelector('.krds-grid__row--now');
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

  const isToday = date === todayISO();

  return (
    <div className="krds-page krds-page--w400">
      {/* Page Title */}
      <header className="krds-header">
        <div className="krds-parent">
          <img src={left_chevron} alt="뒤로가기" onClick={() => navigate('/admin/home')} />
          <h1 className="krds-h1">시간대별 근무 현황</h1>
          <p className="krds-desc">09:00–17:30 사이 각 30분 구간에 근무 중인 학생을 확인합니다.</p>
        </div>

        <div className="krds-toolbar">
          <label className="krds-field">
            <span className="krds-label">날짜</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="krds-input"
              aria-label="조회 날짜"
            />
          </label>

          <label className="krds-field">
            <span className="krds-label">장소</span>
            <select
              className="krds-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="근무 장소 필터"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'ALL' ? '전체' : loc}
                </option>
              ))}
            </select>
          </label>

          <label className="krds-field krds-field--grow">
            <span className="krds-label">이름 검색</span>
            <input
              type="search"
              placeholder="학생 이름…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="krds-input"
            />
          </label>

          <label className="krds-toggle">
            <input
              type="checkbox"
              checked={showOnlyBusy}
              onChange={() => setShowOnlyBusy((v) => !v)}
            />
            <span>근무 중인 구간만</span>
          </label>

          <button
            className="krds-btn krds-btn--ghost"
            onClick={scrollToNow}
            type="button"
            disabled={!isToday}
            title={isToday ? '현재 시간 구간으로 이동' : '오늘 날짜에서만 동작'}
          >
            지금 시간으로
          </button>
        </div>
      </header>

      {/* Grid */}
      <section className="krds-card">
        <div className="krds-grid">
          <div className="krds-grid__head">
            <div className="krds-grid__th krds-grid__th--time">시간</div>
            <div className="krds-grid__th">근무자</div>
          </div>

          <div className="krds-grid__body" aria-live="polite">
            {loading && <div className="krds-empty">불러오는 중…</div>}

            {!loading && rows.length === 0 && (
              <div className="krds-empty">표시할 구간이 없습니다.</div>
            )}

            {!loading &&
              rows.map((r) => {
                const nowClass =
                  isToday && isNowInInterval(r.startMin, r.endMin) ? ' krds-grid__row--now' : '';
                return (
                  <div className={'krds-grid__row' + nowClass} key={r.label}>
                    <div className="krds-grid__cell krds-grid__cell--time">
                      <span aria-hidden="true" className="krds-time-badge">
                        {r.label}
                      </span>
                      <span className="sr-only">{r.label} 구간</span>
                    </div>
                    <div className="krds-grid__cell">
                      {r.people.length === 0 ? (
                        <span className="krds-tag krds-tag--muted">근무자 없음</span>
                      ) : (
                        <ul className="krds-chiplist">
                          {r.people.map((p) => (
                            <li
                              key={p.studentId}
                              className="krds-chip"
                              title={`${p.name} (${p.role ?? '역할 없음'}) • ${
                                p.location ?? '장소 미정'
                              }`}
                            >
                              <span className="krds-chip__name">{p.name}</span>
                              {p.role && <span className="krds-chip__meta">{p.role}</span>}
                              {p.location && (
                                <span className="krds-chip__meta">· {p.location}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* A11y only */}
      <span className="sr-only">KRDS 기반 30분 단위 근무 현황 테이블</span>
    </div>
  );
};

export default AdminCheckTime;
