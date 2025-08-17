import { z } from "zod";

const accessToken = z.object({
  token: z.string(),
  type: z.string(),
  expires_in: z.number(),
});

const songMeta = z.object({
  album_name: z.string(),
  song_name: z.string(),
  artist: z.string(),
  image: z.url(),
  genre: z.string(),
});

export type AccessToken = z.infer<typeof accessToken>;

export type SongMeta = z.infer<typeof songMeta>;
