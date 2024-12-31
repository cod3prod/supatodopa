"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabase-client";
import Image from "next/image";
import googleIcon from "@/assets/google.svg";
import { useAuthStore } from "@/zustand/auth-store";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState<"signin" | "signup" | "reset">(
    "signin"
  );
  const [message, setMessage] = useState("");
  const { session } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    router.push("/tasks");
  }, [session])

  const handleAuth = async () => {
    let result;
    setMessage("");

    try {
      if (formType === "signin") {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else if (formType === "signup") {
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: "http://localhost:3000/callback",
          },
        });
      } else if (formType === "reset") {
        result = await supabase.auth.resetPasswordForEmail(email);
      }

      if (result?.error) {
        setMessage(result.error.message);
      } else {
        setMessage(
          formType === "reset" ? "Password reset email sent!" : "Success!"
        );
        if(formType === "signin"){
          router.push("/tasks");
        }
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) setMessage(error.message);
    } catch (error) {
      setMessage("Google sign-in failed.");
    }
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center  bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
          {formType === "signin"
            ? "로그인"
            : formType === "signup"
            ? "회원가입"
            : "비밀번호 재설정"}
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="이메일"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formType !== "reset" && (
            <input
              type="password"
              placeholder="비밀번호"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <button
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
            onClick={handleAuth}
          >
            {formType === "signin"
              ? "로그인하기"
              : formType === "signup"
              ? "회원가입하기"
              : "비밀번호 재설정 링크 보내기"}
          </button>
          <button
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
            onClick={handleGoogleSignIn}
          >
            <Image
              src={googleIcon}
              alt="Google Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            Google로 계속하기
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          {formType === "signin" && (
            <p>
              계정이 없으신가요?{" "}
              <button
                className="text-primary underline"
                onClick={() => setFormType("signup")}
              >
                회원가입
              </button>
            </p>
          )}
          {formType === "signup" && (
            <p>
              이미 계정이 있으신가요?{" "}
              <button
                className="text-primary underline"
                onClick={() => setFormType("signin")}
              >
                로그인
              </button>
            </p>
          )}
          {formType !== "reset" && (
            <button
              className="text-primary underline mt-2"
              onClick={() => setFormType("reset")}
            >
              비밀번호를 잊으셨나요?
            </button>
          )}
          {formType === "reset" && (
            <p>
              다시{" "}
              <button
                className="text-primary underline mt-2"
                onClick={() => setFormType("signin")}
              >
                로그인
              </button>
              하실 건가요?
            </p>
          )}
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </section>
  );
}
