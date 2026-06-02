import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ContentListLoading = () => {
  return (
    <main className="py-2 w-full grid md:grid-cols-2 gap-4">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} className="h-48 w-full" />
      ))}
    </main>
  );
};

export default ContentListLoading;
