interface FriendRequest {
    friendRequestId: number
    senderUserId: number
    receiverUserId: number
    status: number
    createdAt: string
}

export const useFriends = async () => {
    const api = useApi()

    const { data: friends, pending: friendsPending, error: friendsError, refresh: refreshFriends } =
        await useAsyncData<FriendRequest[]>('friends', () => api('/friends'))

    const { data: incomingRequests, pending: incomingPending, error: incomingError, refresh: refreshIncoming } =
        await useAsyncData<FriendRequest[]>('incoming-friend-requests', () => api('/friends/incoming'))

    const { data: outgoingRequests, pending: outgoingPending, error: outgoingError, refresh: refreshOutgoing } =
        await useAsyncData<FriendRequest[]>('outgoing-friend-requests', () => api('/friends/outgoing'))

    async function refreshAll() {
        await refreshFriends()
        await refreshIncoming()
        await refreshOutgoing()
    }

    async function sendFriendRequest(receiverUserId: number) {
        await api(`/friends/request/${receiverUserId}`, {
            method: 'POST',
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