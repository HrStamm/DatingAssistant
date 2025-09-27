// Proxy til den faktiske chat API i dating-assistant feature
import { NextRequest } from 'next/server';

export async function POST(request) {
  // Re-export from the actual implementation
  const { POST: actualPOST } = await import('../../features/dating-assistant/api/chat/route.js');
  return actualPOST(request);
}
