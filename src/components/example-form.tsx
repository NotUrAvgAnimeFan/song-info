"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SongDetails from "@/components/song-details";

import { getAccessToken } from "@/scripts/access-token";
import { getSongMetadata } from "@/scripts/spotify-calls";

import type { SongMeta } from "../types/types";

const formSchema = z.object({
  song_link: z.url({
    protocol: /^https$/,
    hostname: /^open\.spotify\.com$/,
    message: "Invalid Spotify URL",
  }),
});

export function SongInputForm() {

  const [showSongDetails, setShowSongDetails] = useState(false);
  const [songMeta, setSongMeta] = useState<SongMeta>({
    album_name: "",
    song_name: "",
    artist: "",
    image: "",
    genre: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      song_link: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const access_token = await getAccessToken();
    const song_info = await getSongMetadata(values.song_link, access_token);

    setSongMeta(song_info);
    setShowSongDetails(true);

  }

  return (
    <div className="flex flex-col w-screen items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-4/5 sm:w-xl lg:w-2xl"
        >
          <FormField
            control={form.control}
            name="song_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spotify Song Link</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  We will get the metadata for the song you provide.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="relative z-50 w-full pointer-events-auto"
            style={{ touchAction: "manipulation" }}
            aria-label="Submit song link"
            onTouchEnd={(e) => {
              // Some mobile browsers (eg. Firefox Android) may not fire a click reliably;
              // call the form submit handler on touch end as a fallback.
              e.preventDefault();
              void form.handleSubmit(onSubmit)();
            }}
          >
            Submit
          </Button>
        </form>
      </Form>
      {!showSongDetails ? null : (<SongDetails data={songMeta} />)}
    </div>
  );
}
