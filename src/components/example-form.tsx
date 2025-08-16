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

import { getAccessToken } from "@/scripts/access-token"
import { getSongMetadata } from "@/scripts/spotify-calls"

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