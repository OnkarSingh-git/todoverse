"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/_utils/firebase";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/_utils/auth-context";

export default function Header() {
  const router = useRouter();
  const { user, loading } = useUserAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer">TodoVerse</span>
      </Link>

      {user && (
        <nav className="space-x-4">
          <button
            onClick={handleSignOut}
            className="hover:text-gray-300 cursor-pointer px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}