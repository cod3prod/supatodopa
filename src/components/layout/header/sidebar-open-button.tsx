"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { FiMenu } from "react-icons/fi";

export default function SidebarOpenButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      className="block md:hidden text-2xl"
      onClick={toggleSidebar}
      aria-label="Toggle Sidebar"
    >
      <FiMenu />
    </button>
  );
}
