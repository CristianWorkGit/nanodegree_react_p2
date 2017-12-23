const JSONHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export const API_BASE = 'http://localhost:3001'

export const serializeParams = params => {
  const searchParams = new URLSearchParams();

  for (let key of Object.keys(params)) {
    searchParams.set(key, params[key]);
  }

  return searchParams.toString();
};

export const xhr = async (url, options) => {
  let headers = Object.assign({}, JSONHeaders);
  const token = 'whatever-you-want';

  if (options.searchParams) {
    url += '?' + serializeParams(options.searchParams);
    delete options.searchParams;
  }

  if (token) {
    headers['Authorization'] = `JWT ${token}`;
  }

  const res = await fetch(url, Object.assign({ headers }, options));

  const json = await res.json();

  if (res.status >= 200 && res.status < 300) {
    return json;
  }

  const error = new Error(res.statusText);
  error.status = res.status;
  const defaultMessage = 'An error occurred. Please try again or contact support.';
  error.response = json.verbose || json.code || defaultMessage;
  throw error;
};
