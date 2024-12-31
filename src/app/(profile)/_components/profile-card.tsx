"use client";

import Image from "next/image";
import { useAuthStore } from "@/zustand/auth-store";
import NotAuthenticated from "@/components/ui/not-authenticated";
import DeleteButton from "./delete-button";
import UpdateButton from "./update-button";

export default function ProfileCard() {
  const { session } = useAuthStore();

  if (!session) return <NotAuthenticated />;

  const user = session.user;

  return (
    <section className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-16">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 flex flex-col items-center">
          <Image
            src="https://picsum.photos/150/150"
            alt="Profile"
            width={150}
            height={150}
            className="w-32 h-32 rounded-full mb-6 shadow-md"
          />
          <h2 className="text-2xl font-semibold mb-2">
            {user?.user_metadata?.display_name || "닉네임을 설정해주세요"}
          </h2>
          <p className="text-gray-500 mb-6">{user?.email}</p>
          <div className="w-full flex flex-col gap-3">
            <UpdateButton />
            <DeleteButton />
          </div>
        </div>
      </div>
    </section>
  );
}
