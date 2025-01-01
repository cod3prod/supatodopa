"use client";

import { supabase } from "@/libs/supabase-client";
import { useAuthStore } from "@/zustand/auth-store";
import Link from "next/link";

export default function PCMenu() {
  const { session, setSession } = useAuthStore();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <nav className="hidden md:flex items-center space-x-4">
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
  );
}
