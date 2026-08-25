const FIREBASE_AUTH_ORIGIN =
  'https://entrenosotros-js-20260824.firebaseapp.com';

/**
 * Keeps Firebase's redirect helpers on the same origin as the game.
 * This is required by browsers that block third-party storage during OAuth.
 */
export async function proxyFirebaseAuth(
  request: Request,
  pathSegments: string[],
): Promise<Response> {
  const requestUrl = new URL(request.url);
  const targetUrl = new URL(
    `/__/auth/${pathSegments.map(encodeURIComponent).join('/')}${requestUrl.search}`,
    FIREBASE_AUTH_ORIGIN,
  );

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('content-length');

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  const upstream = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: 'manual',
  });

  const responseHeaders = new Headers(upstream.headers);
  const location = responseHeaders.get('location');
  if (location?.startsWith(FIREBASE_AUTH_ORIGIN)) {
    responseHeaders.set(
      'location',
      `${requestUrl.origin}${location.slice(FIREBASE_AUTH_ORIGIN.length)}`,
    );
  }
  responseHeaders.set('cache-control', 'no-store');

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
