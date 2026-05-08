export const useApi = () => {
    const config = useRuntimeConfig()

    return $fetch.create({
        baseURL: config.public.apiBase as string,
        onRequest({ options }) {
            const token = import.meta.client
                ? localStorage.getItem('token')
                : null

            if (token) {
                const headers = new Headers(options.headers)

                headers.set('Authorization', `Bearer ${token}`)

                options.headers = headers
            }
        }
    })
}