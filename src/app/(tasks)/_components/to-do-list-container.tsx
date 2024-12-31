"use client";

import { useToDo } from "@/hooks/use-to-do";
import ToDoItem from "./to-do-item";

export default function ToDoListContainer() {
  const { state } = useToDo();
  const todos = state.todos;
  return (
    <ul className="w-full bg-white shadow-md rounded-md divide-y divide-gray-200">
      {todos.map((todo, index) => (
        <ToDoItem
          key={index}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
}
