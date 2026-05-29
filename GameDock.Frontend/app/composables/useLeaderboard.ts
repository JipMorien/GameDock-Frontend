import type { LeaderboardPlayer } from '~/types/leaderboard'
import {useApi} from "~/composables/useApi";

interface BackendLeaderboard {
    leaderboardId: number
    name: string
    userId: number
}

export const useLeaderboard = async () => {
    const api = useApi()

    const { data, pending, error } = await useAsyncData(
        'leaderboards',
        () => api<BackendLeaderboard[]>('/leaderboards')
    )

    const leaderboard = computed<LeaderboardPlayer[]>(() => {
        return (data.value ?? []).map((item, index) => ({
            rank: index + 1,
            username: item.name,
            score: 0,
            games: 0,
            winRate: 0,
            avatar: '/placeholder-user.jpg'
        }))
    })

    const currentUserRank = ref<LeaderboardPlayer>({
        rank: 156,
        username: 'PixelMaster99',
        score: 28750,
        games: 342,
        winRate: 54.4,
        avatar: '/placeholder-user.jpg'
    })

    return {
        leaderboard,
        currentUserRank,
        pending,
        error
    }
}