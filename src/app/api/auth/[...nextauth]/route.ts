import { NextRequest } from 'next/server'

// Temporary edge-compatible auth stub for Cloudflare Pages deployment
// This is a minimal placeholder - authentication functionality is disabled
async function GET(request: NextRequest) {
	const { pathname } = new URL(request.url)

	// Basic stub responses for NextAuth endpoints
	if (pathname.includes('/session')) {
		return new Response(JSON.stringify({ user: null, expires: '' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	if (pathname.includes('/csrf')) {
		return new Response(JSON.stringify({ csrfToken: 'stub-token' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	if (pathname.includes('/providers')) {
		return new Response(JSON.stringify({}), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	// Default response
	return new Response('Auth temporarily disabled', { status: 501 })
}

async function POST() {
	// Stub for auth operations
	return new Response(JSON.stringify({ error: 'Authentication temporarily disabled for Cloudflare Pages deployment' }), {
		status: 501,
		headers: { 'Content-Type': 'application/json' }
	})
}

export { GET, POST }
export const runtime = 'edge'