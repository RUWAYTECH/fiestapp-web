import { BackButton } from '@/components/custom/back-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center flex-1 text-center px-4">
			<img src="/404.png" alt="404 Not Found" className="max-h-96 max-w-full" />
			<h1 className="text-3xl font-bold mt-4">Página No Encontrada</h1>
			<p className="text-muted-foreground mt-2">
				Lo sentimos, la página a la que quieres ir no está disponible actualmente.
			</p>
			<div className="flex gap-2 mt-6">
				<Button asChild>
					<Link href="/">Página principal</Link>
				</Button>
				<BackButton />
			</div>
		</div>
	);
};

export default NotFoundPage;
