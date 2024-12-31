"use client";

import { useState } from "react";
import { supabaseService } from "@/libs/supabase-client";
import { supabase } from "@/libs/supabase-client";
import { useAuthStore } from "@/zustand/auth-store";

export default function UpdateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { session } = useAuthStore();

  const handleUpdate = async () => {
    if (!session) {
      console.error("User session is missing.");
      return;
    }

    const { error } = await supabaseService.auth.admin.updateUserById(
      session.user.id,
      {
        password: password || undefined,
        user_metadata: {
          display_name: displayName || undefined,
        },
      }
    );

    if (error) {
      console.error("Failed to update user:", error.message);
      setIsModalOpen(false);
      return;
    }

    await supabase.auth.refreshSession();
    console.log("User updated successfully.");
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-primary text-white py-3 rounded-md shadow-md hover:bg-primary/90 w-full"
      >
        프로필 수정
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">프로필 수정</h2>
            <input
              type="text"
              placeholder="display name"
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md"
              >
                확인
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 hover:bg-red-500/90 text-white px-6 py-2 rounded-md ml-2"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
