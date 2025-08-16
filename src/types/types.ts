import {z} from 'zod'

const accessToken = z.object({
    token: z.string(),
    type: z.string(),
    expires_in: z.number(),
})

export type AccessToken = z.infer<typeof accessToken>;