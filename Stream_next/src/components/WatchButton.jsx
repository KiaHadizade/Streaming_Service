"use client";
import React from "react";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { FaPlayCircle, FaTimes } from "react-icons/fa";

import { cn } from "@/lib/utils";

export default function WatchButton() {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const notify = (message) => {
    switch (message) {
      case "must-sign-in":
        toast.warn("Please Sign In First");
        break;
    }
  };

  const handleWatch = () => {
    if (!isSignedIn) {
      notify("must-sign-in");
      return;
    }

    setIsOpen(true);
  };

  return (
    <>
      {/* Watch Button */}
      <button
        onClick={handleWatch}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 transition cursor-pointer border-2",
          "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600",
        )}
      >
        <FaPlayCircle size={24} />
        <span>Watch Now</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 transition"
            >
              <FaTimes size={24} />
            </button>

            {/* Video Player */}
            <video controls autoPlay className="w-full" preload="auto">
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
