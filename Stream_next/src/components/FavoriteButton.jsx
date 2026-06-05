"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { FaHeartCirclePlus } from "react-icons/fa6";

import { cn } from "@/lib/utils";

import { getFavoriteStatus, addFavorite, removeFavorite } from "@/lib/favorites-api";

export default function FavoriteButton({ content_id, className }) {
  const { isLoaded, isSignedIn } = useUser();

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const notify = (message) => {
    switch (message) {
      case "must-sign-in":
        toast.warn("Please Sign In First");
        break;

      case "added":
        toast.success("Added To Favorites");
        break;

      case "removed":
        toast.info("Removed From Favorites");
        break;

      case "error":
        toast.error("Something Went Wrong");
        break;
    }
  };

  useEffect(() => {
    async function loadFavoriteStatus() {
      try {
        const data = await getFavoriteStatus(content_id);

        setIsFavorite(data.isFavorite);
      } catch (error) {
        console.error(error);
      }
    }

    if (isLoaded && isSignedIn) {
      loadFavoriteStatus();
    }
  }, [content_id, isLoaded, isSignedIn]);

  const handleFavButton = async () => {
    if (!isSignedIn) {
      notify("must-sign-in");
      return;
    }

    try {
      setLoading(true);

      if (isFavorite) {
        await removeFavorite(content_id);

        setIsFavorite(false);

        notify("removed");
      } else {
        await addFavorite(content_id);

        setIsFavorite(true);

        notify("added");
      }
    } catch (error) {
      console.error(error);

      notify("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFavButton}
      disabled={loading}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 transition cursor-pointer border-2",
        isSignedIn && isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500",
        loading && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <FaHeartCirclePlus size={24} className={cn("transition", isSignedIn && isFavorite && "fill-red-500")} />

      <span>{!isLoaded ? "Loading ..." : isSignedIn && isFavorite ? "Favorited" : "Add To Favorites"}</span>
    </button>
  );
}
