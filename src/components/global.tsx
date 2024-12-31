"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/zustand/auth-store";
import { supabase } from "@/libs/supabase-client";

export default function Global() {
  const { setSession } = useAuthStore();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  
    return () => subscription.unsubscribe(); 
  }, [setSession]);
  return null;
}