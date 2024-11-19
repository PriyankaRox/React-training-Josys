import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "./todo.css";

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

const TodoList: React.FC<TodoItemProps> = ({
  task,
  deleteTask,
  toggleCompleted,
}) => {
  return (
    <div className="todo">
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={() => toggleCompleted(task.id)}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Doc appointment", completed: false },
    { id: 2, text: "Meeting with client", completed: false },
  ]);
  const [text, setText] = useState<string>("");

  const addTask = (text: string): void => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setText("");
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <div className="todo">
      <h2>Todo List</h2>

      <label>Enter todo list here:</label>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={() => addTask(text)}>Add</button>
      <div className="todo-list">
        {tasks.map((task) => (
          <TodoList
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </div>
    </div>
  );
};
export default Todo;
