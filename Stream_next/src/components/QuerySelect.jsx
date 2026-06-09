"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function QuerySelect({ title, value, queryKey, options }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (selectedValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedValue === options[0].value) {
      params.delete(queryKey);
    } else {
      params.set(queryKey, selectedValue);
    }

    router.push(`?${params.toString()}`);
  };

  const selectedLabel = options.find((option) => option.value === value)?.label ?? options[0].label;

  return (
    <div>
      <h4 className="text-zinc-200 py-1">{title}</h4>

      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-40 max-w-full">
          <SelectValue>{selectedLabel}</SelectValue>
        </SelectTrigger>

        <SelectContent className="bg-gray-800" alignItemWithTrigger={true}>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
