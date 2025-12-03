'use client';

import { Image } from '@/components/custom/image';
import { useState } from 'react';

interface ProductImageCarouselProps {
	images: string[];
}

export function ServiceGallery({ images }: ProductImageCarouselProps) {
	const [currentImage, setCCurrentImage] = useState<string>(images[0] || '');

	if (images.length === 0) {
		return <div>No se han proporcionado imágenes.</div>;
	}

	return (
		<>
			<figure className="mb-4 relative">
				<Image
					src={currentImage}
					alt="Imagen del servicio"
					className="max-h-96 aspect-square object-contain object-center w-full"
				/>
			</figure>
			<div className="flex items-center justify-center gap-4">
				{images.map((img, idx) => (
					<button
						key={idx}
						onClick={() => setCCurrentImage(img)}
						className={`border rounded p-1 ${currentImage === img ? 'border-primary' : ''}`}
					>
						<Image src={img} alt={`Thumbnail ${idx}`} className="size-16 object-contain object-center" />
					</button>
				))}
			</div>
		</>
	);
}
