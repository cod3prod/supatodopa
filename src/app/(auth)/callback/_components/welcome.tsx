"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/zustand/auth-store";
import { supabase } from "@/libs/supabase-client";
import Image from "next/image";
import Link from "next/link";
import NotAuthenticated from "@/components/ui/not-authenticated";
import DisplayNameForm from "./display-name-form";

export default function Welcome() {
  const { session } = useAuthStore();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempDisplayName, setTempDisplayName] = useState<string>("");

  useEffect(() => {
    if (session) {
      setIsModalOpen(true);
    }
  }, [session])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempDisplayName(e.target.value);
  };

  const handleSaveName = async () => {
    try {
      if (tempDisplayName) {
        const { error } = await supabase.auth.updateUser({
          data: { display_name: tempDisplayName },
        });
        if (error) {
          console.error("Error updating user:", error.message);
          setDisplayName("");
          return;
        }
        setDisplayName(tempDisplayName);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  if (!session) {
    return <NotAuthenticated />;
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center bg-background text-foreground px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-6">
        <div className="flex flex-col items-center">
          <Image
            src="https://picsum.photos/150/150?portrait"
            alt="Profile"
            width={150}
            height={150}
            className="rounded-full mb-4 shadow-lg"
          />
          <h2 className="text-2xl font-semibold">
            {displayName || "사용자 이름"}
          </h2>
          <p className="text-lg text-gray-600">
            {session.user?.email || "이메일 없음"}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-xl mb-4">
            {displayName ? `${displayName}님, 환영합니다!` : "환영합니다!"}
          </p>
          <Link href="/tasks">
            <button className="w-full bg-primary text-white py-2 rounded-md shadow-md hover:bg-primary/90">
              작업 페이지로 이동
            </button>
          </Link>
        </div>
      </div>

      {isModalOpen && !session.user.user_metadata.display_name && (
        <DisplayNameForm
          tempDisplayName={tempDisplayName}
          handleNameChange={handleNameChange}
          handleSaveName={handleSaveName}
        />
      )}
    </section>
  );
}
