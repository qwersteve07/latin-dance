const BASE_URL = "http://localhost:8080";

export const fetcher = (url, options) => {
  console.log(url);
  return fetch(`${BASE_URL}${url}`, options).then((res) => res.json());
};
