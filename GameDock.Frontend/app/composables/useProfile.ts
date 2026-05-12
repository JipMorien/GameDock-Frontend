interface BackendProfile {
    profileId: number
    userName: string
    userId: number
    bio: string
    avatarId: number
    createdAt: string
}

export const useProfile = (userId?: number) => {
    const api = useApi()

    const profile = ref<BackendProfile | null>(null)
    const pending = ref(false)
    const error = ref(false)

    const user = computed(() => ({
        userId: profile.value?.userId,
        username: profile.value?.userName ?? 'Unknown Player',
        avatar: `/avatars/avatar-${profile.value?.avatarId ?? 1}.png`,
        bio: profile.value?.bio ?? '',
        memberSince: profile.value?.createdAt ?? '',
        level: 23,
        xp: 7850,
        xpToNextLevel: 10000,
        totalGamesPlayed: 342,
        totalWins: 186,
        winRate: 54.4,
        highScore: 28750,
        rank: 156,
    }))

    async function loadProfile() {
        pending.value = true
        error.value = false

        try {
            profile.value = userId
                ? await api<BackendProfile>(`/profiles/user/${userId}`)
                : await api<BackendProfile>('/profiles/me')
        } catch {
            error.value = true
            profile.value = null
        } finally {
            pending.value = false
        }
    }

    const xpProgress = computed(() => {
        return (user.value.xp / user.value.xpToNextLevel) * 100
    })

    onMounted(loadProfile)

    return {
        profile,
        user,
        pending,
        error,
        xpProgress,
        loadProfile,
    }
}