
import axios from 'axios';
import type { AccessToken } from '../types/types'; // Adjust the path as needed

export async function getSongMetadata(songLink: string, accessToken: AccessToken): Promise<string> {
	const parts = songLink.split("track/");
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${parts[1]}`, 
        {
            headers: {
                Authorization: `${accessToken.type} ${accessToken.token}`,
            }
        }
    );

    const artist = await axios.get(`https://api.spotify.com/v1/artists/${response.data.artists[0].id}`,
        {
            headers: {
                Authorization: `${accessToken.type} ${accessToken.token}`,
            }
        }
    );

    return artist.data.genres[0];
}