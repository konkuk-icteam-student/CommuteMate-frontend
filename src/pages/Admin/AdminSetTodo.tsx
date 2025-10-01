import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import left_chevron from '../../assets/chevron/left_chevronImg.svg';

type Task = {
  id: number;
  text: string;
  checked: boolean;
  type: 'regular' | 'irregular';
  time?: 'am' | 'pm'; // 정기 업무 전용
};

const initialTasks: Task[] = [
  {
    id: 1,
    text: '신문지 가져오기',
    checked: false,
    type: 'regular',
    time: 'am',
  },
  { id: 2, text: '커피머신 청소', checked: false, type: 'regular', time: 'am' },
  { id: 3, text: '싱크대 청소', checked: false, type: 'regular', time: 'am' },
  { id: 4, text: '회의실 청소', checked: false, type: 'regular', time: 'am' },
  {
    id: 5,
    text: '정보운영팀 문 열고 청소하기',
    checked: false,
    type: 'regular',
    time: 'pm',
  },
  { id: 6, text: '바닥 쓸기', checked: false, type: 'regular', time: 'pm' },
  {
    id: 7,
    text: '바닥 밀대로 닦기',
    checked: false,
    type: 'regular',
    time: 'pm',
  },
  {
    id: 8,
    text: '쓰레기통 비우기',
    checked: false,
    type: 'regular',
    time: 'pm',
  },
  {
    id: 9,
    text: '물티슈로 먼지 쌓이는 곳 닦기',
    checked: false,
    type: 'regular',
    time: 'pm',
  },
  { id: 10, text: '기록물 정리', checked: false, type: 'irregular' },
];

const AdminSetTodo = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newRegularTaskText, setNewRegularTaskText] = useState('');
  const [newIrregularTaskText, setNewIrregularTaskText] = useState('');
  const [newRegularTaskTime, setNewRegularTaskTime] = useState<Task['time']>('am');

  const renderRegularTasksGrouped = () => {
    const amTasks = tasks.filter((t) => t.type === 'regular' && t.time === 'am');
    const pmTasks = tasks.filter((t) => t.type === 'regular' && t.time === 'pm');

    return (
      <>
        <h3 className="text-lg font-semibold text-[#212529] mt-6 mb-3">정기 업무</h3>

        {amTasks.length > 0 && (
          <>
            <h4 className="text-[15px] font-medium text-[#495057] mt-4 mb-2">오전</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              {amTasks.map((task) => renderTaskItem(task))}
            </ul>
          </>
        )}

        {pmTasks.length > 0 && (
          <>
            <h4 className="text-[15px] font-medium text-[#495057] mt-4 mb-2">오후</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              {pmTasks.map((task) => renderTaskItem(task))}
            </ul>
          </>
        )}
      </>
    );
  };

  const toggleCheck = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task))
    );
  };
  //정기 업무 추가
  const addRegularTask = () => {
    if (!newRegularTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: newRegularTaskText.trim(),
      checked: false,
      type: 'regular',
      time: newRegularTaskTime,
    };
    setTasks((prev) => [...prev, newTask]);
    setNewRegularTaskText('');
    setNewRegularTaskTime('am');
  };
  //비정기 업무 추가
  const addIrregularTask = () => {
    if (!newIrregularTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: newIrregularTaskText.trim(),
      checked: false,
      type: 'irregular',
    };
    setTasks((prev) => [...prev, newTask]);
    setNewIrregularTaskText('');
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTodayInfo = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const day = dayNames[today.getDay()];

    return `${year}.${String(month).padStart(2, '0')}.${String(date).padStart(2, '0')} (${day})`;
  };

  const renderTasks = (title: string, filtered: Task[], deletable = true) => (
    <>
      <h3 className="text-lg font-semibold text-[#212529] mt-6 mb-3">{title}</h3>
      <ul className="list-none p-0 m-0 flex flex-col gap-4">
        {filtered.map((task) => (
          <li key={task.id}>
            <label className="flex items-center gap-3 text-base cursor-pointer">
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleCheck(task.id)}
                className="w-5 h-5 accent-[#4d7cfe] cursor-pointer"
              />
              <span
                className={`text-[#495057] transition-[color,text-decoration] duration-200 ${task.checked ? 'text-[#adb5bd] line-through' : ''}`}
              >
                {task.text}
              </span>
              {deletable && (
                <button
                  className="ml-auto bg-transparent border-0 text-base cursor-pointer text-[#d32f2f] hover:opacity-80"
                  onClick={() => deleteTask(task.id)}
                >
                  ❌
                </button>
              )}
            </label>
          </li>
        ))}
      </ul>
    </>
  );

  const renderTaskItem = (task: Task, deletable = true) => (
    <li key={task.id}>
      <label className="flex items-center gap-3 text-base cursor-pointer">
        <input
          type="checkbox"
          checked={task.checked}
          onChange={() => toggleCheck(task.id)}
          className="w-5 h-5 accent-[#4d7cfe] cursor-pointer"
        />
        <span
          className={`text-[#495057] transition-[color,text-decoration] duration-200 ${task.checked ? 'text-[#adb5bd] line-through' : ''}`}
        >
          {task.text}
        </span>
        {deletable && (
          <button
            className="ml-auto bg-transparent border-0 text-base cursor-pointer text-[#d32f2f] hover:opacity-80"
            onClick={() => deleteTask(task.id)}
          >
            ❌
          </button>
        )}
      </label>
    </li>
  );

  return (
    <div className="min-h-[calc(var(--vh,1vh)*100)] w-screen bg-[#f8f9fa] flex justify-center items-center font-['Pretendard_GOV',sans-serif]">
      <div className="bg-white py-10 px-[30px] rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.05)] w-full max-w-[400px] relative">
        <div className="flex items-center gap-2 mb-6 text-[#212121]">
          <button
            className="bg-transparent border-0 p-0 cursor-pointer"
            onClick={() => navigate('/admin/home')}
          >
            <img src={left_chevron} alt="뒤로가기" className="w-6 h-6" />
          </button>
          <h2 className="text-[25px] font-semibold text-[#212121]">
            오늘 할 일{' '}
            <span className="text-base font-normal text-[#868e96] ml-2"> {getTodayInfo()}</span>
          </h2>
        </div>

        {renderRegularTasksGrouped()}
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="정기 업무 추가"
            value={newRegularTaskText}
            onChange={(e) => setNewRegularTaskText(e.target.value)}
            className="flex-1 py-2 px-3 text-sm border border-[#dee2e6] rounded-lg outline-none focus:border-[#4d7cfe] focus:shadow-[0_0_0_2px_rgba(77,124,254,0.2)]"
          />
          <select
            aria-label="오전/오후 선택"
            value={newRegularTaskTime}
            onChange={(e) => setNewRegularTaskTime(e.target.value as Task['time'])}
            className="py-2 px-2.5 border border-[#dee2e6] rounded-lg"
          >
            <option value="am" className="rounded-lg">
              오전
            </option>
            <option value="pm" className="rounded-lg">
              오후
            </option>
          </select>
          <button
            onClick={addRegularTask}
            className="py-2 px-3.5 rounded-lg bg-[#4d7cfe] text-white border-0 font-semibold cursor-pointer hover:bg-[#375de4]"
          >
            추가
          </button>
        </div>

        {renderTasks(
          '비정기 업무',
          tasks.filter((t) => t.type === 'irregular'),
          true
        )}

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="비정기 업무 추가"
            value={newIrregularTaskText}
            onChange={(e) => setNewIrregularTaskText(e.target.value)}
            className="flex-1 py-2 px-3 text-sm border border-[#dee2e6] rounded-lg outline-none focus:border-[#4d7cfe] focus:shadow-[0_0_0_2px_rgba(77,124,254,0.2)]"
          />
          <button
            onClick={addIrregularTask}
            className="bg-[#4d7cfe] text-white py-2 px-4 border-0 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#375de4]"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSetTodo;
