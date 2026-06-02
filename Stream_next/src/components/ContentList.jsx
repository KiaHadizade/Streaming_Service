import React from "react";
import ContentCard from "./ContentCard";
import { getContents } from "@/lib/content-api";

const ContentList = async ({ type, sort, search }) => {
  const contents = await getContents({ type, sort, search });

  if (contents?.length > 0) {
    return (
      <main className="py-2 w-full grid md:grid-cols-2 gap-4">
        {contents.map((content) => (
          <ContentCard key={content.content_id} data={content} />
        ))}
      </main>
    );
  }
  return <h2>No Data Found</h2>;
};

export default ContentList;
/* import React from "react";
import ContentCard from "./ContentCard";

const ContentList = ({ contents }) => {
  if (contents?.length > 0) {
    return (
      <main className="py-2 w-full grid md:grid-cols-2 gap-4 ">
        {contents.map((content) => (
          <ContentCard key={content.content_id} data={content} />
        ))}
      </main>
    );
  }
  return <h2>No Data Found</h2>;
};

export default ContentList;
 */
