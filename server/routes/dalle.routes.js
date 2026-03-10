import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from Freepik Image Generation" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const createResponse = await axios.post(
      'https://api.freepik.com/v1/ai/text-to-image/seedream-v4',
      {
        prompt: prompt,
        image: {
          size: "square_1_1"
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-freepik-api-key': FREEPIK_API_KEY
        }
      }
    );

    const taskId = createResponse.data.data.task_id;

    let result;
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 2000));
      
      const statusResponse = await axios.get(
        `https://api.freepik.com/v1/ai/text-to-image/seedream-v4/${taskId}`,
        {
          headers: {
            'Accept': 'application/json',
            'x-freepik-api-key': FREEPIK_API_KEY
          }
        }
      );

      result = statusResponse.data.data;
      
      if (result.status === 'COMPLETED') {
        break;
      } else if (result.status === 'FAILED') {
        throw new Error('Image generation failed');
      }
      
      attempts++;
    }

    if (!result || result.status !== 'COMPLETED') {
      throw new Error('Image generation timed out');
    }

    const imageUrl = result.generated[0];
    const imageResponse = await axios.get(imageUrl, { responseType: 'base64' });

    res.status(200).json({ photo: imageResponse.data });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ message: "Something went wrong", error: error.response?.data?.message || error.message })
  }
})

export default router;