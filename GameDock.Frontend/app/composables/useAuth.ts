type AuthResponse = {
    gameDockUserId: number
    userName: string
    email: string
    isAdmin: boolean
    token: string
}

export const useAuth = () => {
    const config = useRuntimeConfig()
    const API_BASE = config.public.apiBase

    const user = useState<AuthResponse | null>('auth-user', () => null)
    const token = useState<string | null>('auth-token', () => null)

    if (import.meta.client && !user.value) {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')

        if (storedUser && storedToken) {
            user.value = JSON.parse(storedUser)
            token.value = storedToken
        }
    }

    const setAuth = (response: AuthResponse) => {
        user.value = response
        token.value = response.token

        if (import.meta.client) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response))
        }
    }

    const login = async (email: string, password: string) => {
        const response = await $fetch<AuthResponse>(`${API_BASE}/auth/login`, {
            method: 'POST',
            body: { email, password }
        })

        setAuth(response)

        return response
    }

    const register = async (userName: string, email: string, password: string) => {
        const response = await $fetch<AuthResponse>(`${API_BASE}/auth/register`, {
            method: 'POST',
            body: { userName, email, password }
        })

        setAuth(response)

        return response
    }

    const logout = () => {
        user.value = null
        token.value = null

        if (import.meta.client) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }

    return {
        user,
        token,
        login,
        register,
        logout
    }
}