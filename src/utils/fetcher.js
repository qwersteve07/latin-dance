const BASE_URL = "https://api.qs07-lee.com";

export const fetcher = (url, options) => {
  console.log(url);
  return fetch(`${BASE_URL}${url}`, options).then((res) => res.json());
};
