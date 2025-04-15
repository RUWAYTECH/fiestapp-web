export const endpoints = {
	auth: {
		login: '/auth/login',
		register: '/auth/local/register'
	},
	category:{
		getAllCategory: '/categories?populate=*',
		createCategory: '/categories/create',
		updateCategory: '/categories/update',
		deleteCategory: '/categories/delete',
		getCategoryById: '/categories/:id',
		lastcategory: '/categories?sort=createdAt:desc&sort=score:desc&pagination[page]=1&pagination[pageSize]=6&populate=*',
	},
	service:{
		getAllService: '/services?populate=*',
		createService: '/services/create',
		updateService: '/services/update',
		deleteService: '/services/delete',
		getServiceById: '/services/:id?populate=*',
		getServiceByUserId: '/services?filters[documentId][$ne]=:serviceDocumentId&filters[provider][documentId][$eq]=:documentId&populate=*',
		getServiceCategoryById: '/services?filters[category][id][$eq]=:id&populate=*',
		getAllUbigeoServicesByUbigeo: '/ubigeo-services?filters[ubigeo][id][$in]=:idUbigeo&populate=*',
		lastService: '/services?sort=createdAt:desc&sort=score:desc&pagination[page]=1&pagination[pageSize]=6&populate=*',
	},
	ubigeo:{
		getAllUbigeo: '/ubigeos?populate=*',
		searchUbigeo: '/ubigeos?filters[$or][0][department][$containsi]=:search&filters[$or][1][province][$containsi]=:search&filters[$or][2][district][$containsi]=:search&populate=*',
	},
	favorite:{
		addFavorite: '/favorites',
		allFavorite: '/favorites?populate=*',
		getFavoriteByserviceId: '/favorites?filters[userId][$eq]=:userId&filters[service][$eq]=:serviceId&populate=*',
		deleteFavorite: '/favorites/:favoriteId',
	},
	request: {
		createRequest: '/request-services/custom-create'
	}
}