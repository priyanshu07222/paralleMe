import axios from "axios";
import {GoogleGenAI, Modality} from "@google/genai"
import fs from "fs";


export async function POST(req: Request) {
    console.log(process.env.X_RAPID_API, "noi", process.env.X_RAPID_API1, "ketu",  process.env.GEMINI_API_KEY)
    const {userName} = await req.json();

    if(!userName){
        
        return Response.json({message: "All fields are required"}, {status: 400})
    
    }

    try {
        const options = {
            method: 'GET',
            url: 'https://twitter241.p.rapidapi.com/user',
            params: {
              username: userName
            },
            headers: {
              'x-rapidapi-key': process.env.X_RAPID_API1,
              'x-rapidapi-host': 'twitter241.p.rapidapi.com'
            }
          };
    
        const response = await axios.request(options);
        const rest_id = response.data.result.data.user.result.rest_id

    
        const options2 = {
            method: 'GET',
            url: 'https://twitter241.p.rapidapi.com/user-tweets',
            params: {
                user: rest_id,
                count: '50'
            },
            headers: {
                'x-rapidapi-key': process.env.X_RAPID_API,
                'x-rapidapi-host': 'twitter241.p.rapidapi.com'
            }
        };
    
        try {
            const response1 = await axios.request(options2);
            const arrayTweet = await response1.data?.result?.timeline?.instructions[2].entries.map((item: any) => item.content?.itemContent?.tweet_results?.result?.legacy?.full_text
            )
            console.log(arrayTweet)
            const data = await aiTweet(arrayTweet);
            

            return Response.json({
                success: true,
                data
            })
        } catch (error) {
            console.error(error);
        }
        
        return Response.json({
            success: "true"
        })
    } catch (error:any) {
        return Response.json({
            message: error.message
        }, {status: 500})
    }
}


async function aiTweet(tweets: any){
    // const systemPrompt = `
    //     You are Gemini, a chaotic funny AI from a parallel universe. 
    //     Analyze the user's tweets and generate a prompt for generating image:
    //     1. A parallel universe version of the user (funny name, personality)
    //     2. Their partner (species, personality)
    //     3. A story of what they do together in that world
    //     4. A prompt to generate a cartoon image of them together and what he is doing with their girlfriend or boyfriend based on their tweets. it should include some loving, fighting, angry based on his or her tweets.
    //     Return all 4 as a JSON object.
    // `;

    const systemPrompt = `
You are Gemini — a chaotic, funny, and wildly creative AI from a parallel universe.

Your task is to analyze the user's tweets and create a mind-blowing, share-worthy alternate universe story. Based on their Twitter personality, generate:

1. **An alternate universe version of the user** — give them a hilarious or cosmic name and a chaotic, memorable personality.
2. **Their cosmic lover** — describe their girlfriend or boyfriend in this universe. Be imaginative: the lover can be an alien, AI, ghost, animal hybrid, celestial being, or anything weird and cute. Give them a bold personality that contrasts or complements the user.
3. **A mini story** — describe one outrageous or deeply emotional thing they did together. It must include either:
   - A **romantic** moment (cuddling on a comet, kissing during a meteor shower, etc.) or  
   - A **dramatic or toxic fight** (arguing over space tacos, breaking planets in anger, etc.)
4. **An image prompt** — write a vivid and fun description to generate a cartoon-style image of the user and their lover together in that scene. Show them in a moment that’s either super romantic, dangerously toxic, or hilariously intense — make people *feel something* when they see it.

The tone should be chaotic, funny, and emotionally engaging.

Return everything as a JSON object like this:
{
  "user_identity": "some short zebrish Name",
  "partner_persona": "Species and personality of their lover around 20-30 words",
  "story": "Short, wild emotional story around 30-45 words",
  "image_prompt": "Prompt to generate cartoon image"
}
`;


    const client = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });
    
    const completion = await client.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Here are my tweets: \n\n${tweets.join("\n")}`,
        config: {
            systemInstruction: systemPrompt
        }
    });
    // console.log()

    const cleanText = completion.text?.replace(/```json\n?|\n?```/g, '') || '{}';
    const result: {user_identity: string, story: string, image_prompt: string, partner_persona: string} = JSON.parse(cleanText);

    const response = await client.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: result?.image_prompt,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      if (response.candidates?.[0]?.content?.parts) {
        let imageBase64 = null;
        for (const part of response.candidates[0].content.parts) {
          if (part.text) {
            console.log(part.text);
          } else if (part.inlineData?.data) {
            imageBase64 = part.inlineData.data;
          }
        }
        
        return {
          analysis: {
            species: result?.user_identity,
            personality: result?.story,
            partner_persona: result?.partner_persona
          },
          image: imageBase64
        };
      }
      
      return Response.json({
        success: false,
        message: "Failed to generate image"
      });
}