
import axios from 'axios'
import type { AccessToken } from '@/types/types'


export async function getAccessToken(): Promise<AccessToken> {
    const clientID = import.meta.env.VITE_CLIENT_ID
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET

    if (!clientID || !clientSecret) {
        throw new Error("Client ID and Client Secret must be provided");
    }
    const access_token = await axios.post('https://accounts.spotify.com/api/token',
        new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientID,
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
        expires_in: access_token.data.expires_in,
    }

    return result;
}

