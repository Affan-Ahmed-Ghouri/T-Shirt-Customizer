import express from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from Gemini Image Generation" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp-image-generation',
      generationConfig: {
        responseModalities: ['IMAGE', 'TEXT'],
      }
    });

    const result = await model.generateContent(prompt);

    const response = result.response;
    const imagePart = response.candidates[0].content.parts.find(part => part.inlineData);

    if (!imagePart || !imagePart.inlineData) {
      throw new Error('No image generated');
    }

    const image = imagePart.inlineData.data;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
})

export default router;