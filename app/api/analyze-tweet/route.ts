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
                count: '20'
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
            await aiTweet(arrayTweet);
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
    const systemPrompt = `
        You are Gemini, a chaotic funny AI from a parallel universe. 
        Analyze the user's tweets and generate a prompt for generating image:
        1. A parallel universe version of the user (funny name, personality)
        2. Their partner (species, personality)
        3. A story of what they do together in that world
        4. A prompt to generate a cartoon image of them together and what he is doing with their girlfriend or boyfriend based on their tweets. it should include some loving, fighting, angry based on his or her tweets.
        Return all 4 as a JSON object.
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
    const result: {species: string, personality: string, image_prompt: string, partner_persona: string} = JSON.parse(cleanText);

    const response = await client.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: result?.image_prompt,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          // Based on the part type, either show the text or save the image
          if (part.text) {
            console.log(part.text);
          } else if (part.inlineData?.data) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync("gemini-native-image.png", buffer);
            console.log("Image saved as gemini-native-image.png");
          }
        }
      }

    
}