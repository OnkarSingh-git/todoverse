import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/_utils/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TodoVerse",
  description: "Your personal task universe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthContextProvider> {/* Wrap everything with the provider */}
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthContextProvider>
      </body>
    </html>
  );
}