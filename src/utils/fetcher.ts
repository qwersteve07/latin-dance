const localBaseUrl = "http://localhost:8080"
const serverBaseUrl = "https://api.qs07-lee.com"
const BASE_URL = process.env.NODE_ENV === 'development' ? localBaseUrl : serverBaseUrl

export const fetcher = (url: string, options: any) => {
  return fetch(`${BASE_URL}${url}`, options).then((res) => res.json());
};
