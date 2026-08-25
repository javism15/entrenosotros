import { proxyFirebaseAuth } from '@/lib/firebaseAuthProxy';

interface AuthRouteContext {
  params: Promise<{ path: string[] }>;
}

async function handleAuthRequest(request: Request, context: AuthRouteContext) {
  const { path } = await context.params;
  return proxyFirebaseAuth(request, path);
}

export const GET = handleAuthRequest;
export const POST = handleAuthRequest;
export const HEAD = handleAuthRequest;
export const OPTIONS = handleAuthRequest;
