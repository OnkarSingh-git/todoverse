"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/_utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handler for logging in using email/password
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully with Email!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error during email login:", err);
      setError(err.message);
      toast.error("Error logging in: " + err.message);
    }
  };

  // Handler for logging in using GitHub
  const handleGitHubLogin = async () => {
    setError("");
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in successfully with GitHub!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error during GitHub login:", err);
      setError(err.message);
      toast.error("Error logging in with GitHub: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Login to TodoVerse
      </h1>

      {error && <p className="mb-2 text-red-500">{error}</p>}

      {/* Email/Password Login Form in a professional blue-indigo gradient */}
      <form
        onSubmit={handleEmailLogin}
        className="flex flex-col gap-4 w-full max-w-sm bg-gradient-to-br from-blue-800 to-indigo-800 p-8 rounded-lg shadow-xl"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 bg-white text-black placeholder-gray-900 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 bg-white text-black placeholder-gray-900 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button
          type="submit"
          className="px-8 py-3 bg-orange-700 text-white rounded-md hover:bg-indigo-950 transition"
        >
          Login with Email
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 border-t w-full max-w-sm border-gray-700"></div>

      {/* GitHub Login Button with a refined dark blue style */}
      <button
        onClick={handleGitHubLogin}
        className="px-8 py-3 bg-black text-white border border-blue-700 rounded-md hover:bg-blue-950 transition w-full max-w-sm"
      >
        Login with GitHub
      </button>
    </div>
  );
}