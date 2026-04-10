<script setup lang="ts">
definePageMeta({
  title: 'Leaderboard',
})

const timeFilter = ref('all')
const timeOptions = [
  { label: 'All Time', value: 'all' },
  { label: 'This Week', value: 'week' },
  { label: 'Today', value: 'today' },
]

// Simulated leaderboard data (would come from your .NET backend)
const leaderboard = ref([
  { rank: 1, username: 'PixelKing', score: 98750, games: 523, winRate: 78.2, avatar: '/placeholder-user.jpg' },
  { rank: 2, username: 'ArcadeQueen', score: 87200, games: 412, winRate: 72.5, avatar: '/placeholder-user.jpg' },
  { rank: 3, username: 'RetroMaster', score: 82100, games: 389, winRate: 69.8, avatar: '/placeholder-user.jpg' },
  { rank: 4, username: 'NeonWarrior', score: 76500, games: 356, winRate: 67.1, avatar: '/placeholder-user.jpg' },
  { rank: 5, username: 'GameLord', score: 71200, games: 298, winRate: 65.4, avatar: '/placeholder-user.jpg' },
  { rank: 6, username: 'PixelNinja', score: 68900, games: 276, winRate: 63.2, avatar: '/placeholder-user.jpg' },
  { rank: 7, username: 'CyberPunk', score: 65400, games: 254, winRate: 61.8, avatar: '/placeholder-user.jpg' },
  { rank: 8, username: 'VintageGamer', score: 62100, games: 231, winRate: 59.5, avatar: '/placeholder-user.jpg' },
  { rank: 9, username: 'RetroBlaster', score: 58700, games: 218, winRate: 57.3, avatar: '/placeholder-user.jpg' },
  { rank: 10, username: 'ArcadeHero', score: 55200, games: 195, winRate: 55.1, avatar: '/placeholder-user.jpg' },
])

// Current user's position (simulated)
const currentUserRank = ref({
  rank: 156,
  username: 'PixelMaster99',
  score: 28750,
  games: 342,
  winRate: 54.4,
  avatar: '/placeholder-user.jpg',
})

function getRankStyle(rank: number) {
  if (rank === 1) return 'text-[var(--arcade-neon-yellow)] neon-text-cyan'
  if (rank === 2) return 'text-gray-300'
  if (rank === 3) return 'text-amber-600'
  return 'text-muted'
}

function getRankIcon(rank: number) {
  if (rank === 1) return 'i-lucide-crown'
  if (rank === 2) return 'i-lucide-medal'
  if (rank === 3) return 'i-lucide-award'
  return null
}
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="font-pixel text-2xl text-[var(--arcade-neon-cyan)] neon-text-cyan mb-2">LEADERBOARD</h1>
        <p class="font-retro text-xl text-muted">Top players worldwide</p>
      </div>

      <!-- Filters -->
      <div class="flex justify-center mb-8">
        <div class="inline-flex rounded-lg p-1 bg-black/30 border border-[var(--arcade-neon-cyan)]/20">
          <UButton
            v-for="option in timeOptions"
            :key="option.value"
            :variant="timeFilter === option.value ? 'solid' : 'ghost'"
            :class="[
              'font-retro',
              timeFilter === option.value ? 'bg-[var(--arcade-neon-cyan)] text-black' : ''
            ]"
            @click="timeFilter = option.value"
          >
            {{ option.label }}
          </UButton>
        </div>
      </div>

      <!-- Top 3 Podium -->
      <div class="flex justify-center items-end gap-4 mb-8">
        <!-- 2nd Place -->
        <div class="text-center">
          <UAvatar
            :src="leaderboard[1].avatar"
            :alt="leaderboard[1].username"
            size="xl"
            class="ring-4 ring-gray-400 mb-2"
          />
          <p class="font-pixel text-xs text-gray-300 mb-1">{{ leaderboard[1].username }}</p>
          <div class="bg-gray-700 rounded-t-lg px-6 py-8">
            <p class="font-pixel text-2xl text-gray-300">2</p>
          </div>
        </div>
        
        <!-- 1st Place -->
        <div class="text-center">
          <div class="relative">
            <UAvatar
              :src="leaderboard[0].avatar"
              :alt="leaderboard[0].username"
              size="2xl"
              class="ring-4 ring-[var(--arcade-neon-yellow)] pulse-glow mb-2"
            />
            <UIcon name="i-lucide-crown" class="absolute -top-4 left-1/2 -translate-x-1/2 size-8 text-[var(--arcade-neon-yellow)]" />
          </div>
          <p class="font-pixel text-xs text-[var(--arcade-neon-yellow)] mb-1">{{ leaderboard[0].username }}</p>
          <div class="bg-[var(--arcade-neon-yellow)]/20 border-2 border-[var(--arcade-neon-yellow)] rounded-t-lg px-8 py-12">
            <p class="font-pixel text-3xl text-[var(--arcade-neon-yellow)]">1</p>
          </div>
        </div>
        
        <!-- 3rd Place -->
        <div class="text-center">
          <UAvatar
            :src="leaderboard[2].avatar"
            :alt="leaderboard[2].username"
            size="xl"
            class="ring-4 ring-amber-600 mb-2"
          />
          <p class="font-pixel text-xs text-amber-600 mb-1">{{ leaderboard[2].username }}</p>
          <div class="bg-amber-900/50 rounded-t-lg px-6 py-6">
            <p class="font-pixel text-2xl text-amber-600">3</p>
          </div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <div class="game-container rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-[var(--arcade-neon-cyan)]/20">
                <th class="font-pixel text-xs text-muted p-4 text-left">RANK</th>
                <th class="font-pixel text-xs text-muted p-4 text-left">PLAYER</th>
                <th class="font-pixel text-xs text-muted p-4 text-right">SCORE</th>
                <th class="font-pixel text-xs text-muted p-4 text-right hidden sm:table-cell">GAMES</th>
                <th class="font-pixel text-xs text-muted p-4 text-right hidden md:table-cell">WIN RATE</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="player in leaderboard"
                :key="player.rank"
                class="border-b border-[var(--arcade-neon-cyan)]/10 hover:bg-[var(--arcade-neon-cyan)]/5 transition-colors"
              >
                <td class="p-4">
                  <div class="flex items-center gap-2">
                    <UIcon v-if="getRankIcon(player.rank)" :name="getRankIcon(player.rank)!" :class="['size-5', getRankStyle(player.rank)]" />
                    <span :class="['font-pixel text-sm', getRankStyle(player.rank)]">#{{ player.rank }}</span>
                  </div>
                </td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <UAvatar :src="player.avatar" :alt="player.username" size="sm" />
                    <span class="font-retro text-lg text-white">{{ player.username }}</span>
                  </div>
                </td>
                <td class="p-4 text-right">
                  <span class="font-retro text-lg text-[var(--arcade-neon-cyan)]">{{ player.score.toLocaleString() }}</span>
                </td>
                <td class="p-4 text-right hidden sm:table-cell">
                  <span class="font-retro text-lg text-muted">{{ player.games }}</span>
                </td>
                <td class="p-4 text-right hidden md:table-cell">
                  <span class="font-retro text-lg text-[var(--arcade-neon-pink)]">{{ player.winRate }}%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Current User Position -->
      <div class="mt-8 game-container rounded-lg p-4 border-2 border-[var(--arcade-neon-pink)]">
        <p class="font-pixel text-xs text-[var(--arcade-neon-pink)] mb-2">YOUR POSITION</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <span class="font-pixel text-lg text-muted">#{{ currentUserRank.rank }}</span>
            <UAvatar :src="currentUserRank.avatar" :alt="currentUserRank.username" size="sm" class="ring-2 ring-[var(--arcade-neon-pink)]" />
            <span class="font-retro text-lg text-white">{{ currentUserRank.username }}</span>
          </div>
          <div class="flex items-center gap-6">
            <span class="font-retro text-lg text-[var(--arcade-neon-cyan)]">{{ currentUserRank.score.toLocaleString() }}</span>
            <span class="font-retro text-lg text-muted hidden sm:block">{{ currentUserRank.games }} games</span>
            <span class="font-retro text-lg text-[var(--arcade-neon-pink)] hidden md:block">{{ currentUserRank.winRate }}%</span>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
