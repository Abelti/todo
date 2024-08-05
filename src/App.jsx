import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, updateTask, markAsCompleted } from './actions'

function App() {

  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editText, setEditText] = useState('');

  const tasks = useSelector(state => state.tasks);
  const completedTasks = useSelector(state => state.completedTasks);
  const dispatch = useDispatch();

  const handleTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ id: Date.now(), text: newTask, dueDate, accomplished: false }));
      setNewTask('');
      setDueDate('');
    }
  }

  const handleDeleteTask = id => {
    dispatchEvent(deleteTask(id));
  }

  const handleEditTask = task => {
    setEditTask(task);
    setEditText(task.text);
    setDueDate(task.dueDate);
  }

  return (
    <div>
      <h1> TO DO Lists</h1>
      <div>
        <input type="text" placeholder="New Task" value={newTask} onChange={(e) => setNewTsk(e.target.value)} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

        <button onClick={handleTask}>Add Task</button>
      </div>
    </div>
  )
}

export default App