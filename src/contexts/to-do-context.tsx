"use client";

import { createContext, useReducer } from "react";
import { todoReducer, initialState } from "@/reducers/to-do-reducer";
import { ToDoAction, ToDoState } from "@/types/to-do";

export const ToDoContext = createContext<
  | {
      state: ToDoState;
      dispatch: React.Dispatch<ToDoAction>;
    }
  | undefined
>(undefined);

export const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <ToDoContext.Provider value={{ state, dispatch }}>
      {children}
    </ToDoContext.Provider>
  );
};
