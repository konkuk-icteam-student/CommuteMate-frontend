import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import left_chevron from '../assets/chevron/left_chevronImg.svg';
import '../styles/tasks-today.scss';

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
  { id: 5, text: '바닥 쓸기', checked: false, type: 'regular', time: 'pm' },
  { id: 6, text: '바닥 닦기', checked: false, type: 'regular', time: 'pm' },
  {
    id: 7,
    text: '쓰레기통 비우기',
    checked: false,
    type: 'regular',
    time: 'pm',
  },
  {
    id: 8,
    text: '물티슈로 먼지 쌓이는 곳 닦기',
    checked: false,
    type: 'regular',
    time: 'pm',
  },
  { id: 9, text: '기록물 정리', checked: false, type: 'irregular' },
];

const TasksToday = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');

  const renderRegularTasksGrouped = () => {
    const amTasks = tasks.filter((t) => t.type === 'regular' && t.time === 'am');
    const pmTasks = tasks.filter((t) => t.type === 'regular' && t.time === 'pm');

    return (
      <>
        <h3 className="task-section-title">정기 업무</h3>

        {amTasks.length > 0 && (
          <>
            <h4 className="task-subtitle">오전</h4>
            <ul className="tasks-list">{amTasks.map((task) => renderTaskItem(task))}</ul>
          </>
        )}

        {pmTasks.length > 0 && (
          <>
            <h4 className="task-subtitle">오후</h4>
            <ul className="tasks-list">{pmTasks.map((task) => renderTaskItem(task))}</ul>
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

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      checked: false,
      type: 'irregular',
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskText('');
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

  const renderTasks = (title: string, filtered: Task[], deletable = false) => (
    <>
      <h3 className="task-section-title">{title}</h3>
      <ul className="tasks-list">
        {filtered.map((task) => (
          <li key={task.id} className="task-item">
            <label className="task-label">
              <input type="checkbox" checked={task.checked} onChange={() => toggleCheck(task.id)} />
              <span className={`task-text ${task.checked ? 'checked' : ''}`}>{task.text}</span>
              {deletable && (
                <button className="delete-button" onClick={() => deleteTask(task.id)}>
                  ❌
                </button>
              )}
            </label>
          </li>
        ))}
      </ul>
    </>
  );

  const renderTaskItem = (task: Task, deletable = false) => (
    <li key={task.id} className="task-item">
      <label className="task-label">
        <input type="checkbox" checked={task.checked} onChange={() => toggleCheck(task.id)} />
        <span className={`task-text ${task.checked ? 'checked' : ''}`}>{task.text}</span>
        {deletable && (
          <button className="delete-button" onClick={() => deleteTask(task.id)}>
            ❌
          </button>
        )}
      </label>
    </li>
  );

  return (
    <div className="tasks-container">
      <div className="tasks-box">
        <div className="header">
          <div className="back-button" onClick={() => navigate('/home')}>
            <img src={left_chevron} alt="뒤로가기" />
          </div>
          <h2>
            오늘 할 일 <span className="today-date"> {getTodayInfo()}</span>
          </h2>
        </div>

        {renderRegularTasksGrouped()}

        {renderTasks(
          '비정기 업무',
          tasks.filter((t) => t.type === 'irregular'),
          true
        )}

        <div className="task-add-form">
          <input
            type="text"
            placeholder="비정기 업무 추가"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button onClick={addTask}>추가</button>
        </div>
      </div>
    </div>
  );
};

export default TasksToday;
