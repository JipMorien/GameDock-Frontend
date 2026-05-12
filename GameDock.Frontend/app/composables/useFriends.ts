interface FriendRequest {
    friendRequestId: number
    senderUserId: number
    senderUserName: string
    receiverUserId: number
    receiverUserName: string
    status: number | string
    createdAt: string
}

export const useFriends = () => {
    const api = useApi()

    const friends = ref<FriendRequest[]>([])
    const incomingRequests = ref<FriendRequest[]>([])
    const outgoingRequests = ref<FriendRequest[]>([])

    const friendsPending = ref(false)
    const incomingPending = ref(false)
    const outgoingPending = ref(false)

    const friendsError = ref(false)
    const incomingError = ref(false)
    const outgoingError = ref(false)

    async function loadFriends() {
        friendsPending.value = true
        friendsError.value = false

        try {
            friends.value = await api<FriendRequest[]>('/friends')
        } catch {
            friendsError.value = true
        } finally {
            friendsPending.value = false
        }
    }

    async function loadIncoming() {
        incomingPending.value = true
        incomingError.value = false

        try {
            incomingRequests.value = await api<FriendRequest[]>('/friends/incoming')
        } catch {
            incomingError.value = true
        } finally {
            incomingPending.value = false
        }
    }

    async function loadOutgoing() {
        outgoingPending.value = true
        outgoingError.value = false

        try {
            outgoingRequests.value = await api<FriendRequest[]>('/friends/outgoing')
        } catch {
            outgoingError.value = true
        } finally {
            outgoingPending.value = false
        }
    }

    async function refreshAll() {
        await Promise.all([
            loadFriends(),
            loadIncoming(),
            loadOutgoing(),
        ])
    }

    async function sendFriendRequest(userName: string) {
        await api('/friends/request', {
            method: 'POST',
            body: { userName },
        })

        await refreshAll()
    }

    async function acceptFriendRequest(requestId: number) {
        await api(`/friends/accept/${requestId}`, {
            method: 'PUT',
        })

        await refreshAll()
    }

    async function rejectFriendRequest(requestId: number) {
        await api(`/friends/reject/${requestId}`, {
            method: 'PUT',
        })

        await refreshAll()
    }

    async function deleteFriendRequest(requestId: number) {
        await api(`/friends/${requestId}`, {
            method: 'DELETE',
        })

        await refreshAll()
    }

    onMounted(refreshAll)

    return {
        friends,
        incomingRequests,
        outgoingRequests,

        friendsPending,
        incomingPending,
        outgoingPending,

        friendsError,
        incomingError,
        outgoingError,

        refreshAll,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        deleteFriendRequest,
    }
}