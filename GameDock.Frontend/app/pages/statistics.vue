<script setup lang="ts">
definePageMeta({
  title: 'Statistics',
})

const {
  statistics,
  totalCoins,
  totalKills,
  totalDeaths,
  kdRatio,
  pending,
  error
} = await useStatistics()
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <div class="text-center mb-8">
        <h1 class="font-pixel text-2xl text-[var(--arcade-neon-yellow)] mb-2">
          STATISTICS
        </h1>
        <p class="font-retro text-xl text-muted">
          Track your performance
        </p>
      </div>

      <div v-if="pending" class="text-center font-retro text-muted mb-4">
        Loading statistics...
      </div>

      <div v-if="error" class="text-center font-retro text-red-500 mb-4">
        Could not load statistics.
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-coins" class="size-8 text-[var(--arcade-neon-yellow)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">TOTAL COINS</p>
          <p class="font-retro text-3xl text-white">{{ totalCoins }}</p>
        </div>

        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-swords" class="size-8 text-[var(--arcade-neon-cyan)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">TOTAL KILLS</p>
          <p class="font-retro text-3xl text-white">{{ totalKills }}</p>
        </div>

        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-skull" class="size-8 text-[var(--arcade-neon-pink)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">TOTAL DEATHS</p>
          <p class="font-retro text-3xl text-white">{{ totalDeaths }}</p>
        </div>

        <div class="stat-card rounded-lg p-5 text-center">
          <UIcon name="i-lucide-target" class="size-8 text-[var(--arcade-neon-cyan)] mx-auto mb-2" />
          <p class="font-pixel text-xs text-muted mb-1">K/D RATIO</p>
          <p class="font-retro text-3xl text-white">{{ kdRatio }}</p>
        </div>
      </div>

      <div class="game-container rounded-lg overflow-hidden">
        <div class="p-4 border-b border-[var(--arcade-neon-cyan)]/20">
          <h2 class="font-pixel text-sm text-[var(--arcade-neon-cyan)]">
            RAW STATISTICS
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
            <tr class="border-b border-[var(--arcade-neon-cyan)]/20">
              <th class="font-pixel text-xs text-muted p-4 text-left">ID</th>
              <th class="font-pixel text-xs text-muted p-4 text-left">USER</th>
              <th class="font-pixel text-xs text-muted p-4 text-left">TYPE</th>
              <th class="font-pixel text-xs text-muted p-4 text-right">VALUE</th>
              <th class="font-pixel text-xs text-muted p-4 text-right">CREATED AT</th>
            </tr>
            </thead>

            <tbody>
            <tr
                v-for="stat in statistics"
                :key="stat.id"
                class="border-b border-[var(--arcade-neon-cyan)]/10 hover:bg-[var(--arcade-neon-cyan)]/5 transition-colors"
            >
              <td class="p-4">
                <span class="font-retro text-sm text-muted">#{{ stat.id }}</span>
              </td>

              <td class="p-4">
                <span class="font-retro text-lg text-white">User {{ stat.userId }}</span>
              </td>

              <td class="p-4">
                  <span class="font-retro text-lg text-white">
                    {{ stat.type === 1 ? 'Coins' : stat.type === 2 ? 'Kills' : 'Deaths' }}
                  </span>
              </td>

              <td class="p-4 text-right">
                  <span class="font-retro text-lg text-[var(--arcade-neon-cyan)]">
                    {{ stat.value }}
                  </span>
              </td>

              <td class="p-4 text-right">
                  <span class="font-retro text-sm text-muted">
                    {{ new Date(stat.createdAt).toLocaleDateString() }}
                  </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UContainer>
  </div>
</template>