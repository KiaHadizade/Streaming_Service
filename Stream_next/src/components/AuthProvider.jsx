"use client";

import { ClerkProvider, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

import { useEffect } from "react";
import { syncUserWithDatabase } from "@/lib/user-api";

function AuthHeader() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    syncUserWithDatabase();
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="flex justify-end items-center p-4 gap-4 h-16">
        <div className="mt-1 animate-spin scale-150">⏳</div>
      </div>
    );
  }

  return (
    <header className="flex justify-end items-center pt-4 gap-4 h-16">
      {!isSignedIn ? (
        <>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
    </header>
  );
}

export default function AuthProvider({ children }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: "hidden",
        },
      }}
    >
      <AuthHeader />
      {children}
    </ClerkProvider>
  );
}
/* "use client";
import { ClerkProvider, SignInButton, SignUpButton, UserButton, useAuth, useUser } from "@clerk/nextjs";

function AuthHeader() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-end items-center p-4  gap-4 h-16">
        <div className="mt-1 animate-spin scale-150">⏳</div>
      </div>
    );
  }

  return (
    <header className="flex justify-end items-center pt-4 gap-4 h-16">
      {!isSignedIn ? (
        <>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white /rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-purple-700 text-white /rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
    </header>
  );
}

export default function AuthProvider({ children }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: "hidden",
        },
      }}
    >
      <AuthHeader />
      {children}
    </ClerkProvider>
  );
}
 */
