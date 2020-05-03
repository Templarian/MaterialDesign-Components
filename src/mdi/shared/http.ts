interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface Params { [key: string]: string; }

const isLocal = window.location.href.match(/localhost/);
const isGitHub = window.location.href.match(/templarian\.github\.io/);

export async function get<T>(
  request: string,
  options: { [key: string]: Params } = {}
): Promise<T> {

  const { params = {} } = options;
  const keys = Object.keys(params);
  const p = `?${keys.map(k => `${k}=${params[k]}`).join('&')}`;
  if (isLocal || isGitHub) {
    const mock = keys.map(k => `${k}/${params[k]}`).join('/');
    if (mock) {
      request += `/_/${mock}`;
    }
    if (isGitHub) {
      request = request.replace(/^\//, '');
    }
  }
  const response: HttpResponse<T> = await fetch(
    (isLocal || isGitHub) ? `${request}/mock.get.json` :  `${request}${p === '?' ? '' : p}`
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