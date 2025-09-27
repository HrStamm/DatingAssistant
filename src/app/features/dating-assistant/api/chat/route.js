import OpenAI from 'openai';

// Initialiserer OpenAI med din API nøgle
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST function - server-side kode der modtager requests
export async function POST(request) {
  try {
    // Send til ChatGPT
    // I POST funktionen:
    const { message, tone = 'flirtende' } = await request.json();

    // Lav forskellige system prompts baseret på tone
    let systemPrompt = "";
    switch (tone) {
    case 'sjov':
        systemPrompt = "Du er en sjov og humoristisk assistent. Din opgave er at hjælpe med at skrive et vittigt og humoristisk svar til en besked. Brug gerne ordspil og vær lidt fræk uden at overdrive. Hold det sjovt, let og underholdende.";
        break;
    case 'romantisk':
        systemPrompt = "Du er en romantisk assistent. Din opgave er at hjælpe med at skrive et sødt, oprigtigt og romantisk svar til en besked. Vis dybde og følelser uden at være overdrevet. Vær oprigtig og varm i tonen.";
        break;
    case 'afslappet':
        systemPrompt = "Du er en afslappet og cool assistent. Din opgave er at hjælpe med at skrive et casual og let svar til en besked. Vær afslappet, venskabelig og naturlig. Undgå at virke for ivrig eller intens.";
        break;
    case 'flirtende':
    default:
        systemPrompt = "Du er en flirtende, sjov og charmerende assistent. Din opgave er at hjælpe med at skrive et godt, flirtende svar til en besked modtaget i en dating app eller chat. Svaret skal være på dansk, charmerende, legende og ikke for aggressivt.";
    }

    // Brug den valgte system prompt
    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
        role: "system",
        content: systemPrompt + " Hold det mellem 1-3 sætninger. Lad være med at skrive for langt eller for alvorligt."
        },
        {
        role: "user",
        content: `Min flirt har lige skrevet denne besked til mig: "${message}". Hjælp mig med at svare på en ${tone} måde.`
        }
    ],
    max_tokens: 150,
    temperature: 0.8,
    });

    // Send svar tilbage
    return Response.json({ 
      success: true,
      message: response.choices[0].message.content 
    });

  } catch (error) {
    console.error('OpenAI API fejl:', error);
    return Response.json({ 
      success: false, 
      error: 'Der skete en fejl: ' + error.message 
    }, { status: 500 });
  }
}