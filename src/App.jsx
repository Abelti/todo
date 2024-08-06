import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, updateTask, markAsCompleted } from './store';

const App = () => {
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  const tasks = useSelector(state => state.tasks);
  const completedTasks = useSelector(state => state.completedTasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ id: Date.now(), text: newTask, dueDate, accomplished: false }));
      setNewTask('');
      setDueDate('');
    }
  };

  const handleDeleteTask = id => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = task => {
    setEditTask(task);
    setEditText(task.text);
    setEditDueDate(task.dueDate);
  };

  const handleUpdateTask = () => {
    dispatch(updateTask({ id: editTask.id, updates: { text: editText, dueDate: editDueDate } }));
    setEditTask(null);
    setEditText('');
    setEditDueDate('');
  };

  const handleMarkAsCompleted = task => {
    dispatch(markAsCompleted(task.id));
    dispatch(markAsCompleted(task));
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {editTask && (
        <div className="edit-task">
          <input
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
          <input
            type="date"
            value={editDueDate}
            onChange={e => setEditDueDate(e.target.value)}
          />
          <button onClick={handleUpdateTask}>Update Task</button>
          <button onClick={() => setEditTask(null)}>Cancel</button>
        </div>
      )}

      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.text} - Due: {task.dueDate}</span>
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={() => handleMarkAsCompleted(task)}>Done</button>
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map(task => (
          <li key={task.id}>
            <span>{task.text} - Completed on: {task.dueDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
