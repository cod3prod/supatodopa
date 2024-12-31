import { useToDo } from "@/hooks/use-to-do";
import React from "react";
import { FiCheck } from "react-icons/fi";
import { supabase } from "@/libs/supabase-client";
import { useAuthStore } from "@/zustand/auth-store";

type ToDoItemProps = {
  id: string;
  text: string;
  completed: boolean;
};

const ToDoItem = React.memo(({ id, text, completed }: ToDoItemProps) => {
  const { dispatch } = useToDo();
  const { session } = useAuthStore();

  const onToggle = async (id: string) => {
    if (!session) return null;
    const { error } = await supabase
      .from("todos")
      .update({ completed: !completed })
      .eq("id", id)
      .select();
    if (error) return console.error(error);
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  };
  const onDelete = async (id: string) => {
    if (!session) return null;
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .select();
    if (error) return console.error(error);
    dispatch({ type: "REMOVE_TODO", payload: { id } });
  };

  console.log("text", text, "id", id);
  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-2">
        {completed ? (
          <FiCheck className="text-green-500" onClick={() => onToggle(id)} />
        ) : (
          <div
            className="w-5 h-5 border border-gray-500 rounded-full"
            onClick={() => onToggle(id)}
          />
        )}
        <span className={`text-gray-700 ${completed ? "line-through" : ""}`}>
          {text}
        </span>
      </div>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => onDelete(id)}
      >
        삭제
      </button>
    </li>
  );
});

ToDoItem.displayName = "ToDoItem";

export default ToDoItem;
