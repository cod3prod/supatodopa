"use client";

import { useToDo } from "@/hooks/use-to-do";
import { FormEvent, useState } from "react";
import { useAuthStore } from "@/zustand/auth-store";
import { supabase } from "@/libs/supabase-client";
import { ToDo } from "@/types/to-do";

export default function ToDoInput() {
  const { dispatch } = useToDo();
  const [todo, setTodo] = useState("");
  const { session } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo || !session) return;

    const { data: result, error } = await supabase
      .from("todos")
      .insert({
        text: todo.trim(),
        user_id: session.user.id,
        completed: false,
      })
      .select();

    if (error) {
      console.error("Error creating todo:", error.message);
      return;
    }

     const newTodo: ToDo = result[0];
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: newTodo.id,
        text: newTodo.text,
        completed: newTodo.completed,
      },
    });
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button className="bg-primary text-white px-4 py-3 rounded-r-md hover:bg-primary/90">
        추가
      </button>
    </form>
  );
}
