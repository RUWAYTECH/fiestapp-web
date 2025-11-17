import { User } from '@/types'
import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthStore {
	token: string
	user: User | null
	isAuthenticated: () => boolean
	setUser: (user: User) => void
	setToken: (token: string) => void
	setAuth: (user: User, token: string) => void
	resetAuth: () => void
}

export const useAuthStore = create<AuthStore>()(persist((set, get) => {
	return {
		token: '',
		user: null,
		isAuthenticated: () => {
			const user = get().user
			const token = get().token

			if (!user || !token) {
				return false
			}

			const decodedToken = jwtDecode(token)

			if (!decodedToken.exp) return false

			const curentTime = Math.floor(Date.now() / 1000)
			const tokenExpirationTime = decodedToken.exp

			if (curentTime >= tokenExpirationTime) return false

			return true
		},
		setUser: (user) => set({ user }),
		setToken: (token) => set({ token }),
		setAuth: (user, token) => {
			set({ user, token })
		},
		resetAuth: () => set({ token: '', user: null })
	}
}, {
	name: 'auth',
	storage: createJSONStorage(() => localStorage)
}))