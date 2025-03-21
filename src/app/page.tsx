'use client'
import AppLayout from '@components/containers/layout/layout'
import { Button } from '@components/ui/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Home() {
	const t = useTranslations()

	return (
		<AppLayout>
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
					<Image
						className="dark:invert"
						src="/next.svg"
						alt="Next.js logo"
						width={180}
						height={38}
						priority
					/>
					<h1 className="text-2xl sm:text-4xl font-bold text-center sm:text-left">
						{t('welcome')}
					</h1>
					<ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
						<li className="mb-2 tracking-[-.01em]">
							Get started by editing{' '}
							<code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
								src/app/page.tsx
							</code>
							.
						</li>
						<li className="tracking-[-.01em]">
							Save and see your changes instantly.
						</li>
					</ol>

					<div className="flex gap-4 items-center flex-col sm:flex-row">
						<Button>Click me</Button>
						<Button variant="ghost">Click me</Button>
					</div>
				</main>
			</div>
		</AppLayout>
	)
}