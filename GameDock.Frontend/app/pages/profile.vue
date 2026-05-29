<script setup lang="ts">
definePageMeta({
  title: 'Profile',
})

const {
  user,
  pending,
  error,
  xpProgress,
} = useProfile()
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <div class="game-container rounded-lg p-6 mb-8">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div class="relative">
            <UAvatar
                :src="user.avatar"
                :alt="user.username"
                size="3xl"
                class="ring-4 ring-[var(--arcade-neon-cyan)] pulse-glow"
            />
            <div class="absolute -bottom-2 -right-2 bg-[var(--arcade-neon-pink)] rounded-full px-3 py-1">
              <span class="font-pixel text-xs text-white">LVL {{ user.level }}</span>
            </div>
          </div>

          <div v-if="pending" class="flex-1 text-center font-retro text-muted mb-4">
            Loading profile...
          </div>

          <div v-else-if="error" class="flex-1 text-center font-retro text-red-500 mb-4">
            Could not load profile.
          </div>

          <div v-else class="flex-1 text-center md:text-left">
            <h1 class="font-pixel text-xl text-[var(--arcade-neon-cyan)] neon-text-cyan mb-2">
              {{ user.username }}
            </h1>

            <p class="font-retro text-lg text-muted mb-2">
              Member since {{ user.memberSince }}
            </p>

            <p class="font-retro text-lg text-white/80 mb-4 max-w-xl">
              {{ user.bio || 'No bio added yet.' }}
            </p>

            <div class="max-w-md">
              <div class="flex justify-between mb-1">
                <span class="font-retro text-sm text-muted">Level {{ user.level }}</span>
                <span class="font-retro text-sm text-[var(--arcade-neon-cyan)]">
                  {{ user.xp }} / {{ user.xpToNextLevel }} XP
                </span>
              </div>
              <UProgress :value="xpProgress" color="primary" size="md" class="mb-4" />
            </div>

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

          <UButton
              icon="i-lucide-settings"
              color="neutral"
              variant="ghost"
              class="font-retro"
              to="/settings"
          >
            Edit Profile
          </UButton>
        </div>
      </div>

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
    </UContainer>
  </div>
</template>