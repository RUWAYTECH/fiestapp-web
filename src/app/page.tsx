'use client'
import AppLayout from '@components/containers/layout/layout'
import { Card, CardContent } from '@components/ui/card'
import { Label } from '@radix-ui/react-label'
import { useTranslations } from 'next-intl'
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
	const t = useTranslations()
	const items = [
        { title: "Tarjeta 1", content: "Contenido de la tarjeta 1" },
        { title: "Tarjeta 2", content: "Contenido de la tarjeta 2" },
        { title: "Tarjeta 3", content: "Contenido de la tarjeta 3" },
        { title: "Tarjeta 4", content: "Contenido de la tarjeta 4" },
		{ title: "Tarjeta 5", content: "Contenido de la tarjeta 5" },
    ]

	return (
		<AppLayout>
			<div className="flex flex-col items-center justify-center pt-[5vw]">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
					Encuentra todo para tu fiesta en un solo lugar
				</h1>
				<br></br>
				<h2 className="scroll-m-20 pb-2 text-3xl first:mt-0 text-muted-foreground">
					Locales, decoración, tortas, animación y más para eventos inolvidables
				</h2>
				<br></br>
				<div className="mx-auto my-auto w-[30vw] ">
					<Textarea
						placeholder="Buscar servicios para tu fiesta"	
						className="resize-none"
					/>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center pt-[5vw]'>	
				<Card className="mx-auto my-auto w-[98vw] ">
					<CardContent>
						<div className="flex items-start">
							<Label htmlFor="terms">
								Categoría
							</Label>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
							{items.map((item, index) => (
								<Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
								<CardContent className="flex flex-col items-center justify-center text-center">
								<img
									src="https://concepto.de/wp-content/uploads/2020/12/imagen-personal-e1607991913973.jpg"
									alt="Profile"
									className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
								/>
									<p>{item.content}</p>
								</CardContent>
								</Card>
							))}	
						</div>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	)
}