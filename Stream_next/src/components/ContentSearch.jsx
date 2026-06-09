"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function ContentSearch({ value = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;

    setSearch(newValue);

    const params = new URLSearchParams(searchParams.toString());

    if (newValue.trim()) {
      params.set("search", newValue.trim());
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="col-span-2 max-w-90">
      {" "}
      <h4 className="text-zinc-200 py-1">Search By Title</h4>
      <Input value={search} placeholder="eg: Breaking Bad" onChange={handleChange} />
    </div>
  );
}
/* "use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function ContentSearch({ value = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event) => {
    const params = new URLSearchParams(searchParams.toString());
    const search = event.target.value.trim();

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  };

  return <Input value={value} placeholder="Search by title..." onChange={handleChange} />;
}
 */
