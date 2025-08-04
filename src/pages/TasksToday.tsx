import { useState } from "react";
import { useNavigate } from "react-router-dom";
import left_chevron from "../assets/chevron/left_chevronImg.svg";
import "../styles/tasks-today.scss";

const initialTasks = [
  { id: 1, text: "바닥쓸기", checked: false },
  { id: 2, text: "대걸레질", checked: false },
  { id: 3, text: "쓰레기통 비우기", checked: false },
];

const TasksToday = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);

  const toggleCheck = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  return (
    <div className="tasks-container">
      <div className="back-button" onClick={() => navigate("/home")}>
        <img src={left_chevron} alt="뒤로가기" />
      </div>

      <h2 className="tasks-title">오늘 할 일</h2>

      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <label>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleCheck(task.id)}
              />
              <span className="task-text">{task.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksToday;
