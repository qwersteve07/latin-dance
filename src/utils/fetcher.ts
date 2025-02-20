// const BASE_URL = "https://api.qs07-lee.com";
const BASE_URL = "http://localhost:8080";

export const fetcher = (url: string, options: any) => {
  return fetch(`${BASE_URL}${url}`, options).then((res) => res.json());
};
