import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin/changeApprove.scss';
import left_chevron from '../../assets/chevron/left_chevronImg.svg';

/* ===== Types ===== */
type ApplyStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

type ApplyItem = {
  id: string;
  studentId: string;
  name: string;
  date: string; // "YYYY-MM-DD"
  slots: string[]; // ["09:00–09:30", "10:00–10:30"] 등 30분 단위
  note?: string;
  submittedAt: string; // ISO
  status: ApplyStatus;
};

type FetchResult = {
  month: string; // "YYYY-MM"
  items: ApplyItem[];
};

/* ===== Helpers ===== */
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const validWindowStart = toMinutes('09:00');
const validWindowEnd = toMinutes('17:30'); // end inclusive for slots like 11:00–11:30

const isSlotWithinMorning = (slot: string) => {
  // "HH:MM–HH:MM"
  const [a, b] = slot.split('–');
  const s = toMinutes(a);
  const e = toMinutes(b);
  return s >= validWindowStart && e <= validWindowEnd && e - s === 30;
};

const allSlotsValid = (slots: string[]) => slots.length > 0 && slots.every(isSlotWithinMorning);

/* ===== Mock APIs (교체 지점) ===== */
async function fetchMonthlyApplies(monthISO: string): Promise<FetchResult> {
  // GET /api/applies?month=YYYY-MM
  const demo: ApplyItem[] = [
    {
      id: 'a1',
      studentId: 's1',
      name: '최준서',
      date: `${monthISO}-03`,
      slots: ['09:00–09:30', '10:30–11:00'],
      note: '수업 12시',
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
    },
    {
      id: 'a2',
      studentId: 's2',
      name: '이다민',
      date: `${monthISO}-03`,
      slots: ['11:00–11:30'],
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
    },
    {
      id: 'a3',
      studentId: 's3',
      name: '나은정',
      date: `${monthISO}-10`,
      slots: ['09:30–10:00', '10:00–10:30'],
      submittedAt: new Date().toISOString(),
      status: 'APPROVED',
    },
    {
      id: 'a4',
      studentId: 's4',
      name: '김민우',
      date: `${monthISO}-10`,
      slots: ['12:00–12:30'],
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
    }, // 유효범위 밖 → 경고
  ];
  return new Promise((res) => setTimeout(() => res({ month: monthISO, items: demo }), 150));
}

/* ===== Component ===== */
const AdminChangeApprove: React.FC = () => {
  const nav = useNavigate();
  const [month, setMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`; // "YYYY-MM"
  });
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ApplyItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<'ALL' | ApplyStatus>('ALL');
  const [q, setQ] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchMonthlyApplies(month);
        setItems(data.items);
      } finally {
        setLoading(false);
      }
    })();
  }, [month]);

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return items
      .filter((it) => statusFilter === 'ALL' || it.status === statusFilter)
      .filter((it) => !ql || it.name.toLowerCase().includes(ql))
      .sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name));
  }, [items, statusFilter, q]);

  // 날짜별 그룹
  const grouped = useMemo(() => {
    const m = new Map<string, ApplyItem[]>();
    list.forEach((it) => {
      if (!m.has(it.date)) m.set(it.date, []);
      m.get(it.date)!.push(it);
    });
    return Array.from(m.entries()).sort(([d1], [d2]) => d1.localeCompare(d2));
  }, [list]);

  return (
    <div className="krds-page krds-page--w400">
      <header className="krds-header">
        <div className="krds-parent">
          <img src={left_chevron} alt="뒤로가기" className="krds-iconbtn" onClick={() => nav(-1)} />
          <h1 className="krds-h1">근무 수정 승인</h1>
          <p className="krds-desc">월 단위 신청(09:00–17:30) 검토 후 승인/반려</p>
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

          <label className="krds-field">
            <span className="krds-label">상태</span>
            <select
              className="krds-select"
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatusFilter(e.target.value as 'ALL' | ApplyStatus)
              }
            >
              <option value="ALL">전체</option>
              <option value="PENDING">대기</option>
              <option value="APPROVED">승인</option>
              <option value="REJECTED">반려</option>
            </select>
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
        {!loading && grouped.length === 0 && (
          <div className="krds-empty">신청 내역이 없습니다.</div>
        )}

        {!loading &&
          grouped.map(([date, rows]) => (
            <div key={date} className="day-group">
              <div className="day-heading">{date}</div>

              {rows.map((it) => {
                const valid = allSlotsValid(it.slots);
                const pending = it.status === 'PENDING';
                return (
                  <article
                    key={it.id}
                    className={'apply-card' + (valid ? '' : ' apply-card--warn')}
                  >
                    <div className="apply-head">
                      <div className="apply-name">{it.name}</div>
                      <span className={`status status--${it.status.toLowerCase()}`}>
                        {it.status === 'PENDING'
                          ? '대기'
                          : it.status === 'APPROVED'
                            ? '승인'
                            : '반려'}
                      </span>
                    </div>

                    <div className="apply-slots">
                      {it.slots.map((s) => (
                        <span
                          key={s}
                          className={'slot' + (isSlotWithinMorning(s) ? '' : ' slot--error')}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {it.note && <div className="apply-note">수정사유: {it.note}</div>}
                    {!valid && (
                      <div className="apply-warn">
                        허용 시간(09:00–17:30) 밖 슬롯이 포함되어 있습니다.
                      </div>
                    )}

                    <div className="apply-actions">
                      <button
                        className="krds-btn"
                        disabled={!pending || !valid}
                        title={!valid ? '허용 범위 밖 신청은 승인할 수 없습니다.' : ''}
                      >
                        승인
                      </button>
                      <button className="krds-btn krds-btn--ghost" disabled={!pending}>
                        반려
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
      </section>
    </div>
  );
};

export default AdminChangeApprove;
