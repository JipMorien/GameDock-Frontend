<script setup lang="ts">
definePageMeta({
  title: 'Friends',
})

const {
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
} = useFriends()
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="font-pixel text-2xl text-[var(--arcade-neon-pink)] neon-text-pink mb-2">FRIENDS</h1>
        <p class="font-retro text-xl text-muted">Connect with other players</p>
      </div>

      <!-- Search and Add -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
        <UInput
          v-model="searchQuery"
          placeholder="Search friends..."
          icon="i-lucide-search"
          class="flex-1 font-retro"
        />
        <UButton
          icon="i-lucide-user-plus"
          class="font-retro bg-[var(--arcade-neon-pink)] hover:bg-[var(--arcade-neon-pink)]/80 text-white arcade-btn"
        >
          Add Friend
        </UButton>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center mb-8">
        <div class="inline-flex rounded-lg p-1 bg-black/30 border border-[var(--arcade-neon-cyan)]/20">
          <UButton
            :variant="activeTab === 'friends' ? 'solid' : 'ghost'"
            :class="[
              'font-retro',
              activeTab === 'friends' ? 'bg-[var(--arcade-neon-cyan)] text-black' : ''
            ]"
            @click="activeTab = 'friends'"
          >
            Friends ({{ friends.length }})
          </UButton>
          <UButton
            :variant="activeTab === 'requests' ? 'solid' : 'ghost'"
            :class="[
              'font-retro',
              activeTab === 'requests' ? 'bg-[var(--arcade-neon-pink)] text-white' : ''
            ]"
            @click="activeTab = 'requests'"
          >
            Requests ({{ pendingRequests.length }})
          </UButton>
        </div>
      </div>

      <!-- Friends List -->
      <div v-if="activeTab === 'friends'" class="max-w-2xl mx-auto space-y-6">
        <!-- Online Friends -->
        <div v-if="onlineFriends.length > 0">
          <h2 class="font-pixel text-xs text-green-500 mb-4">ONLINE - {{ onlineFriends.length }}</h2>
          <div class="space-y-2">
            <div
              v-for="friend in onlineFriends"
              :key="friend.id"
              class="game-container rounded-lg p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-4">
                <div class="relative">
                  <UAvatar :src="friend.avatar" :alt="friend.username" size="md" />
                  <div :class="['absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--arcade-dark)]', getStatusColor(friend.status)]" />
                </div>
                <div>
                  <p class="font-retro text-lg text-white">{{ friend.username }}</p>
                  <p class="font-retro text-sm text-green-400">{{ friend.lastSeen }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <UBadge variant="subtle" class="font-pixel text-xs">LVL {{ friend.level }}</UBadge>
                <UButton
                  icon="i-lucide-swords"
                  variant="ghost"
                  size="sm"
                  class="text-[var(--arcade-neon-pink)]"
                />
                <UButton
                  icon="i-lucide-message-circle"
                  variant="ghost"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Offline Friends -->
        <div v-if="offlineFriends.length > 0">
          <h2 class="font-pixel text-xs text-muted mb-4">OFFLINE - {{ offlineFriends.length }}</h2>
          <div class="space-y-2">
            <div
              v-for="friend in offlineFriends"
              :key="friend.id"
              class="game-container rounded-lg p-4 flex items-center justify-between opacity-60"
            >
              <div class="flex items-center gap-4">
                <div class="relative">
                  <UAvatar :src="friend.avatar" :alt="friend.username" size="md" />
                  <div :class="['absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--arcade-dark)]', getStatusColor(friend.status)]" />
                </div>
                <div>
                  <p class="font-retro text-lg text-white">{{ friend.username }}</p>
                  <p class="font-retro text-sm text-muted">{{ friend.lastSeen }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <UBadge variant="subtle" class="font-pixel text-xs">LVL {{ friend.level }}</UBadge>
                <UButton
                  icon="i-lucide-message-circle"
                  variant="ghost"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <UEmpty
          v-if="filteredFriends.length === 0"
          icon="i-lucide-users"
          title="No friends found"
          description="Try adjusting your search or add new friends"
          class="py-12"
        />
      </div>

      <!-- Friend Requests -->
      <div v-if="activeTab === 'requests'" class="max-w-2xl mx-auto">
        <div v-if="pendingRequests.length > 0" class="space-y-2">
          <div
            v-for="request in pendingRequests"
            :key="request.id"
            class="game-container rounded-lg p-4 flex items-center justify-between"
          >
            <div class="flex items-center gap-4">
              <UAvatar :src="request.avatar" :alt="request.username" size="md" />
              <div>
                <p class="font-retro text-lg text-white">{{ request.username }}</p>
                <p class="font-retro text-sm text-muted">Level {{ request.level }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UButton
                icon="i-lucide-check"
                color="success"
                variant="soft"
                size="sm"
                @click="acceptRequest(request.id)"
              />
              <UButton
                icon="i-lucide-x"
                color="error"
                variant="soft"
                size="sm"
                @click="declineRequest(request.id)"
              />
            </div>
          </div>
        </div>

        <UEmpty
          v-else
          icon="i-lucide-inbox"
          title="No pending requests"
          description="When someone sends you a friend request, it will appear here"
          class="py-12"
        />
      </div>
    </UContainer>
  </div>
</template>
