<script setup lang="ts">
definePageMeta({
  title: 'Statistics',
})

// Simulated statistics data (would come from your .NET backend)
const stats = ref({
  totalGames: 342,
  wins: 186,
  losses: 156,
  winRate: 54.4,
  totalScore: 892450,
  averageScore: 2609,
  highScore: 28750,
  playTime: '47h 23m',
  currentStreak: 3,
  bestStreak: 8,
})

// Game history
const gameHistory = ref([
  { id: 1, date: '2024-03-15', score: 12450, result: 'win', opponent: 'RetroKing', duration: '4:23' },
  { id: 2, date: '2024-03-15', score: 8200, result: 'loss', opponent: 'ArcadeQueen', duration: '3:45' },
  { id: 3, date: '2024-03-14', score: 15600, result: 'win', opponent: 'PixelWarrior', duration: '5:12' },
  { id: 4, date: '2024-03-14', score: 9800, result: 'win', opponent: 'NeonNinja', duration: '4:01' },
  { id: 5, date: '2024-03-14', score: 7100, result: 'loss', opponent: 'GameMaster', duration: '3:22' },
  { id: 6, date: '2024-03-13', score: 11200, result: 'win', opponent: 'VintageGamer', duration: '4:45' },
  { id: 7, date: '2024-03-13', score: 6500, result: 'loss', opponent: 'CyberPunk', duration: '2:58' },
  { id: 8, date: '2024-03-12', score: 18900, result: 'win', opponent: 'RetroBlaster', duration: '6:12' },
])

// Weekly performance data
const weeklyPerformance = [
  { day: 'Mon', games: 5, wins: 3 },
  { day: 'Tue', games: 8, wins: 5 },
  { day: 'Wed', games: 3, wins: 2 },
  { day: 'Thu', games: 6, wins: 4 },
  { day: 'Fri', games: 10, wins: 7 },
  { day: 'Sat', games: 12, wins: 8 },
  { day: 'Sun', games: 7, wins: 3 },
]

const winLossRatio = computed(() => {
  return [
    { label: 'Wins', value: stats.value.wins, color: 'var(--arcade-neon-cyan)' },
    { label: 'Losses', value: stats.value.losses, color: 'var(--arcade-neon-pink)' },
  ]
})
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="font-pixel text-2xl text-[var(--arcade-neon-yellow)] mb-2">STATISTICS</h1>
        <p class="font-retro text-xl text-muted">Track your performance</p>
      </div>

      <!-- Main Stats Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-gamepad-2" class="size-8 text-[var(--arcade-neon-cyan)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">TOTAL GAMES</p>
          <p class="font-retro text-3xl text-white">{{ stats.totalGames }}</p>
        </div>
        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-percent" class="size-8 text-[var(--arcade-neon-pink)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">WIN RATE</p>
          <p class="font-retro text-3xl text-white">{{ stats.winRate }}%</p>
        </div>
        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-star" class="size-8 text-[var(--arcade-neon-yellow)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">HIGH SCORE</p>
          <p class="font-retro text-3xl text-white">{{ stats.highScore.toLocaleString() }}</p>
        </div>
        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-clock" class="size-8 text-[var(--arcade-neon-cyan)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">PLAY TIME</p>
          <p class="font-retro text-3xl text-white">{{ stats.playTime }}</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 mb-8">
        <!-- Win/Loss Breakdown -->
        <div class="game-container rounded-lg p-6">
          <h2 class="font-pixel text-sm text-[var(--arcade-neon-cyan)] mb-6">WIN / LOSS BREAKDOWN</h2>
          
          <div class="flex items-center justify-center gap-8 mb-6">
            <div class="text-center">
              <p class="font-retro text-5xl text-[var(--arcade-neon-cyan)]">{{ stats.wins }}</p>
              <p class="font-pixel text-xs text-muted mt-2">WINS</p>
            </div>
            <div class="text-4xl text-muted">/</div>
            <div class="text-center">
              <p class="font-retro text-5xl text-[var(--arcade-neon-pink)]">{{ stats.losses }}</p>
              <p class="font-pixel text-xs text-muted mt-2">LOSSES</p>
            </div>
          </div>

          <!-- Visual bar -->
          <div class="h-4 rounded-full overflow-hidden flex">
            <div 
              class="bg-[var(--arcade-neon-cyan)] transition-all" 
              :style="{ width: `${stats.winRate}%` }"
            />
            <div 
              class="bg-[var(--arcade-neon-pink)] transition-all" 
              :style="{ width: `${100 - stats.winRate}%` }"
            />
          </div>
        </div>

        <!-- Streaks -->
        <div class="game-container rounded-lg p-6">
          <h2 class="font-pixel text-sm text-[var(--arcade-neon-pink)] mb-6">STREAKS & AVERAGES</h2>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-black/30 rounded-lg p-4 text-center">
              <UIcon name="i-lucide-flame" class="size-8 text-orange-500 mx-auto mb-2" />
              <p class="font-pixel text-xs text-muted mb-1">CURRENT STREAK</p>
              <p class="font-retro text-2xl text-white">{{ stats.currentStreak }} wins</p>
            </div>
            <div class="bg-black/30 rounded-lg p-4 text-center">
              <UIcon name="i-lucide-trophy" class="size-8 text-[var(--arcade-neon-yellow)] mx-auto mb-2" />
              <p class="font-pixel text-xs text-muted mb-1">BEST STREAK</p>
              <p class="font-retro text-2xl text-white">{{ stats.bestStreak }} wins</p>
            </div>
            <div class="bg-black/30 rounded-lg p-4 text-center">
              <UIcon name="i-lucide-target" class="size-8 text-[var(--arcade-neon-cyan)] mx-auto mb-2" />
              <p class="font-pixel text-xs text-muted mb-1">AVG SCORE</p>
              <p class="font-retro text-2xl text-white">{{ stats.averageScore.toLocaleString() }}</p>
            </div>
            <div class="bg-black/30 rounded-lg p-4 text-center">
              <UIcon name="i-lucide-calculator" class="size-8 text-[var(--arcade-neon-pink)] mx-auto mb-2" />
              <p class="font-pixel text-xs text-muted mb-1">TOTAL SCORE</p>
              <p class="font-retro text-2xl text-white">{{ (stats.totalScore / 1000).toFixed(0) }}K</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Weekly Activity -->
      <div class="game-container rounded-lg p-6 mb-8">
        <h2 class="font-pixel text-sm text-[var(--arcade-neon-yellow)] mb-6">THIS WEEK</h2>
        <div class="flex items-end justify-between gap-2 h-32">
          <div
            v-for="day in weeklyPerformance"
            :key="day.day"
            class="flex-1 flex flex-col items-center gap-2"
          >
            <div class="flex-1 w-full flex flex-col justify-end gap-1">
              <div 
                class="bg-[var(--arcade-neon-cyan)] rounded-t transition-all" 
                :style="{ height: `${(day.wins / 12) * 100}%` }"
              />
              <div 
                class="bg-[var(--arcade-neon-pink)]/50 rounded-t transition-all" 
                :style="{ height: `${((day.games - day.wins) / 12) * 100}%` }"
              />
            </div>
            <p class="font-pixel text-xs text-muted">{{ day.day }}</p>
          </div>
        </div>
        <div class="flex justify-center gap-6 mt-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-[var(--arcade-neon-cyan)] rounded" />
            <span class="font-retro text-sm text-muted">Wins</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-[var(--arcade-neon-pink)]/50 rounded" />
            <span class="font-retro text-sm text-muted">Losses</span>
          </div>
        </div>
      </div>

      <!-- Game History -->
      <div class="game-container rounded-lg overflow-hidden">
        <div class="p-4 border-b border-[var(--arcade-neon-cyan)]/20">
          <h2 class="font-pixel text-sm text-[var(--arcade-neon-cyan)]">GAME HISTORY</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-[var(--arcade-neon-cyan)]/20">
                <th class="font-pixel text-xs text-muted p-4 text-left">DATE</th>
                <th class="font-pixel text-xs text-muted p-4 text-left">OPPONENT</th>
                <th class="font-pixel text-xs text-muted p-4 text-center">RESULT</th>
                <th class="font-pixel text-xs text-muted p-4 text-right">SCORE</th>
                <th class="font-pixel text-xs text-muted p-4 text-right hidden sm:table-cell">DURATION</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="game in gameHistory"
                :key="game.id"
                class="border-b border-[var(--arcade-neon-cyan)]/10 hover:bg-[var(--arcade-neon-cyan)]/5 transition-colors"
              >
                <td class="p-4">
                  <span class="font-retro text-sm text-muted">{{ game.date }}</span>
                </td>
                <td class="p-4">
                  <span class="font-retro text-lg text-white">{{ game.opponent }}</span>
                </td>
                <td class="p-4 text-center">
                  <UBadge
                    :color="game.result === 'win' ? 'success' : 'error'"
                    variant="subtle"
                    class="font-pixel text-xs"
                  >
                    {{ game.result.toUpperCase() }}
                  </UBadge>
                </td>
                <td class="p-4 text-right">
                  <span class="font-retro text-lg text-[var(--arcade-neon-cyan)]">{{ game.score.toLocaleString() }}</span>
                </td>
                <td class="p-4 text-right hidden sm:table-cell">
                  <span class="font-retro text-sm text-muted">{{ game.duration }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-4 border-t border-[var(--arcade-neon-cyan)]/20 text-center">
          <UButton variant="ghost" class="font-retro">
            Load More
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
