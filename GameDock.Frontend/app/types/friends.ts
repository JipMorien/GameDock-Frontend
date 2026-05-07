export type FriendStatus = 'online' | 'away' | 'offline'

export interface Friend {
    id: number
    username: string
    status: FriendStatus
    lastSeen: string
    avatar: string
    level: number
}

export interface FriendRequest {
    id: number
    username: string
    avatar: string
    level: number
}