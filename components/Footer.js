// "use client"; // Optional

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} TodoVerse. All rights reserved.
      </footer>
    );
  }