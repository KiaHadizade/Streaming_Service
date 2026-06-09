import React from "react";
import FavoriteButton from "./FavoriteButton";
import WatchButton from "./WatchButton";
// http://localhost:3000/api/content

const genreColors = {
  Action: "bg-amber-700 text-amber-100",
  Crime: "bg-rose-800 text-rose-100",
  Thriller: "bg-red-950 text-red-100",
  "Sci-Fi": "bg-sky-800 text-sky-100",
  Fantasy: "bg-violet-800 text-violet-100",
  Drama: "bg-fuchsia-800 text-fuchsia-100",
  Adventure: "bg-emerald-800 text-emerald-100",
  Horror: "bg-zinc-700 text-zinc-100",
  Mystery: "bg-yellow-800 text-yellow-100",
};

export function GenreBadge({ genre }) {
  return (
    <span
      className={`
        px-3 py-1 rounded-md text-xs font-medium
        border border-white/10
        ${genreColors[genre] || "bg-zinc-700 text-zinc-100"}
      `}
    >
      {genre}
    </span>
  );
}

const ContentCard = ({ data }) => {
  const status = data.status;
  const genres = data.genres ? JSON.parse(data.genres) : [];

  const actors = data.actors ? JSON.parse(data.actors) : [];

  return (
    <ul className="hover:bg-transparent bg-gray-800 p-4 border-4 border-gray-600 flex flex-col gap-2 /cursor-pointer">
      <li className="sm:flex justify-between flex-wrap">
        <h4 className=" text-2xl font-bold text-zinc-100">
          {data.title}{" "}
          <span className="text-zinc-400 text-sm capitalize">
            {" "}
            {data.type}{" "}
            {status != "Finished" && (
              <span
                className={`
      ml-2 px-2 pt-0.5 pb-1 rounded-sm text-xs font-medium
      ${status === "Ongoing" ? "bg-emerald-900/50 text-emerald-300" : "bg-amber-900/50 text-amber-300"}
    `}
              >
                ({status})
              </span>
            )}
          </span>
        </h4>
        <div className="flex justify-between items-baseline gap-3 sm:mt-2">
          <i className="text-md text-zinc-400">({data.release_year})</i>
          <span className="block w-10 text-sm text-amber-400">⭐{data.score}</span>
        </div>
      </li>

      {genres.length > 0 && (
        <li className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <GenreBadge key={genre.name} genre={genre.name} />
          ))}
        </li>
      )}
      {actors.length > 0 && (
        <li className="text-zinc-400">
          <span className="font-semibold text-sky-500">Cast:</span> {actors.map((actor) => actor.name).join(", ")}
        </li>
      )}
      <li className="mt-2">
        <p className="text-md text-gray-400">{data.description}</p>
      </li>
      <li className="flex justify-between">
        <FavoriteButton content_id={data.content_id} />
        {/* <AddToFavButton content_id={data.content_id} /> */}
        <WatchButton />
      </li>
    </ul>
  );
};

export default ContentCard;
