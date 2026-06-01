"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TYPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "movie", label: "Only Movies" },
  { value: "series", label: "Only Series" },
];

export default function TypeFilter({ value = "all" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (type) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "all") {
      params.delete("type");
    } else {
      params.set("type", type);
    }

    router.push(`?${params.toString()}`);
  };

  const selectedLabel = TYPE_OPTIONS.find((option) => option.value === value)?.label ?? "All";

  return (
    <div>
      <h4 className="text-zinc-200">Series / Movies</h4>

      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-36 rounded-sm border border-zinc-700">
          <SelectValue>{selectedLabel}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {TYPE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
