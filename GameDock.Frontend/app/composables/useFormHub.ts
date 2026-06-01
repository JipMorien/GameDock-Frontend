import * as signalR from '@microsoft/signalr'

export function useForumHub(
    onPostCreated: (post: any) => void,
) {
    const config = useRuntimeConfig()

    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${config.public.apiBase}/hubs/forum`)
        .withAutomaticReconnect()
        .build()

    connection.on('PostCreated', (post) => {
        onPostCreated(post)
    })

    async function connect() {
        await connection.start()
        console.log('SignalR connected')
    }

    async function disconnect() {
        await connection.stop()
    }

    return {
        connect,
        disconnect,
    }
}