// Proxy til den faktiske analyze-profile API i profile-optimizer feature
import { NextRequest } from 'next/server';

export async function POST(request) {
  // Re-export from the actual implementation
  const { POST: actualPOST } = await import('../../features/profile-optimizer/api/analyze-profile/route.js');
  return actualPOST(request);
}
