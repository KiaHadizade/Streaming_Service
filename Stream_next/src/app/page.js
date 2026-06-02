import ContentList from "@/components/ContentList";
import QuerySelect from "@/components/QuerySelect";
import ContentSearch from "@/components/ContentSearch";

import { getContents } from "@/lib/content-api";

const TYPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "movie", label: "Only Movies" },
  { value: "series", label: "Only Series" },
];
const SORT_OPTIONS = [
  { value: "all", label: "Default" },
  { value: "newest", label: "Newest Releases" },
  { value: "oldest", label: "Oldest Releases" },
  { value: "highest-rated", label: "Highest Ratings" },
  { value: "lowest-rated", label: "Lowest Ratings" },
];
export default async function Page({ searchParams }) {
  const params = await searchParams; //new next version searchParams is a promise

  const type = params.type || "";
  const sort = params.sort || "";
  const search = params.search || "";
  const content = await getContents({ type, sort, search });
  return (
    <main className="flex flex-col w-full justify-center items-center  max-w-7xl">
      <header className="w-full grid grid-cols-2 gap-y-3 gap-x-2 md:grid-cols-4 border-sky-900 border-4 p-2 text-md md:text-lg">
        <ContentSearch value={search} />
        <QuerySelect title={"Series / Movies"} value={type} queryKey="type" options={TYPE_OPTIONS} />
        <QuerySelect title={"Sort By"} value={sort} queryKey="sort" options={SORT_OPTIONS} />
      </header>
      <ContentList contents={content} />
    </main>
  );
}
