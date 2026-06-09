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

        const apiBase = config.public.apiBase as string
        const hubBase = apiBase.replace(/\/api$/, '')
        const hubUrl = `${hubBase}/hubs/forum`

       
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, {
                accessTokenFactory: () => localStorage.getItem('token') ?? '',
            })
            .withAutomaticReconnect()
            .build()

        connection.on('PostCreated', (post: BackendPost) => {
           
            onPostCreated(post)
        })

        connection.onreconnected(() => {
         
        })

        connection.onclose((error) => {
          
        })

        await connection.start()


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