import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // check the match routes
  if (authenticationRoutes.some(route => pathname.includes(route))) {
    const authToken = request.cookies.get('social-dance-access-token')
    if (!authToken) {
      return NextResponse.redirect(new URL('/', request.url)); // Redirect to root
    } else {
      return NextResponse.next(); // Allow request to proceed
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value

  // 1. 使用者選過語言（有 cookie）：一律以 cookie 為準
  if (cookieLocale) {
    if (request.nextUrl.locale !== cookieLocale) {
      return redirectToLocale(request, cookieLocale)
    }
    return NextResponse.next()
  }

  // 2. 沒有 cookie、網址有指定語言（例如 /en/calendar）：尊重網址，分享出去的連結才會是對的語言
  if (hasLocalePrefix(request)) {
    return NextResponse.next()
  }

  // 3. 沒有 cookie、網址也沒指定：依瀏覽器語言決定
  const detected = detectLocale(request.headers.get('accept-language'))
  const response = detected === request.nextUrl.locale
    ? NextResponse.next()
    : redirectToLocale(request, detected)
  response.headers.set('Vary', 'Accept-Language, Cookie')
  return response
}

const LOCALES = ['tw', 'en']

function redirectToLocale(request: NextRequest, locale: string) {
  return NextResponse.redirect(
    new URL(`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
  )
}

// request.nextUrl.pathname 已去掉語言前綴，所以從原始網址判斷
function hasLocalePrefix(request: NextRequest) {
  const firstSegment = new URL(request.url).pathname.split('/')[1]
  return LOCALES.includes(firstSegment)
}

// 瀏覽器語言清單中只要有中文就用中文（主要使用者是台灣人，可能用英文介面的系統）；
// 其他語言用英文。沒有這個標頭（例如搜尋引擎爬蟲）維持預設中文。
function detectLocale(acceptLanguage: string | null) {
  if (!acceptLanguage) return 'tw'
  const languages = acceptLanguage
    .split(',')
    .map(part => part.split(';')[0].trim().toLowerCase())
    .filter(Boolean)
  if (languages.length === 0) return 'tw'
  return languages.some(lang => lang === 'zh' || lang.startsWith('zh-')) ? 'tw' : 'en'
}

// Apply middleware only to protected routes
const authenticationRoutes = ['/events-list', '/events-list/new', '/events-list/:slug'];

export const config = {
  matcher: ['/events-list', '/events-list/new', '/events-list/:slug', '/:path*'], // Protect these routes
};
