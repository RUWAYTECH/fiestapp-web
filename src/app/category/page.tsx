import CategorySearch from './components/category-search'
import AppLayout from '@components/containers/layout/layout'
import CategoryCard from './components/category-card'


const CategoryPage = async () => {
	const categories = [
		{ id: 1, title: 'Salón de Fiestas', description: 'Espacios para eventos.', image: 'https://cdn0.matrimonio.com.pe/vendor/8263/3_2/640/jpg/4_11_108263-157332288041700.jpeg', count: 25, rating: 3, priceMin: 500,priceMax:1500, address: 'Av. Central 123, Ciudad' },
		{ id: 2, title: 'Jardines', description: 'Lugares al aire libre.', image: 'https://cdn0.matrimonio.com.pe/vendor/8263/3_2/640/jpg/espaciosalon_11_108263.jpeg', count: 18, rating: 4, priceMin: 400, priceMax:1500, address: 'Calle Flores 45, Ciudad' },
		{ id: 3, title: 'Salas de Conferencias', description: 'Eventos empresariales.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM5Ugu6vTKJmrR6iL7HFRkNb6_-M2Ym-qLTQ&s', count: 12, rating: 3, priceMin: 600, priceMax:1500, address: 'Centro Ejecutivo 98, Ciudad' },
		{ id: 4, title: 'Fiestas Infantiles', description: 'Lugares para fiestas de niños.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxv7exBzYw9twJQyWWwwoU_p7YC-b_-Mjktw&s', count: 30, rating: 5, priceMin: 350, priceMax:1500, address: 'Plaza Niños Felices 22, Ciudad' },
		{ id: 5, title: 'Bodas', description: 'Lugares exclusivos para bodas.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 22, rating: 5, priceMin: 1200, priceMax:1500, address: 'Camino del Amor 14, Ciudad' },
		{ id: 6, title: 'Reuniones Corporativas', description: 'Espacios para conferencias de trabajo.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 15, rating: 4, priceMin: 550, priceMax:1500, address: 'Torre Ejecutiva 56, Ciudad' },
		{ id: 7, title: 'Centros de Convenciones', description: 'Lugares grandes para eventos masivos.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 10, rating: 4, priceMin: 1500, priceMax:1500, address: 'Av. Eventos 99, Ciudad' },
		{ id: 8, title: 'Hoteles', description: 'Hoteles con espacios para eventos.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 20, rating: 3, priceMin: 1500, priceMax:1500, address: 'Paseo Hotelero 77, Ciudad' },
		{ id: 9, title: 'Teatros', description: 'Espacios para obras y presentaciones.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 8, rating: 3, priceMin: 450, priceMax:1500, address: 'Boulevard Artístico 12, Ciudad' },
		{ id: 10, title: 'Clubes Nocturnos', description: 'Lugares para eventos nocturnos y fiestas.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 17, rating: 5, priceMin: 900, priceMax:1500, address: 'Zona de Fiesta 32, Ciudad' },
		{ id: 11, title: 'Restaurantes', description: 'Restaurantes con ambientes para eventos.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 14, rating: 4, priceMin: 700, priceMax:1500, address: 'Gastronómica 21, Ciudad' },
		{ id: 12, title: 'Espacios al Aire Libre', description: 'Áreas abiertas para eventos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 26, rating: 5, priceMin: 500, priceMax:1500, address: 'Parque Verde 5, Ciudad' },
		{ id: 13, title: 'Fincas y Granjas', description: 'Lugares rurales para eventos especiales.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 11, rating: 4, priceMin: 650, priceMax:1500, address: 'Ruta Campestre 88, Ciudad' },
		{ id: 14, title: 'Cines', description: 'Salas para eventos y proyecciones.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 9, rating: 3, priceMin: 400, priceMax:1500, address: 'Calle del Cine 3, Ciudad' },
		{ id: 15, title: 'Museos', description: 'Espacios culturales para eventos.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 6, rating: 4, priceMin: 550, priceMax:1500, address: 'Avenida Cultural 19, Ciudad' },
		{ id: 16, title: 'Lugares Históricos', description: 'Lugares con historia para eventos especiales.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 7, rating: 5, priceMin: 700, priceMax:1500, address: 'Casco Antiguo 15, Ciudad' },
		{ id: 17, title: 'Playas', description: 'Espacios en la playa para eventos únicos.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 13, rating: 4, priceMin: 1000, priceMax:1500, address: 'Playa Dorada 55, Ciudad' },
		{ id: 18, title: 'Salones de Eventos', description: 'Salones versátiles para todo tipo de eventos.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 29, rating: 5, priceMin: 750, priceMax:1500, address: 'Centro de Eventos 33, Ciudad' },
		{ id: 19, title: 'Cúpulas', description: 'Espacios modernos para eventos innovadores.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 18, rating: 3, priceMin: 850, priceMax:1500, address: 'Distrito Creativo 7, Ciudad' },
		{ id: 20, title: 'Cafeterías', description: 'Lugares acogedores para pequeños eventos.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSxG333tw1OZ5I1OcUsGo8092LtdSxoN_Iw&s', count: 21, rating: 4, priceMin: 300, priceMax:1500, address: 'Calle del Café 1, Ciudad' },
	]

	return (
		<AppLayout>
			<div className='container mx-auto p-4'>
				<CategorySearch />
				<CategoryCard categories={categories} />
			</div>
		</AppLayout>
	)
}
export default CategoryPage