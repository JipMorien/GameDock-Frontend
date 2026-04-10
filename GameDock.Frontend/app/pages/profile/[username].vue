<script setup lang="ts">
const route = useRoute()
const username = route.params.username as string

definePageMeta({
  title: 'User Profile',
})

// Simulated user profile data - FR-08.1 (would come from your .NET backend)
// In production: const { data: user } = await useFetch(`/api/users/${username}`)
const user = ref({
  username: username,
  avatar: '/placeholder-user.jpg',
  level: 18,
  memberSince: 'January 2024',
  totalGamesPlayed: 215,
  totalWins: 98,
  winRate: 45.6,
  highScore: 19500,
  rank: 342,
})

// Forum posts - FR-08.1
const forumPosts = ref([
  { id: 1, content: 'Great game today! GG everyone.', createdAt: '3 hours ago', likes: 5, comments: 2 },
  { id: 2, content: 'Anyone know how to unlock the secret character?', createdAt: '2 days ago', likes: 12, comments: 7 },
])

// Statistics - FR-08.1
const stats = ref({
  achievements: [
    { id: 1, name: 'First Blood', icon: 'i-lucide-trophy', unlocked: true },
    { id: 2, name: 'Streak Master', icon: 'i-lucide-flame', unlocked: true },
    { id: 3, name: 'Century', icon: 'i-lucide-gamepad-2', unlocked: false },
  ],
})

const activeTab = ref('stats')
const isFriend = ref(false)
const requestSent = ref(false)

function sendFriendRequest() {
  // Simulate API call: await $fetch(`/api/friends/request/${username}`, { method: 'POST' })
  requestSent.value = true
}
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <!-- Profile Header -->
      <div class="game-container rounded-lg p-6 mb-8">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <!-- Avatar -->
          <div class="relative">
            <UAvatar
              :src="user.avatar"
              :alt="user.username"
              size="3xl"
              class="ring-4 ring-[var(--arcade-neon-cyan)]"
            />
            <div class="absolute -bottom-2 -right-2 bg-[var(--arcade-neon-pink)] rounded-full px-3 py-1">
              <span class="font-pixel text-xs text-white">LVL {{ user.level }}</span>
            </div>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="font-pixel text-xl text-[var(--arcade-neon-cyan)] neon-text-cyan mb-2">
              {{ user.username }}
            </h1>
            <p class="font-retro text-lg text-muted mb-4">Member since {{ user.memberSince }}</p>

            <!-- Quick Stats Row -->
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <UBadge variant="subtle" size="lg" class="font-retro">
                <UIcon name="i-lucide-trophy" class="size-4 mr-1" />
                Rank #{{ user.rank }}
              </UBadge>
              <UBadge variant="subtle" size="lg" color="success" class="font-retro">
                <UIcon name="i-lucide-trending-up" class="size-4 mr-1" />
                {{ user.winRate }}% Win Rate
              </UBadge>
              <UBadge variant="subtle" size="lg" color="warning" class="font-retro">
                <UIcon name="i-lucide-star" class="size-4 mr-1" />
                {{ user.highScore.toLocaleString() }} High Score
              </UBadge>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-2">
            <UButton
              v-if="!isFriend && !requestSent"
              icon="i-lucide-user-plus"
              class="font-pixel text-xs bg-[var(--arcade-neon-pink)] hover:bg-[var(--arcade-neon-pink)]/80 text-white arcade-btn"
              @click="sendFriendRequest"
            >
              ADD FRIEND
            </UButton>
            <UButton
              v-else-if="requestSent"
              icon="i-lucide-clock"
              variant="outline"
              class="font-pixel text-xs"
              disabled
            >
              REQUEST SENT
            </UButton>
            <UButton
              v-else
              icon="i-lucide-check"
              variant="outline"
              class="font-pixel text-xs text-[var(--arcade-neon-cyan)]"
            >
              FRIENDS
            </UButton>
            <UButton
              icon="i-lucide-gamepad-2"
              variant="ghost"
              class="font-pixel text-xs"
            >
              CHALLENGE
            </UButton>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-gamepad-2" class="size-8 text-[var(--arcade-neon-pink)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">GAMES PLAYED</p>
          <p class="font-retro text-3xl text-white">{{ user.totalGamesPlayed }}</p>
        </div>
        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-trophy" class="size-8 text-[var(--arcade-neon-cyan)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">TOTAL WINS</p>
          <p class="font-retro text-3xl text-white">{{ user.totalWins }}</p>
        </div>
        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-star" class="size-8 text-[var(--arcade-neon-yellow)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">HIGH SCORE</p>
          <p class="font-retro text-3xl text-white">{{ user.highScore.toLocaleString() }}</p>
        </div>
        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-medal" class="size-8 text-[var(--arcade-neon-pink)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">GLOBAL RANK</p>
          <p class="font-retro text-3xl text-white">#{{ user.rank }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="game-container rounded-lg p-6">
        <div class="flex gap-4 mb-6 border-b border-[var(--arcade-neon-cyan)]/10 pb-4">
          <UButton
            :variant="activeTab === 'stats' ? 'solid' : 'ghost'"
            :class="activeTab === 'stats' ? 'bg-[var(--arcade-neon-pink)] text-white' : ''"
            class="font-pixel text-xs"
            @click="activeTab = 'stats'"
          >
            STATISTICS
          </UButton>
          <UButton
            :variant="activeTab === 'posts' ? 'solid' : 'ghost'"
            :class="activeTab === 'posts' ? 'bg-[var(--arcade-neon-cyan)] text-black' : ''"
            class="font-pixel text-xs"
            @click="activeTab = 'posts'"
          >
            FORUM POSTS
          </UButton>
        </div>

        <!-- Statistics Tab -->
        <div v-if="activeTab === 'stats'">
          <h3 class="font-pixel text-sm text-muted mb-4">ACHIEVEMENTS</h3>
          <div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
            <div
              v-for="achievement in stats.achievements"
              :key="achievement.id"
              :class="[
                'p-4 rounded-lg text-center transition-all',
                achievement.unlocked
                  ? 'bg-[var(--arcade-neon-cyan)]/10 border border-[var(--arcade-neon-cyan)]/30'
                  : 'bg-gray-800/50 border border-gray-700 opacity-50'
              ]"
            >
              <UIcon
                :name="achievement.icon"
                :class="[
                  'size-8 mx-auto mb-2',
                  achievement.unlocked ? 'text-[var(--arcade-neon-cyan)]' : 'text-gray-500'
                ]"
              />
              <p class="font-pixel text-xs text-white">{{ achievement.name }}</p>
            </div>
          </div>
        </div>

        <!-- Forum Posts Tab -->
        <div v-if="activeTab === 'posts'">
          <div class="space-y-4">
            <div
              v-for="post in forumPosts"
              :key="post.id"
              class="p-4 rounded-lg bg-black/30 border border-[var(--arcade-neon-cyan)]/10"
            >
              <p class="font-retro text-lg text-white mb-3">{{ post.content }}</p>
              <div class="flex items-center gap-4 text-muted">
                <span class="font-retro text-sm">{{ post.createdAt }}</span>
                <span class="flex items-center gap-1 font-retro text-sm">
                  <UIcon name="i-lucide-heart" class="size-4" />
                  {{ post.likes }}
                </span>
                <span class="flex items-center gap-1 font-retro text-sm">
                  <UIcon name="i-lucide-message-circle" class="size-4" />
                  {{ post.comments }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
