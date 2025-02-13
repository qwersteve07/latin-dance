const BASE_URL = "https://api.qs07-lee.com";

export const fetcher = (url: string, options: any) => {
  return fetch(`${BASE_URL}${url}`, options).then((res) => res.json());
};
