"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { WikiUser } from "@/types";

interface AuthContextValue {
  user: WikiUser | null;
  firebaseUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  firebaseUser: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<WikiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Get GitHub username from provider data
        const githubProvider = fbUser.providerData.find(
          (p) => p.providerId === "github.com"
        );
        const displayName =
          githubProvider?.displayName ||
          fbUser.displayName ||
          fbUser.email?.split("@")[0] ||
          "Anonymous";
        const avatarUrl = githubProvider?.photoURL || fbUser.photoURL || "";

        // Upsert user in D1 and get profile
        try {
          const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uid: fbUser.uid,
              displayName,
              avatarUrl,
              githubUsername: displayName,
            }),
          });
          if (res.ok) {
            setUser(await res.json());
          } else {
            // Fallback for demo/dev mode
            setUser({
              uid: fbUser.uid,
              displayName: fbUser.displayName || "Anonymous",
              avatarUrl: fbUser.photoURL || "",
              githubUsername: "",
              role: "member",
              articleCount: 0,
              joinedAt: new Date(),
            });
          }
        } catch {
          setUser({
            uid: fbUser.uid,
            displayName: fbUser.displayName || "Anonymous",
            avatarUrl: fbUser.photoURL || "",
            githubUsername: "",
            role: "member",
            articleCount: 0,
            joinedAt: new Date(),
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
