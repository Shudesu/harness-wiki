import {
  GithubAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "./firebase";
import type { WikiUser } from "@/types";

const githubProvider = new GithubAuthProvider();

export async function signInWithGitHub(): Promise<WikiUser> {
  const result = await signInWithPopup(auth, githubProvider);
  const user = result.user;

  // Upsert user in D1 via API
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uid: user.uid,
      displayName: user.displayName || "Anonymous",
      avatarUrl: user.photoURL || "",
      githubUsername: user.displayName || "",
    }),
  });

  if (res.ok) {
    return await res.json();
  }

  return {
    uid: user.uid,
    displayName: user.displayName || "Anonymous",
    avatarUrl: user.photoURL || "",
    githubUsername: "",
    role: "member",
    articleCount: 0,
    joinedAt: new Date(),
  };
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}
