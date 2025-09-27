export const maxDuration = 60; // Set max duration for serverless function

export async function POST(request) {
  try {
    // Get the form data with the image
    const formData = await request.formData();
    const image = formData.get('image');
    const language = formData.get('language') || 'en';

    // Ensure we have an image file
    if (!image || !image.type || !image.type.startsWith('image/')) {
      return Response.json(
        { error: 'No valid image provided' },
        { status: 400 }
      );
    }

    // Convert the file to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');
    const contentType = image.type;
    const dataURI = `data:${contentType};base64,${base64Image}`;

    // Replace this with your actual OpenAI API integration
    // For now, we'll simulate a response
    
    // Normally, you would make an API call to OpenAI like this:
    /*
    import { OpenAI } from 'openai';
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this dating profile picture. Give me an overall score out of 10, list 3 strengths of the profile, and suggest 3 improvements that could make it more attractive." },
            {
              type: "image_url",
              image_url: {
                "url": dataURI
              },
            },
          ],
        },
      ],
    });
    
    const analysis = response.choices[0].message.content;
    
    // Parse the analysis to get structured data
    // This is a simplistic example; you'd need more robust parsing in a real app
    const overallScoreMatch = analysis.match(/Overall score: (\d+(\.\d+)?)/i);
    const overallScore = overallScoreMatch ? parseFloat(overallScoreMatch[1]) : 7;
    
    const strengthsSection = analysis.split("Strengths:")[1]?.split("Improvements:")[0];
    const strengths = strengthsSection
      ?.match(/\d+\.\s+(.+?)(?=\d+\.|$)/g)
      ?.map(s => s.replace(/^\d+\.\s+/, '').trim()) || [];
      
    const improvementsSection = analysis.split("Improvements:")[1];
    const improvements = improvementsSection
      ?.match(/\d+\.\s+(.+?)(?=\d+\.|$)/g)
      ?.map(s => s.replace(/^\d+\.\s+/, '').trim()) || [];
    */
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock response data - in a real implementation, this would come from OpenAI
    const mockAnalysis = {
      overallScore: 7.5,
      strengths: [
        language === 'da' ? 'Godt smil på dit hovedbillede' : 'Great smile in your main photo',
        language === 'da' ? 'God variation af aktiviteter vist' : 'Good variety of activities shown',
        language === 'da' ? 'Tydelige ansigtsbilleder' : 'Clear facial shots'
      ],
      improvements: [
        language === 'da' ? 'Tilføj flere billeder i sociale situationer' : 'Add more photos in social settings',
        language === 'da' ? 'Overvej en mere detaljeret bio' : 'Consider a more detailed bio',
        language === 'da' ? 'Tilføj et billede, der viser din fulde højde' : 'Add a photo that shows your full height'
      ]
    };

    return Response.json(mockAnalysis, { status: 200 });

  } catch (error) {
    console.error('Error processing image:', error);
    return Response.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
}
