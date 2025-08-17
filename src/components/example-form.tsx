"use client"

import * as React from "react"
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


export function SongInputForm() {
    const resultRef = React.useRef<HTMLParagraphElement | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            song_link: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const resulting_url = resultRef.current
        if (resulting_url) {
            const access_token = await getAccessToken();
            const song_name = await getSongMetadata(values.song_link, access_token);

            resulting_url.textContent = song_name;
        }
    }

    return (
        <div className="flex flex-col w-screen items-center">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5 sm:w-2xl px-4">
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
                <Button
                    type="submit"
                    className="relative z-50 w-full sm:w-auto pointer-events-auto"
                    style={{ touchAction: 'manipulation' }}
                    aria-label="Submit song link"
                    onTouchEnd={(e) => {
                        // Some mobile browsers (eg. Firefox Android) may not fire a click reliably;
                        // call the form submit handler on touch end as a fallback.
                        e.preventDefault()
                        void form.handleSubmit(onSubmit)()
                    }}
                >
                    Submit
                </Button>
            </form>
        </Form>
    <p ref={resultRef} className="pt-10" id="result">Hello</p>
        </div>
        
    )
}