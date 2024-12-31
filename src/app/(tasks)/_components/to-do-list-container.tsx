"use client";

import { useEffect } from "react";
import { useToDo } from "@/hooks/use-to-do";
import ToDoItem from "./to-do-item";
import { supabase } from "@/libs/supabase-client";
import { ToDo } from "@/types/to-do";

export default function ToDoListContainer() {
  const { state, dispatch } = useToDo();
  const todos = state.todos;

  useEffect(() => {
    const getTodos = async () => {
      const { data, error } = await supabase.from("todos").select("*");
      if (error) {
        console.error("Error fetching todos:", error);
        return;
      }
      if (data) {
        const todos: ToDo[] = data;
        dispatch({ type: "SET_TODOS", payload: { todos } });
      }
    };

    getTodos();
  }, [dispatch]);

  return (
    <ul className="w-full bg-white shadow-md rounded-md divide-y divide-gray-200">
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
}
