interface BackendProfile {
    profileId: number
    userName: string
    userId: number
}

export const useProfile = async () => {
    const api = useApi()

    const { data, pending, error } = await useAsyncData<BackendProfile[]>('profiles', () =>
        api('/profiles')
    )

    const user = computed(() => {
        const profile = data.value?.[0]

        return {
            username: profile?.userName ?? 'Unknown Player',
            email: 'player@arcade.com',
            avatar: '/placeholder-user.jpg',
            level: 23,
            xp: 7850,
            xpToNextLevel: 10000,
            memberSince: 'March 2024',
            totalGamesPlayed: 342,
            totalWins: 186,
            winRate: 54.4,
            highScore: 28750,
            rank: 156,
            achievements: [
                { id: 1, name: 'First Blood', description: 'Win your first game', icon: 'i-lucide-trophy', unlocked: true },
                { id: 2, name: 'Streak Master', description: 'Win 5 games in a row', icon: 'i-lucide-flame', unlocked: true },
                { id: 3, name: 'Century', description: 'Play 100 games', icon: 'i-lucide-gamepad-2', unlocked: true },
                { id: 4, name: 'High Roller', description: 'Score over 50,000 points', icon: 'i-lucide-star', unlocked: false },
                { id: 5, name: 'Legend', description: 'Reach top 10 on leaderboard', icon: 'i-lucide-crown', unlocked: false },
                { id: 6, name: 'Social Butterfly', description: 'Add 10 friends', icon: 'i-lucide-users', unlocked: true },
            ],
        }
    })

    const recentGames = ref([
        { id: 1, score: 12450, date: '2 hours ago', result: 'win', opponent: 'RetroKing' },
        { id: 2, score: 8200, date: '5 hours ago', result: 'loss', opponent: 'ArcadeQueen' },
        { id: 3, score: 15600, date: 'Yesterday', result: 'win', opponent: 'PixelWarrior' },
        { id: 4, score: 9800, date: 'Yesterday', result: 'win', opponent: 'NeonNinja' },
        { id: 5, score: 7100, date: '2 days ago', result: 'loss', opponent: 'GameMaster' },
    ])

    const forumPosts = ref([
        { id: 1, content: 'Just hit a new high score of 50,000! Anyone else grinding this weekend?', createdAt: '2 hours ago', likes: 15, comments: 3 },
        { id: 2, content: 'Pro tip: Focus on combo chains in the second stage. Game changer!', createdAt: 'Yesterday', likes: 42, comments: 8 },
        { id: 3, content: 'Looking for players to team up with. Drop a comment if interested!', createdAt: '3 days ago', likes: 8, comments: 5 },
    ])

    const activeTab = ref('achievements')

    const xpProgress = computed(() => {
        return (user.value.xp / user.value.xpToNextLevel) * 100
    })

    return {
        user,
        recentGames,
        forumPosts,
        activeTab,
        xpProgress,
        pending,
        error,
    }
}