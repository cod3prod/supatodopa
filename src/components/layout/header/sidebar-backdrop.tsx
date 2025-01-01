"use client";

import { useSidebar } from "@/hooks/use-sidebar";

export default function SidebarBackdrop() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  if (!isSidebarOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50"
      onClick={toggleSidebar}
      aria-hidden="true"
    />
  );
}
