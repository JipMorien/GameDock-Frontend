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
    friendRequestId: number
    senderUserId: number
    senderUserName: string
    receiverUserId: number
    receiverUserName: string
    status: number | string
    createdAt: string
}