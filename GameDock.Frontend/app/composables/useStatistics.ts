interface BackendStatistic {
    statisticId: number
    userId: number
    statisticType: number
    value: number
    createdAt: string
}

export const useStatistics = async () => {
    const api = useApi()
    
    const {
        data,
        pending,
        error,
        refresh
    } = await useAsyncData(
        'statistics',
        () => api<BackendStatistic[]>('/statistics')
    )

    const statistics = computed(() => {
        if (!data.value) return []

        return data.value.map(stat => ({
            id: stat.statisticId,
            userId: stat.userId,
            type: stat.statisticType,
            value: stat.value,
            createdAt: stat.createdAt
        }))
    })

    const totalCoins = computed(() => {
        return statistics.value
            .filter(s => s.type === 1)
            .reduce((sum, stat) => sum + stat.value, 0)
    })

    const totalKills = computed(() => {
        return statistics.value
            .filter(s => s.type === 2)
            .reduce((sum, stat) => sum + stat.value, 0)
    })

    const totalDeaths = computed(() => {
        return statistics.value
            .filter(s => s.type === 3)
            .reduce((sum, stat) => sum + stat.value, 0)
    })

    const kdRatio = computed(() => {
        if (totalDeaths.value === 0) return totalKills.value
        return (totalKills.value / totalDeaths.value).toFixed(2)
    })

    async function addStatistic(
        statisticType: number,
        value: number
    ) {
        await api('/statistics', {
            method: 'POST',
            body: {
                statisticId: 0,
                userId: 1,
                statisticType,
                value,
                createdAt: new Date().toISOString()
            }
        })

        await refresh()
    }

    return {
        statistics,
        totalCoins,
        totalKills,
        totalDeaths,
        kdRatio,
        pending,
        error,
        addStatistic
    }
}