export const ep = {
	auth: {
		login: '/auth/login',
		register: '/auth/register',
		oauthSignIn: '/auth/oauth-signin'
	},
	category: {
		getAll: '/categories'
	},
	service: {
		getAll: '/services',
		getById: '/services/:id',
		toggleFavorite: '/services/:id/favorite',
		getFavorites: '/services/favorites'
	},
	ubigeo: {
		getAll: '/ubigeos'
	},
	request: {
		getAll: '/requests',
		getById: '/requests/:id',
		payCotization: '/requests/:id/pay-cotization',
		cotization: '/requests/cotization'
	}
};
