'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationButtonProps {
	page: number;
	totalPages: number;
}

const PaginationButton = ({ page, totalPages }: PaginationButtonProps) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handlePrevious = () => {
		const params = new URLSearchParams(searchParams);
		params.set('page', String((page || 1) - 1));

		replace(`${pathname}?${params.toString()}`);
	};

	const handleNext = () => {
		const params = new URLSearchParams(searchParams);
		params.set('page', String((page || 1) + 1));

		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="flex items-center gap-2">
			<Button variant="outline" size="icon-sm" onClick={handlePrevious} disabled={page <= 1}>
				<ChevronLeft />
			</Button>
			<Button variant="outline" size="icon-sm" onClick={handleNext} disabled={page >= totalPages}>
				<ChevronRight />
			</Button>
		</div>
	);
};

export default PaginationButton;
