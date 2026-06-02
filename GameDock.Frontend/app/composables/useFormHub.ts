import type { HubConnection } from '@microsoft/signalr'

interface BackendPost {
    postId: number
    title: string
    content: string
    createdAt: string
    userId: number
}

export function useForumHub(
    onPostCreated: (post: BackendPost) => void,
) {
    const config = useRuntimeConfig()

    let connection: HubConnection | null = null

    async function connect() {
        if (!import.meta.client) return

        const signalR = await import('@microsoft/signalr')

        connection = new signalR.HubConnectionBuilder()
            .withUrl(`${config.public.apiBase}/hubs/forum`)
            .withAutomaticReconnect()
            .build()

        connection.on('PostCreated', (post: BackendPost) => {
            onPostCreated(post)
        })

        await connection.start()
        console.log('SignalR connected')
    }

    async function disconnect() {
        if (!import.meta.client) return
        if (!connection) return

        await connection.stop()
        connection = null
    }

    return {
        connect,
        disconnect,
    }
}