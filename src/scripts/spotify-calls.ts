import axios from "axios";
import type { AccessToken } from "../types/types"; // Adjust the path as needed
import type { SongMeta } from "../types/types"; // Adjust the path as needed

export async function getSongMetadata(
  songLink: string,
  accessToken: AccessToken
): Promise<SongMeta> {
  const output: SongMeta = {
    album_name: "",
    song_name: "",
    artist: "",
    image: "",
    genre: "",
  };

  const parts = songLink.split("track/");
  const track_data = await axios.get(
    `https://api.spotify.com/v1/tracks/${parts[1]}`,
    {
      headers: {
        Authorization: `${accessToken.type} ${accessToken.token}`,
      },
    }
  );

  output.album_name = track_data.data.album.name;
  output.song_name = track_data.data.name;
  output.image = track_data.data.album.images[1].url;

  const artist = await axios.get(
    `https://api.spotify.com/v1/artists/${track_data.data.artists[0].id}`,
    {
      headers: {
        Authorization: `${accessToken.type} ${accessToken.token}`,
      },
    }
  );

  output.artist = artist.data.name;

  if (artist.data.genres.length === 0) {
    output.genre = "No Genres Available";
  } else {
    output.genre = artist.data.genres[0];
  }

  return output;
}
