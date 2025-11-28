import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/auth/login' // redirige si no está autenticado
	},
	callbacks: {
		authorized: ({ token }) => !!token // permite el acceso solo si hay un token de sesión
	}
});

export const config = {
	matcher: ['/requests/:path*', '/admin/:path*', '/request/:path*', '/profile/:path*']
};
