export interface Achievement {
    id: number
    name: string
    description: string
    icon: string
    unlocked: boolean
}

export interface BackendProfile {
    profileId: number
    userName: string
    userId: number
    bio: string
    avatarId: number
    createdAt: string
}

export interface UserProfile {
    username: string
    email: string
    avatar: string
    bio: string
    level: number
    xp: number
    xpToNextLevel: number
    memberSince: string
    totalGamesPlayed: number
    totalWins: number
    winRate: number
    highScore: number
    rank: number
    achievements: Achievement[]
}

export interface RecentGame {
    id: number
    score: number
    date: string
    result: 'win' | 'loss'
    opponent: string
}

export interface ProfileForumPost {
    id: number
    content: string
    createdAt: string
    likes: number
    comments: number
}