"use client";

import { supabase } from "@/libs/supabase-client";
import { useAuthStore } from "@/zustand/auth-store";

import Link from "next/link";

export default function Header() {
  const { session, setSession } = useAuthStore();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-lg font-bold">
          <Link href="/">ToDoList</Link>
        </h1>
        <nav className="flex items-center space-x-4">
          <Link href="/profile" className="hover:underline">
            프로필
          </Link>
          <Link href="/tasks" className="hover:underline">
            할 일 목록
          </Link>
          {session ? (
            <button
              onClick={handleLogout}
              className="flex justify-center bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/auth"
              className="flex justify-center bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
