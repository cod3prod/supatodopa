"use client";

import Link from "next/link";

export default function NotAuthenticated() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-3xl font-semibold mb-4">로그인이 필요합니다.</h1>
      <button className="bg-primary text-white px-6 py-3 rounded-md shadow-md hover:bg-primary/90">
        <Link href="/auth">로그인 페이지로 이동</Link>
      </button>
    </section>
  );
}
