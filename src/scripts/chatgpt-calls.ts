// import OpenAI from "openai";
// const client = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY});

// export async function chatGPTSongGenre(songName: string, songArtist: string): Promise<Array<string>> {
  
//   const response = await client.responses.create({
//     model: "gpt-5",
//     input: `Give me the genre of the song '${songName}' by ${songArtist}`
//   })
  
//   return [response.output_text]
// }