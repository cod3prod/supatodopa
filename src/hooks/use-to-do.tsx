"use client";

import { ToDoContext } from "@/contexts/to-do-context";
import { useContext } from "react";

export function useToDo() {
    const context = useContext(ToDoContext);
    if(!context) throw new Error('useToDo must be used within a ToDoProvider');

    return context;
}