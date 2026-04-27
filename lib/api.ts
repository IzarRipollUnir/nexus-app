const apiBaseUrl = 'https://mock.apidog.com/m1/1131845-1123817-default';

type RequestInitWithJson = RequestInit & {
  json?: unknown;
};

async function request<T>(path: string, init?: RequestInitWithJson): Promise<T> {
  const headers = new Headers(init?.headers);

  if (init?.json !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
    body: init?.json !== undefined ? JSON.stringify(init.json) : init?.body,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, json?: unknown) => request<T>(path, { method: 'POST', json }),
};
