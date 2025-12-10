'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function ConfettiEffect() {
	useEffect(() => {
		const duration = 3000;
		const end = Date.now() + duration;

		const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

		const frame = () => {
			confetti({
				particleCount: 3,
				angle: 60,
				spread: 55,
				origin: { x: 0, y: 0 },
				colors: colors
			});

			confetti({
				particleCount: 3,
				angle: 120,
				spread: 55,
				origin: { x: 1, y: 0 },
				colors: colors
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		};

		frame();
	}, []);

	return null;
}
