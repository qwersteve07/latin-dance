import cookieStore from "@/store/cookie";

const localBaseUrl = "http://localhost:8080"
const serverBaseUrl = "https://api.qs07-lee.com"
const BASE_URL = process.env.NODE_ENV === 'development' ? localBaseUrl : serverBaseUrl
// const BASE_URL = serverBaseUrl

let isRefreshing = false;
let refreshPromise: any = null;
let requestQueue: any = [];

async function refreshTokens() {
  if (isRefreshing) {
    return refreshPromise;
  }

  isRefreshing = true;

  const refreshToken = cookieStore.getRefreshToken()
  if (!refreshToken) throw new Error('no refresh token found')

  refreshPromise = fetch(`${BASE_URL}/social-dance/refresh`, { method: 'POST', body: JSON.stringify({ refreshToken }) })
    .then(async res => {
      console.log(res)
      if (!res.ok) throw new Error('Failed to refresh token');
      const result = await res.json();

      console.log(result)

      cookieStore.setAuthToken(result.data.accessToken)
      cookieStore.setRefreshToken(result.data.refreshToken)

      requestQueue.forEach((cb: any) => cb(result.data.accessToken));
      requestQueue = [];

      return result
    }).catch((err) => {
      requestQueue.forEach((cb: any) => cb(null));
      requestQueue = [];
      throw err
    }).finally(() => {
      isRefreshing = false
      refreshPromise = null
    })

  return refreshPromise
}

export async function fetcher(url: string, options: any) {
  const authToken = cookieStore.getAuthToken();
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {}
  const response = await fetch(`${BASE_URL}${url}`, { ...options, headers })
  console.log(response)

  if (response.status === 401) {
    return new Promise((resolve, reject) => {
      requestQueue.push(async (newToken: string) => {
        console.log(newToken)
        if (!newToken) {
          // window.location.href = '/';
          return reject(new Error('refresh token invalid'))
        }

        try {
          const retryResponse = await fetch(`${BASE_URL}${url}`, { ...options, headers: { Authorization: `Bearer ${newToken}` } }).then((res) => res.json());
          resolve(retryResponse)
        } catch (err) {
          reject(err)
        }
      })

      if (!isRefreshing) {
        refreshTokens().catch((err) => {
          console.error('Token refresh failed:', err);
          // window.location.href = '/';
        });
      }
    })
  } else {
    return response.json()
  }
};
