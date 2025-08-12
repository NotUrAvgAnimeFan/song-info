"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import axios from 'axios';

const formSchema = z.object({
    song_link: z.url({protocol: /^https$/, hostname: /^open\.spotify\.com$/, message: "Invalid Spotify URL"})
})

const accessToken = z.object({
    token: z.string(),
    type: z.string(),
    expires_in: z.number(),
})

type AccessToken = z.infer<typeof accessToken>;

export function SongInputForm() {

    const resulting_url = document.getElementById("result")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            song_link: "",
        },
    })

    

    async function getAccessToken(): Promise<AccessToken> {
        const clientId = import.meta.env.VITE_CLIENT_ID
        const clientSecret = import.meta.env.VITE_CLIENT_SECRET
        //ensures we have correct client credentials
        if (!clientId || !clientSecret) {
            throw new Error("Client ID and Client Secret must be provided in the environment variables.");
        }
        const access_token = await axios.post('https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );
        const result: AccessToken = {
            token: access_token.data.access_token,
            type: access_token.data.token_type,
            expires_in: access_token.data.expires_in
        };
        localStorage.setItem('spotify_access_token', JSON.stringify(result));
        return result;
    }

    async function getSongMetadata(songLink: string, accessToken: AccessToken): Promise<string> {

        const parts = songLink.split("track/");
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${parts[1]}`,
            {
                headers: {
                    Authorization: `${accessToken.type} ${accessToken.token}`,
                }
            }
        );

        const artist = await axios.get(` https://api.spotify.com/v1/artists/${response.data.artists[0].id}`,
            {
                headers: {
                    Authorization: `${accessToken.type} ${accessToken.token}`,
                }
            }
        )

        console.log(artist);

        return artist.data.genres[0];
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (resulting_url) {
            const access_token = await getAccessToken();
            const song_name = await getSongMetadata(values.song_link, access_token);

            resulting_url.textContent = song_name;
        }
    }

    return (
        <div className="flex flex-col w-screen items-center">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2 lg:max-w-2xl">
                <FormField
                control={form.control}
                name="song_link"
                render={({field}) => (
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <p className="pt-10" id="result">Hello</p>
        </div>
        
    )
}