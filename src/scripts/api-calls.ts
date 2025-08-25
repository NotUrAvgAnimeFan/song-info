import type { SongMeta } from "@/types/types";
import axios from "axios";

export async function fetchSongData(songLink: string): Promise<SongMeta> {
  // Fetch from live server
  const response = await axios.post(
    "https://song-info-server.vercel.app/spotify",
    {
      track_url: songLink,
    }
  );

  // Fetch from local server
  // const response = await axios.post(
  //   "http://localhost:3000/spotify",
  //   {
  //     track_url: songLink,
  //   }
  // );
  return response.data;
}
