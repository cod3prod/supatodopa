"use client";

import { ToDoProvider } from "@/contexts/to-do-context";
import ToDoInput from "./to-do-input";
import ToDoListContainer from "./to-do-list-container";
import { useEffect } from "react";
import { useAuthStore } from "@/zustand/auth-store";
import NotAuthenticated from "@/components/ui/not-authenticated";

export default function ToDoListApp() {
  const { session } = useAuthStore();
  useEffect(() => {
    if(!session) return;

  }, [session]);

  if(!session) return <NotAuthenticated />;
  
  return (
    <ToDoProvider>
      <section className="flex-1 flex flex-col items-center w-full max-w-lg mx-auto py-10 space-y-6">
        <h2 className="text-2xl font-bold text-primary">오늘 할 일</h2>
        <ToDoInput />
        <ToDoListContainer />
      </section>
    </ToDoProvider>
  );
}
