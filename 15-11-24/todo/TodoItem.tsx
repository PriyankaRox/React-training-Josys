import React from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  deleteTask,
  toggleCompleted,
}) => {
  const handleChange = () => {
    toggleCompleted(task.id);
  };

  return (
    <div className="todo">
      <input type="checkbox" checked={task.completed} onChange={handleChange} />
      <p>{task.text}</p>
      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
};
export default TodoItem;
