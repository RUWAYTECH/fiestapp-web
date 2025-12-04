'use client';

import { CategoryCard } from '@/features/category/components/category-card';
import { CategoryResDto } from '@/features/category/dto/responses/category-res.dto';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

interface CategoryCarouselProps {
	categories: CategoryResDto[];
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
	if (categories.length === 0) {
		return null;
	}

	// Duplicate categories to ensure loop works (need at least 7 for 6 slidesPerView + 1)
	const minSlides = 8;
	let slides = [...categories];
	while (slides.length < minSlides) {
		slides = [...slides, ...categories];
	}

	return (
		<Swiper
			modules={[Autoplay]}
			spaceBetween={24}
			slidesPerView={2}
			loop={true}
			loopAdditionalSlides={2}
			autoplay={{
				delay: 0,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			}}
			speed={3000}
			breakpoints={{
				640: { slidesPerView: 3 },
				768: { slidesPerView: 4 },
				1024: { slidesPerView: 5 },
				1280: { slidesPerView: 6 }
			}}
			className="category-carousel"
		>
			{slides.map((item, index) => (
				<SwiperSlide key={`${item.id}-${index}`}>
					<Link href={`/services?cat=${item.id}`}>
						<CategoryCard data={item} />
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
