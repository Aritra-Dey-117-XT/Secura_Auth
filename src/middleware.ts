import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

    const path: string = request.nextUrl.pathname

    const isPublicPath = (path: string): boolean => {
      const publicPaths = ["/login", "/signup", "/verifyemail", /^\/forgotpassword(\/.*)?$/];
      return publicPaths.some(publicPath => 
          typeof publicPath === 'string' ? path === publicPath : publicPath.test(path)
      );
    };

    const token = request.cookies.get("token")?.value || ""
    if(isPublicPath(path) && path!=="/" && token) {
      return NextResponse.redirect(new URL('/profile', request.url))
    } else if(!isPublicPath(path) && path!=="/" && !token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }    
}
 
export const config = {
  matcher: [
    "/",
    "/signup",
    "/login",
    "/profile/:path*",
    "/verifyemail",
    "/forgotpassword/:path*"
  ],
}