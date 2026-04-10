<script setup lang="ts">
definePageMeta({
  title: 'Home',
})

const gameLoaded = ref(false)
const isPlaying = ref(false)

// Simulated player stats
const playerStats = ref({
  highScore: 12450,
  gamesPlayed: 47,
  rank: 156,
  level: 23,
})

// Simulated recent games
const recentGames = [
  { id: 1, score: 8750, date: '2 hours ago', result: 'win' },
  { id: 2, score: 6200, date: '5 hours ago', result: 'loss' },
  { id: 3, score: 11200, date: 'Yesterday', result: 'win' },
]

function startGame() {
  isPlaying.value = true
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-12 lg:py-20 overflow-hidden">
      <!-- Background effects -->
      <div class="absolute inset-0 bg-gradient-to-b from-[var(--arcade-neon-pink)]/5 via-transparent to-[var(--arcade-neon-cyan)]/5" />
      <div class="absolute top-20 left-10 w-32 h-32 bg-[var(--arcade-neon-pink)]/10 rounded-full blur-3xl" />
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-[var(--arcade-neon-cyan)]/10 rounded-full blur-3xl" />
      
      <UContainer>
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Left: Game Canvas -->
          <div class="order-2 lg:order-1">
            <div class="game-container rounded-lg p-1 scanlines">
              <div class="bg-black rounded aspect-video flex items-center justify-center relative overflow-hidden">
                <!-- Placeholder for WebGL Game -->
                <div v-if="!isPlaying" class="text-center p-8">
                  <UIcon name="i-lucide-gamepad-2" class="size-20 text-[var(--arcade-neon-cyan)] mb-4 mx-auto" />
                  <h3 class="font-pixel text-lg text-[var(--arcade-neon-pink)] mb-2">GAME CANVAS</h3>
                  <p class="font-retro text-xl text-muted mb-6">Your WebGL game will load here</p>
                  <UButton
                    size="lg"
                    class="font-pixel text-sm bg-[var(--arcade-neon-cyan)] hover:bg-[var(--arcade-neon-cyan)]/80 text-black arcade-btn pulse-glow"
                    @click="startGame"
                  >
                    PRESS START
                  </UButton>
                </div>
                <div v-else class="w-full h-full flex items-center justify-center">
                  <!-- This is where your WebGL canvas would be mounted -->
                  <div class="text-center">
                    <p class="font-pixel text-xs text-[var(--arcade-neon-cyan)] animate-pulse">LOADING GAME...</p>
                    <p class="font-retro text-lg text-muted mt-4">WebGL canvas placeholder</p>
                    <p class="font-retro text-sm text-muted mt-2">Connect your game here using refs or a custom component</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Game Controls Info -->
            <div class="flex justify-center gap-4 mt-4">
              <div class="flex items-center gap-2">
                <UKbd>W</UKbd>
                <UKbd>A</UKbd>
                <UKbd>S</UKbd>
                <UKbd>D</UKbd>
                <span class="font-retro text-sm text-muted">Move</span>
              </div>
              <div class="flex items-center gap-2">
                <UKbd>Space</UKbd>
                <span class="font-retro text-sm text-muted">Action</span>
              </div>
            </div>
          </div>

          <!-- Right: Hero Content -->
          <div class="order-1 lg:order-2 text-center lg:text-left">
            <h1 class="font-pixel text-2xl sm:text-3xl lg:text-4xl text-[var(--arcade-neon-cyan)] neon-text-cyan mb-4 leading-relaxed">
              GAMEDOCK
            </h1>
            <p class="font-retro text-2xl sm:text-3xl text-white mb-2">
              Your Gaming Community
            </p>
            <p class="font-retro text-lg text-muted mb-8 max-w-md mx-auto lg:mx-0">
              Play games, join the community, discuss on forums, and compete on leaderboards.
            </p>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0">
              <div class="stat-card rounded-lg p-4 text-center">
                <p class="font-pixel text-xs text-[var(--arcade-neon-pink)] mb-1">HIGH SCORE</p>
                <p class="font-retro text-2xl text-white">{{ playerStats.highScore.toLocaleString() }}</p>
              </div>
              <div class="stat-card rounded-lg p-4 text-center">
                <p class="font-pixel text-xs text-[var(--arcade-neon-cyan)] mb-1">RANK</p>
                <p class="font-retro text-2xl text-white">#{{ playerStats.rank }}</p>
              </div>
              <div class="stat-card rounded-lg p-4 text-center">
                <p class="font-pixel text-xs text-[var(--arcade-neon-yellow)] mb-1">LEVEL</p>
                <p class="font-retro text-2xl text-white">{{ playerStats.level }}</p>
              </div>
              <div class="stat-card rounded-lg p-4 text-center">
                <p class="font-pixel text-xs text-muted mb-1">GAMES</p>
                <p class="font-retro text-2xl text-white">{{ playerStats.gamesPlayed }}</p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Recent Games Section -->
    <section class="py-12 border-t border-[var(--arcade-neon-cyan)]/10">
      <UContainer>
        <h2 class="font-pixel text-lg text-[var(--arcade-neon-pink)] mb-6 text-center">RECENT GAMES</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div
            v-for="game in recentGames"
            :key="game.id"
            class="stat-card rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <p class="font-retro text-xl text-white">{{ game.score.toLocaleString() }} pts</p>
              <p class="font-retro text-sm text-muted">{{ game.date }}</p>
            </div>
            <UBadge
              :color="game.result === 'win' ? 'success' : 'error'"
              variant="subtle"
              class="font-pixel text-xs"
            >
              {{ game.result.toUpperCase() }}
            </UBadge>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Features Section -->
    <section class="py-12 border-t border-[var(--arcade-neon-cyan)]/10">
      <UContainer>
        <h2 class="font-pixel text-lg text-[var(--arcade-neon-cyan)] mb-8 text-center">WHY GAMEDOCK?</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 rounded-lg bg-[var(--arcade-neon-pink)]/10 flex items-center justify-center">
              <UIcon name="i-lucide-zap" class="size-8 text-[var(--arcade-neon-pink)]" />
            </div>
            <h3 class="font-pixel text-xs text-white mb-2">INSTANT PLAY</h3>
            <p class="font-retro text-lg text-muted">No downloads. Jump straight into the action.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 rounded-lg bg-[var(--arcade-neon-cyan)]/10 flex items-center justify-center">
              <UIcon name="i-lucide-trophy" class="size-8 text-[var(--arcade-neon-cyan)]" />
            </div>
            <h3 class="font-pixel text-xs text-white mb-2">LEADERBOARDS</h3>
            <p class="font-retro text-lg text-muted">Compete globally. Prove your skills.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 rounded-lg bg-[var(--arcade-neon-yellow)]/10 flex items-center justify-center">
              <UIcon name="i-lucide-users" class="size-8 text-[var(--arcade-neon-yellow)]" />
            </div>
            <h3 class="font-pixel text-xs text-white mb-2">FRIENDS</h3>
            <p class="font-retro text-lg text-muted">Play with friends. Challenge rivals.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 mx-auto mb-4 rounded-lg bg-[var(--arcade-neon-pink)]/10 flex items-center justify-center">
              <UIcon name="i-lucide-bar-chart" class="size-8 text-[var(--arcade-neon-pink)]" />
            </div>
            <h3 class="font-pixel text-xs text-white mb-2">STATISTICS</h3>
            <p class="font-retro text-lg text-muted">Track progress. Improve your game.</p>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
