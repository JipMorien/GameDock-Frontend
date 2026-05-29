<script setup lang="ts">
definePageMeta({
  title: 'Friends',
})

interface FriendRequest {
  senderUserId: number
  senderUserName: string
  receiverUserId: number
  receiverUserName: string
}

const {
  friends,
  incomingRequests,
  outgoingRequests,
  friendsPending,
  incomingPending,
  outgoingPending,
  friendsError,
  incomingError,
  outgoingError,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriendRequest,
} = useFriends()

const { user: authUser } = useAuth()

const activeTab = ref('friends')
const receiverUserName = ref('')

function getOtherUserName(friend: FriendRequest) {
  return friend.senderUserId === authUser.value?.gameDockUserId
      ? friend.receiverUserName
      : friend.senderUserName
}

function getOtherUserId(friend: FriendRequest) {
  return friend.senderUserId === authUser.value?.gameDockUserId
      ? friend.receiverUserId
      : friend.senderUserId
}

async function onSendFriendRequest() {
  if (!receiverUserName.value.trim()) return

  await sendFriendRequest(receiverUserName.value.trim())
  receiverUserName.value = ''
}
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <div class="text-center mb-8">
        <h1 class="font-pixel text-2xl text-[var(--arcade-neon-pink)] neon-text-pink mb-2">
          FRIENDS
        </h1>

        <p class="font-retro text-xl text-muted">
          Connect with other players
        </p>
      </div>

      <div class="game-container rounded-lg p-6 max-w-2xl mx-auto mb-8">
        <h2 class="font-pixel text-xs text-[var(--arcade-neon-cyan)] mb-4">
          ADD FRIEND BY USERNAME
        </h2>

        <div class="flex gap-3">
          <UInput
              v-model="receiverUserName"
              type="text"
              placeholder="Enter username"
              class="flex-1 font-retro"
              @keyup.enter="onSendFriendRequest"
          />

          <UButton
              icon="i-lucide-user-plus"
              class="font-retro bg-[var(--arcade-neon-pink)] hover:bg-[var(--arcade-neon-pink)]/80 text-white arcade-btn"
              @click="onSendFriendRequest"
          >
            Add Friend
          </UButton>
        </div>
      </div>

      <div class="flex justify-center mb-8">
        <div class="inline-flex rounded-lg p-1 bg-black/30 border border-[var(--arcade-neon-cyan)]/20">
          <UButton
              :variant="activeTab === 'friends' ? 'solid' : 'ghost'"
              :class="activeTab === 'friends' ? 'bg-[var(--arcade-neon-cyan)] text-black' : ''"
              class="font-retro"
              @click="activeTab = 'friends'"
          >
            Friends ({{ friends?.length ?? 0 }})
          </UButton>

          <UButton
              :variant="activeTab === 'incoming' ? 'solid' : 'ghost'"
              :class="activeTab === 'incoming' ? 'bg-[var(--arcade-neon-pink)] text-white' : ''"
              class="font-retro"
              @click="activeTab = 'incoming'"
          >
            Incoming ({{ incomingRequests?.length ?? 0 }})
          </UButton>

          <UButton
              :variant="activeTab === 'outgoing' ? 'solid' : 'ghost'"
              :class="activeTab === 'outgoing' ? 'bg-[var(--arcade-neon-yellow)] text-black' : ''"
              class="font-retro"
              @click="activeTab = 'outgoing'"
          >
            Outgoing ({{ outgoingRequests?.length ?? 0 }})
          </UButton>
        </div>
      </div>

      <div v-if="activeTab === 'friends'" class="max-w-2xl mx-auto">
        <div v-if="friendsPending" class="font-retro text-muted text-center">
          Loading friends...
        </div>

        <div v-else-if="friendsError" class="font-retro text-red-500 text-center">
          Could not load friends.
        </div>

        <div v-else-if="friends && friends.length > 0" class="space-y-3">
          <div
              v-for="friend in friends"
              :key="friend.friendRequestId"
              class="game-container rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <NuxtLink
                  :to="`/${getOtherUserId(friend)}`"
                  class="font-retro text-lg text-white hover:text-[var(--arcade-neon-cyan)] transition"
              >
                {{ getOtherUserName(friend) }}
              </NuxtLink>

              <p class="font-retro text-sm text-muted">
                Friends since {{ friend.createdAt }}
              </p>
            </div>

            <UButton
                icon="i-lucide-trash"
                color="error"
                variant="soft"
                size="sm"
                @click="deleteFriendRequest(friend.friendRequestId)"
            />
          </div>
        </div>

        <UEmpty
            v-else
            icon="i-lucide-users"
            title="No friends yet"
            description="Send a friend request to another player by username."
            class="py-12"
        />
      </div>

      <div v-if="activeTab === 'incoming'" class="max-w-2xl mx-auto">
        <div v-if="incomingPending" class="font-retro text-muted text-center">
          Loading incoming requests...
        </div>

        <div v-else-if="incomingError" class="font-retro text-red-500 text-center">
          Could not load incoming requests.
        </div>

        <div v-else-if="incomingRequests && incomingRequests.length > 0" class="space-y-3">
          <div
              v-for="request in incomingRequests"
              :key="request.friendRequestId"
              class="game-container rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <NuxtLink
                  :to="`/profile/${request.senderUserId}`"
                  class="font-retro text-lg text-white hover:text-[var(--arcade-neon-cyan)]"
              >
                Request from {{ request.senderUserName }}
              </NuxtLink>

              <p class="font-retro text-sm text-muted">
                Sent at {{ request.createdAt }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <UButton
                  icon="i-lucide-check"
                  color="success"
                  variant="soft"
                  size="sm"
                  @click="acceptFriendRequest(request.friendRequestId)"
              />

              <UButton
                  icon="i-lucide-x"
                  color="error"
                  variant="soft"
                  size="sm"
                  @click="rejectFriendRequest(request.friendRequestId)"
              />
            </div>
          </div>
        </div>

        <UEmpty
            v-else
            icon="i-lucide-inbox"
            title="No incoming requests"
            description="When someone sends you a friend request, it will appear here."
            class="py-12"
        />
      </div>

      <div v-if="activeTab === 'outgoing'" class="max-w-2xl mx-auto">
        <div v-if="outgoingPending" class="font-retro text-muted text-center">
          Loading outgoing requests...
        </div>

        <div v-else-if="outgoingError" class="font-retro text-red-500 text-center">
          Could not load outgoing requests.
        </div>

        <div v-else-if="outgoingRequests && outgoingRequests.length > 0" class="space-y-3">
          <div
              v-for="request in outgoingRequests"
              :key="request.friendRequestId"
              class="game-container rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <NuxtLink
                  :to="`/profile/${request.receiverUserId}`"
                  class="font-retro text-lg text-white hover:text-[var(--arcade-neon-cyan)]"
              >
                Request to {{ request.receiverUserName }}
              </NuxtLink>

              <p class="font-retro text-sm text-muted">
                Sent at {{ request.createdAt }}
              </p>
            </div>

            <UButton
                icon="i-lucide-trash"
                color="error"
                variant="soft"
                size="sm"
                @click="deleteFriendRequest(request.friendRequestId)"
            />
          </div>
        </div>

        <UEmpty
            v-else
            icon="i-lucide-send"
            title="No outgoing requests"
            description="Friend requests you send will appear here."
            class="py-12"
        />
      </div>
    </UContainer>
  </div>
</template>