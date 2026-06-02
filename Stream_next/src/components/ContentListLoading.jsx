import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ContentListLoading = () => {
  return (
    <main className="py-2 w-full grid md:grid-cols-2 gap-4">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} className="bg-gray-800 h-50.25 md:h-44.25 w-full" />
      ))}
    </main>
  );
};

export default ContentListLoading;
