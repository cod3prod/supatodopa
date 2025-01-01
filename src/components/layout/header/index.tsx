"use client";

import Link from "next/link";
import PCMenu from "./pc-menu";
import { SidebarProvider } from "@/contexts/sidebar-context";
import Sidebar from "./sidebar";
import SidebarOpenButton from "./sidebar-open-button";

export default function Header() {
  return (
    <SidebarProvider>
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-lg font-bold">
            <Link href="/">ToDoList</Link>
          </h1>
          <PCMenu />
          <SidebarOpenButton />
        </div>
        <Sidebar />
      </header>
    </SidebarProvider>
  );
}
