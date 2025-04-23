import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-black p-6">
      <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
        Welcome to TodoVerse
      </h1>
      <p className="text-xl text-gray-300 mb-10 text-center max-w-2xl">
        Your personal task universe — manage your tasks seamlessly with an
        interactive, secure experience that keeps you organized and productive.
        Log In or Sign Up to get started
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/login"
          className="px-8 py-3 bg-indigo-700 text-white font-semibold rounded-md shadow hover:bg-indigo-600 transition"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
