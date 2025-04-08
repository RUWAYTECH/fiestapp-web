import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '3.83.141.94',
				port: '8082',
				pathname: '/uploads/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'http',
				hostname: 'hatcdn.com',
			},
		],
	},
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)