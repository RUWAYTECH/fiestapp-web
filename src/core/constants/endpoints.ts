export const endpoints = {
	auth: {
		login: '/auth/login',
		register: '/auth/register'
	},
	category:{
		getAllCategory: '/category/all',
		createCategory: '/category/create',
		updateCategory: '/category/update',
		deleteCategory: '/category/delete',
		getCategoryById: '/category/id'
	},
	service:{
		getAllService: '/service/all',
		createService: '/service/create',
		updateService: '/service/update',
		deleteService: '/service/delete',
		getServiceById: '/service/id'
	}
}