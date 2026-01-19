import Cookies from 'js-cookie';

class CookieStore {
    getAuthToken() {
        return Cookies.get('social-dance-access-token')
    }

    setAuthToken(token: string) {
        Cookies.set('social-dance-access-token', token, { expires: 1, secure: true }); // Store token in cookies
    }

    getRefreshToken() {
        return Cookies.get('social-dance-refresh-token')
    }

    setRefreshToken(token: string) {
        Cookies.set('social-dance-refresh-token', token, { expires: 7, secure: true }); // Store token in cookies
    }

    clearToken() {
        Cookies.remove('social-dance-access-token')
        Cookies.remove('social-dance-refresh-token')
    }
}

const cookieStore = new CookieStore()

export default cookieStore