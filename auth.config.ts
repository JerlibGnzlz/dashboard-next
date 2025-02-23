import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//     pages: {
//         signIn: '/login',
//     },
//     callbacks: {
//         authorized({ auth, request: { nextUrl } }) {
//             const isLoggedIn = !!auth?.user;
//             const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//             if (isOnDashboard) {
//                 if (isLoggedIn) return true;
//                 return false; // Redirigir usuarios no autenticados a /login
//             } else if (isLoggedIn) {
//                 return Response.redirect(new URL('/dashboard', nextUrl));
//             }
//             return true;
//         },
//         async redirect({ url, baseUrl }) {
//             return baseUrl; // 🔥 Redirigir siempre a `NEXTAUTH_URL`
//         },
//     },
//     providers: [], // Aquí debes agregar tus proveedores de autenticación
// } satisfies NextAuthConfig;
