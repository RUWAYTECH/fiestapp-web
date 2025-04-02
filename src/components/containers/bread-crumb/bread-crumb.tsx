'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@components/ui/breadCrumb'

interface BreadCrumbProps {
	inicio: string
	secondLink: string
	currentPage: string
}
export default function BreadcrumbNavigation({ inicio, secondLink, currentPage }: BreadCrumbProps) {

	return (
		<>
			<div className="flex flex-wrap items-center">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">{inicio}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href='/service'>{secondLink}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{currentPage}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</>
	)
}