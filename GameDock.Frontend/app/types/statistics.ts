export interface PlayerStats {
    totalGames: number
    wins: number
    losses: number
    winRate: number
    totalScore: number
    averageScore: number
    highScore: number
    playTime: string
    currentStreak: number
    bestStreak: number
}

export interface GameHistoryItem {
    id: number
    date: string
    score: number
    result: 'win' | 'loss'
    opponent: string
    duration: string
}

export interface WeeklyPerformanceItem {
    day: string
    games: number
    wins: number
}