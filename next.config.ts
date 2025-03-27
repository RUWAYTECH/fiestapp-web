import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		domains: [
			'cdn0.matrimonio.com.pe',
			'encrypted-tbn0.gstatic.com',
			'encrypted-tbn0.gstatic.com'
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'hatcdn.com',
			},
		],
	},
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)