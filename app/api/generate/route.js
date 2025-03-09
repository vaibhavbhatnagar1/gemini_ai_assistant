import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try {
       const genAi=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
       const model=genAi.getGenerativeModel({ model: "gemini-1.5-flash"});
       const data=await req.json()

       const prompt=data.output
       const result=await model.generateContent(prompt);
       const response= await result.response;
       const output=await response.text();
       return NextResponse.json({output:output});
    } catch (error) {
        console.log(error);
        
    }
}