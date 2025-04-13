import { useState, useEffect } from 'react';
import { getTasks, createTask, completeTask, deleteTask } from '../api.jsx';
import { useNavigate } from 'react-router-dom';
import TaskItem from './TaskItem';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title: newTask, completed: false }, token);
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Task Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-1 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleAddTask} className="mb-4">
        <input
          type="text"
          className="p-2 border rounded w-80"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="ml-2 bg-green-500 text-white py-2 px-4 rounded">
          Add Task
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            fetchTasks={fetchTasks}
            token={token}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
