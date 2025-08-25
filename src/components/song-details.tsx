
// import React from "react";
import type { SongMeta } from "../types/types";

export default function SongDetails({ data }: { data: SongMeta }) {
  
  return (
    <div className="flex justify-evenly items-center w-4/5 sm:w-xl lg:w-2xl mt-10 text-left">
      <img
        src={data.image}
        alt={data.genre}
        className="w-1/2 border-solid border-mid dark:border-eggshell border-10"
      />
      <div className="text-sm sm:text-lg w-2/5 wrap-anywhere">
        <p>
          <span className="font-bold">Album:</span> {data.album_name}
        </p>
        <p>
          <span className="font-bold">Song:</span> {data.song_name}
        </p>
        <p>
          <span className="font-bold">Artist:</span> {data.artist}
        </p>
        <p>
          <span className="font-bold">Song Genre:</span> {data.genre}
        </p>
      </div>
    </div>
  );

}