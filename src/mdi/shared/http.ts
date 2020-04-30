interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface Params { [key: string]: string; }

export async function get<T>(
  request: RequestInfo,
  params: { [key: string]: Params } = {}
): Promise<T> {

  const keys = Object.keys(params);
  const p = `?${keys.map(k => `${k}=${params[k]}`).join('&')}`;

  const response: HttpResponse<T> = await fetch(
    `${request}${p === '?' ? '' : p}`
  );

  try {
    return response.json();
  } catch (ex) {}

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return Promise.reject();
}

export const http = {
  get
};