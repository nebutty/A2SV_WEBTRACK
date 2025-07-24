import { useState } from 'react';

interface Props {
  todo: {
    id: number;
    task: string;
    isEditing: boolean;
  };
  onDelete: (id: number) => void;
  onToggleEdit: (id: number) => void;
  onEdit: (id: number, newTask: string) => void;
}

function TodoItem({ todo, onDelete, onToggleEdit, onEdit }: Props) {
  const [editedTask, setEditedTask] = useState(todo.task);

  return (
    <li className="todo-item">
      {todo.isEditing ? (
        <>
          <input
            value={editedTask}
            onChange={e => setEditedTask(e.target.value)}
          />
          <button onClick={() => onEdit(todo.id, editedTask)}>Save</button>
        </>
      ) : (
        <>
          <span>{todo.task}</span>
          <button onClick={() => onToggleEdit(todo.id)}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
