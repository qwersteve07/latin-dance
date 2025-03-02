import Cookies from 'js-cookie';

class CookieStore {
    getAuthToken() {
        return Cookies.get('social-dance-token')
    }

    setAuthToken(token: string) {
        Cookies.set('social-dance-token', token, { expires: 1, secure: true }); // Store token in cookies
    }
}

const cookieStore = new CookieStore()

export default cookieStore