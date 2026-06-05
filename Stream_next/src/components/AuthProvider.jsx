"use client";
import { shadcn, shadesOfPurple, neobrutalism } from "@clerk/ui/themes";

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
        <div className="mt-1 animate-spin scale-150 translate-x-1">⏳</div>
      </div>
    );
  }

  return (
    <div className="flex justify-end items-center gap-2 sm:gap-4 h-16">
      {!isSignedIn ? (
        <>
          <SignInButton mode="modal">
            <button className="bg-pink-600 text-white  rounded-lg p-1.5 sm:px-3 sm:py-2 transition cursor-pointer border-2">Sign In</button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="bg-cyan-800 text-white rounded-lg p-1.5 sm:px-3 sm:py-2 transition cursor-pointer border-2">Sign Up</button>
          </SignUpButton>
        </>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
    </div>
  );
}

export default function AuthProvider({ children }) {
  return (
    <ClerkProvider
      appearance={
        {
          // variables: {
          //   colorPrimary: "#ffffff",
          //   colorForeground: "#ffffff",
          // },
          // variables: { colorPrimary: "blue" },
          // theme: shadcn,
          // theme: shadesOfPurple,
        }
      }
    >
      {" "}
      <header className="flex justify-between items-center pt-4 gap-4 w-full h-16 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:gap-1 justify-between text-2xl font-bold">
          <div>
            <span className="text-purple-700">S</span>tream
          </div>
          <div>
            <span className="text-red-700">M</span>edia
          </div>
        </div>
        <AuthHeader />
      </header>
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
