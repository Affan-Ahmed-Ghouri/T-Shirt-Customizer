const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ photo: image })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Something went wrong', error: error.message })
    };
  }
};
