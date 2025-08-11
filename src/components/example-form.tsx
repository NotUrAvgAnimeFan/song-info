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

const formSchema = z.object({
    song_link: z.url({protocol: /^https$/, hostname: /^open\.spotify\.com$/, message: "Invalid Spotify URL"})
})

export function SongInputForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            song_link: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
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
    )
}