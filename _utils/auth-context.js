"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw new Error(error.message);
    }
  };

  const emailLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (err) {
      console.error("Email Login Error:", err);
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          throw new Error(
            "Invalid credentials provided. Please check your email and password."
          );
        case "auth/invalid-email":
          throw new Error("Invalid email format.");
        default:
          throw new Error(err.message);
      }
    }
  };

  const emailSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (err) {
      console.error("Email Signup Error:", err);
      switch (err.code) {
        case "auth/email-already-in-use":
          throw new Error(
            "This email is already in use. Please try logging in instead."
          );
        case "auth/invalid-email":
          throw new Error("Invalid email format.");
        case "auth/weak-password":
          throw new Error(
            "The password is too weak. Please choose a stronger password."
          );
        default:
          throw new Error(err.message);
      }
    }
  };

  const gitHubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (err) {
      console.error("GitHub Sign-In Error:", err);
      throw new Error(err.message);
    }
  };

  const firebaseSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign Out Error:", err);
      throw new Error("Error signing out. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const authValue = useMemo(
    () => ({
      user,
      googleSignIn,
      gitHubSignIn,
      emailLogin,
      emailSignUp,
      firebaseSignOut,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(AuthContext);
