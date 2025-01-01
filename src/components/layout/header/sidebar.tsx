"use client";

import { supabase } from "@/libs/supabase-client";
import { useAuthStore } from "@/zustand/auth-store";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import SidebarBackdrop from "./sidebar-backdrop";
import { useSidebar } from "@/hooks/use-sidebar";
import { twMerge } from "tailwind-merge";

export default function Sidebar() {
  const { session, setSession } = useAuthStore();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    toggleSidebar();
  };

  return (
    <>
      <div
        className={twMerge(
          "z-10 fixed top-0 right-0 h-full w-64 bg-primary text-white transform",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
          "transition-transform duration-300 ease-in-out shadow-lg"
        )}
      >
        <div className="z-50 p-4 flex justify-between items-center border-b border-white/10">
          <h2 className="text-lg font-bold">메뉴</h2>
          <button
            onClick={toggleSidebar}
            className="text-2xl"
            aria-label="Close Sidebar"
          >
            <IoClose />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            href="/profile"
            className="hover:underline"
            onClick={toggleSidebar}
          >
            프로필
          </Link>
          <Link
            href="/tasks"
            className="hover:underline"
            onClick={toggleSidebar}
          >
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
              onClick={toggleSidebar}
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
      <SidebarBackdrop />
    </>
  );
}
