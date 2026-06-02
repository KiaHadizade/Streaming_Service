import React from "react";
import ContentCard from "./ContentCard";

const ContentList = ({ contents }) => {
  return (
    <main className="py-2  w-full  grid md:grid-cols-2 gap-4">
      {contents.map((content) => (
        <ContentCard key={content.content_id} data={content} />
      ))}
    </main>
  );
};

export default ContentList;
