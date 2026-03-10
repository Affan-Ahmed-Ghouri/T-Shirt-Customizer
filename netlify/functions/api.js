const axios = require('axios');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;

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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ photo: imageResponse.data })
    };
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Something went wrong', error: error.response?.data?.message || error.message })
    };
  }
};
