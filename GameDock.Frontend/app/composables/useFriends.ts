import type { Friend, FriendRequest } from '~/types/friends'

export const useFriends = () => {
    const searchQuery = ref('')
    const activeTab = ref('friends')

    const friends = ref<Friend[]>([
        { id: 1, username: 'RetroKing', status: 'online', lastSeen: 'Playing now', avatar: '/placeholder-user.jpg', level: 45 },
        { id: 2, username: 'ArcadeQueen', status: 'online', lastSeen: 'In menu', avatar: '/placeholder-user.jpg', level: 38 },
        { id: 3, username: 'PixelWarrior', status: 'away', lastSeen: '5 min ago', avatar: '/placeholder-user.jpg', level: 32 },
        { id: 4, username: 'NeonNinja', status: 'offline', lastSeen: '2 hours ago', avatar: '/placeholder-user.jpg', level: 28 },
        { id: 5, username: 'GameMaster', status: 'offline', lastSeen: 'Yesterday', avatar: '/placeholder-user.jpg', level: 41 },
        { id: 6, username: 'VintageGamer', status: 'online', lastSeen: 'In lobby', avatar: '/placeholder-user.jpg', level: 22 },
    ])

    const pendingRequests = ref<FriendRequest[]>([
        { id: 7, username: 'CyberPunk', avatar: '/placeholder-user.jpg', level: 19 },
        { id: 8, username: 'RetroBlaster', avatar: '/placeholder-user.jpg', level: 25 },
    ])

    const filteredFriends = computed(() => {
        return friends.value.filter(friend =>
            friend.username.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    })

    const onlineFriends = computed(() => filteredFriends.value.filter(friend => friend.status === 'online'))
    const offlineFriends = computed(() => filteredFriends.value.filter(friend => friend.status !== 'online'))

    function getStatusColor(status: string) {
        switch (status) {
            case 'online':
                return 'bg-green-500'
            case 'away':
                return 'bg-yellow-500'
            default:
                return 'bg-gray-500'
        }
    }

    function acceptRequest(id: number) {
        const request = pendingRequests.value.find(request => request.id === id)

        if (!request) return

        friends.value.push({
            ...request,
            status: 'offline',
            lastSeen: 'Just added',
        })

        pendingRequests.value = pendingRequests.value.filter(request => request.id !== id)
    }

    function declineRequest(id: number) {
        pendingRequests.value = pendingRequests.value.filter(request => request.id !== id)
    }

    return {
        searchQuery,
        activeTab,
        friends,
        pendingRequests,
        filteredFriends,
        onlineFriends,
        offlineFriends,
        getStatusColor,
        acceptRequest,
        declineRequest,
    }
}