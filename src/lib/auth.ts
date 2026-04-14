import {
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";
import type { WikiUser } from "@/types";

const githubProvider = new GithubAuthProvider();

async function upsertUser(user: User, displayName?: string): Promise<WikiUser> {
  const name = displayName || user.displayName || user.email?.split("@")[0] || "Anonymous";
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uid: user.uid,
      displayName: name,
      avatarUrl: user.photoURL || "",
      githubUsername: "",
    }),
  });

  if (res.ok) {
    return await res.json();
  }

  return {
    uid: user.uid,
    displayName: name,
    avatarUrl: user.photoURL || "",
    githubUsername: "",
    role: "member",
    articleCount: 0,
    joinedAt: new Date(),
  };
}

export async function signInWithGitHub(): Promise<WikiUser> {
  const result = await signInWithPopup(auth, githubProvider);
  return upsertUser(result.user);
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<WikiUser> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return upsertUser(result.user);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<WikiUser> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return upsertUser(result.user, displayName);
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}
