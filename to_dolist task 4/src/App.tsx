import { useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

interface Todo {
  id: number;
  task: string;
  isEditing: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (!task.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      task,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleEdit = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTodo = (id: number, newTask: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, task: newTask, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggleEdit={toggleEdit}
            onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
