"use client";

import { SidebarContext } from "@/contexts/sidebar-context";
import { SidebarContextType } from "@/types/sidebar";
import { useContext } from "react";

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
