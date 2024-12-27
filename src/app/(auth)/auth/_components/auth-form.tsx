"use client";

// src/app/(auth)/auth-form/page.tsx
import { useState } from "react";
import { supabase } from "@/libs/supabase-client";
import Image from "next/image";
import googleIcon from "@/assets/google.svg";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    let result;
    setMessage("");

    try {
      if (formType === "signin") {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else if (formType === "signup") {
        result = await supabase.auth.signUp({ email, password });
      } else if (formType === "reset") {
        result = await supabase.auth.resetPasswordForEmail(email);
      }

      if (result?.error) {
        setMessage(result.error.message);
      } else {
        setMessage(formType === 'reset' ? "Password reset email sent!" : "Success!");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) setMessage(error.message);
    } catch (error) {
      setMessage("Google sign-in failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
          {formType === "signin" ? "Sign In" : formType === "signup" ? "Sign Up" : "Reset Password"}
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formType !== "reset" && (
            <input
              type="password"
              placeholder="Password"
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
              ? "Sign In"
              : formType === "signup"
              ? "Sign Up"
              : "Send Reset Link"}
          </button>
          <button
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
            onClick={handleGoogleSignIn}
          >
            <Image src={googleIcon} alt="Google Icon" width={20} height={20} className="mr-2" />
            Continue with Google
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          {formType === "signin" && (
            <p>
              Don’t have an account?{' '}
              <button
                className="text-primary underline"
                onClick={() => setFormType("signup")}
              >
                Sign Up
              </button>
            </p>
          )}
          {formType === "signup" && (
            <p>
              Already have an account?{' '}
              <button
                className="text-primary underline"
                onClick={() => setFormType("signin")}
              >
                Sign In
              </button>
            </p>
          )}
          {formType !== "reset" && (
            <button
              className="text-primary underline mt-2"
              onClick={() => setFormType("reset")}
            >
              Forgot Password?
            </button>
          )}
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default AuthForm;
