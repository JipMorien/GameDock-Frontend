export interface Achievement {
    id: number
    name: string
    description: string
    icon: string
    unlocked: boolean
}

export interface UserProfile {
    username: string
    email: string
    avatar: string
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