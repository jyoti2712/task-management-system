import { completeTask, deleteTask } from '../api.jsx';

const TaskItem = ({ task, fetchTasks, token }) => {
  const handleComplete = async () => {
    try {
      await completeTask(task._id, token);
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id, token);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <li className="flex justify-between items-center p-2 bg-white shadow-md rounded mb-2">
      <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
      <div>
        {!task.completed && (
          <button
            onClick={handleComplete}
            className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
          >
            Complete
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-1 px-3 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
