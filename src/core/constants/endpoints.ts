export const endpoints = {
	auth: {
		login: '/auth/login',
		register: '/auth/register'
	},
	category:{
		getAllCategory: '/categories?populate=*',
		createCategory: '/categories/create',
		updateCategory: '/categories/update',
		deleteCategory: '/categories/delete',
		getCategoryById: '/categories/:id'
	},
	service:{
		getAllService: '/services?populate=*',
		createService: '/services/create',
		updateService: '/services/update',
		deleteService: '/services/delete',
		getServiceById: '/services/:id?populate=*',
		getServiceByUserId: '/services?filters[documentId][$ne]=:serviceDocumentId&filters[provider][documentId][$eq]=:documentId&populate=*'
	}
}