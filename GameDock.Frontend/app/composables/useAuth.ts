const API_BASE = 'http://localhost:5000/api'

type AuthResponse = {
    gameDockUserId: number
    userName: string
    email: string
    isAdmin: boolean
    token: string
}

export const useAuth = () => {
    const user = useState<AuthResponse | null>('auth-user', () => null)
    const token = useState<string | null>('auth-token', () => null)

    const login = async (email: string, password: string) => {
        const response = await $fetch<AuthResponse>(`${API_BASE}/auth/login`, {
            method: 'POST',
            body: { email, password }
        })

        user.value = response
        token.value = response.token

        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response))

        return response
    }

    const register = async (userName: string, email: string, password: string) => {
        const response = await $fetch<AuthResponse>(`${API_BASE}/auth/register`, {
            method: 'POST',
            body: { userName, email, password }
        })

        user.value = response
        token.value = response.token

        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response))

        return response
    }

    const logout = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return {
        user,
        token,
        login,
        register,
        logout
    }
}