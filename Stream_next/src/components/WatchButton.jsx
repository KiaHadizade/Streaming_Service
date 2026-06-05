"use client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

const WatchButton = ({ content_id }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  console.log(user);
  const notify = (messege) => {
    if (messege == "must-sign-in") toast.warn("Please Sign In First");
  };

  const handleWatchButton = () => {
    console.log(user, JSON.stringify(user));
    if (!isSignedIn) {
      notify("Must sign in");
      return;
    }
    // put user in users table
    // add content to History Table
  };

  return (
    <button
      onClick={() => {
        handleWatchButton();
      }}
      className={cn(isSignedIn ? "bg-emerald-600" : "bg-slate-600", "text-white text-center p-2 cursor-pointer w-75")}
    >
      Add to Watch List
    </button>
  );
};

export default WatchButton;
