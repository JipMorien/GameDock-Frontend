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

const {
  leaderboard,
  currentUserRank,
  pending,
  error
} = await useLeaderboard()

const firstPlace = computed(() => leaderboard.value[0])
const secondPlace = computed(() => leaderboard.value[1])
const thirdPlace = computed(() => leaderboard.value[2])

const hasPodium = computed(() =>
    leaderboard.value.length >= 3
)

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
        <h1 class="font-pixel text-2xl text-[var(--arcade-neon-cyan)] neon-text-cyan mb-2">
          LEADERBOARD
        </h1>

        <p class="font-retro text-xl text-muted">
          Top players worldwide
        </p>
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
              timeFilter === option.value
                ? 'bg-[var(--arcade-neon-cyan)] text-black'
                : ''
            ]"
              @click="timeFilter = option.value"
          >
            {{ option.label }}
          </UButton>
        </div>
      </div>

      <!-- Loading -->
      <div
          v-if="pending"
          class="text-center font-retro text-muted mb-4"
      >
        Loading leaderboard...
      </div>

      <!-- Error -->
      <div
          v-if="error"
          class="text-center font-retro text-red-500 mb-4"
      >
        Could not load leaderboard.
      </div>

      <!-- Podium -->
      <div
          v-if="hasPodium && firstPlace && secondPlace && thirdPlace"
          class="flex justify-center items-end gap-4 mb-8"
      >
        <!-- 2nd -->
        <div class="text-center">
          <UAvatar
              :src="secondPlace.avatar"
              :alt="secondPlace.username"
              size="xl"
              class="ring-4 ring-gray-400 mb-2"
          />

          <p class="font-pixel text-xs text-gray-300 mb-1">
            {{ secondPlace.username }}
          </p>

          <div class="bg-gray-700 rounded-t-lg px-6 py-8">
            <p class="font-pixel text-2xl text-gray-300">
              2
            </p>
          </div>
        </div>

        <!-- 1st -->
        <div class="text-center">
          <div class="relative">
            <UAvatar
                :src="firstPlace.avatar"
                :alt="firstPlace.username"
                size="2xl"
                class="ring-4 ring-[var(--arcade-neon-yellow)] pulse-glow mb-2"
            />

            <UIcon
                name="i-lucide-crown"
                class="absolute -top-4 left-1/2 -translate-x-1/2 size-8 text-[var(--arcade-neon-yellow)]"
            />
          </div>

          <p class="font-pixel text-xs text-[var(--arcade-neon-yellow)] mb-1">
            {{ firstPlace.username }}
          </p>

          <div class="bg-[var(--arcade-neon-yellow)]/20 border-2 border-[var(--arcade-neon-yellow)] rounded-t-lg px-8 py-12">
            <p class="font-pixel text-3xl text-[var(--arcade-neon-yellow)]">
              1
            </p>
          </div>
        </div>

        <!-- 3rd -->
        <div class="text-center">
          <UAvatar
              :src="thirdPlace.avatar"
              :alt="thirdPlace.username"
              size="xl"
              class="ring-4 ring-amber-600 mb-2"
          />

          <p class="font-pixel text-xs text-amber-600 mb-1">
            {{ thirdPlace.username }}
          </p>

          <div class="bg-amber-900/50 rounded-t-lg px-6 py-6">
            <p class="font-pixel text-2xl text-amber-600">
              3
            </p>
          </div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <div class="game-container rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
            <tr class="border-b border-[var(--arcade-neon-cyan)]/20">
              <th class="font-pixel text-xs text-muted p-4 text-left">
                RANK
              </th>

              <th class="font-pixel text-xs text-muted p-4 text-left">
                PLAYER
              </th>

              <th class="font-pixel text-xs text-muted p-4 text-right">
                SCORE
              </th>

              <th class="font-pixel text-xs text-muted p-4 text-right hidden sm:table-cell">
                GAMES
              </th>

              <th class="font-pixel text-xs text-muted p-4 text-right hidden md:table-cell">
                WIN RATE
              </th>
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
                  <UIcon
                      v-if="getRankIcon(player.rank)"
                      :name="getRankIcon(player.rank)!"
                      :class="['size-5', getRankStyle(player.rank)]"
                  />

                  <span :class="['font-pixel text-sm', getRankStyle(player.rank)]">
                      #{{ player.rank }}
                    </span>
                </div>
              </td>

              <td class="p-4">
                <div class="flex items-center gap-3">
                  <UAvatar
                      :src="player.avatar"
                      :alt="player.username"
                      size="sm"
                  />

                  <span class="font-retro text-lg text-white">
                      {{ player.username }}
                    </span>
                </div>
              </td>

              <td class="p-4 text-right">
                  <span class="font-retro text-lg text-[var(--arcade-neon-cyan)]">
                    {{ player.score.toLocaleString() }}
                  </span>
              </td>

              <td class="p-4 text-right hidden sm:table-cell">
                  <span class="font-retro text-lg text-muted">
                    {{ player.games }}
                  </span>
              </td>

              <td class="p-4 text-right hidden md:table-cell">
                  <span class="font-retro text-lg text-[var(--arcade-neon-pink)]">
                    {{ player.winRate }}%
                  </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Current User -->
      <div class="mt-8 game-container rounded-lg p-4 border-2 border-[var(--arcade-neon-pink)]">
        <p class="font-pixel text-xs text-[var(--arcade-neon-pink)] mb-2">
          YOUR POSITION
        </p>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <span class="font-pixel text-lg text-muted">
              #{{ currentUserRank.rank }}
            </span>

            <UAvatar
                :src="currentUserRank.avatar"
                :alt="currentUserRank.username"
                size="sm"
                class="ring-2 ring-[var(--arcade-neon-pink)]"
            />

            <span class="font-retro text-lg text-white">
              {{ currentUserRank.username }}
            </span>
          </div>

          <div class="flex items-center gap-6">
            <span class="font-retro text-lg text-[var(--arcade-neon-cyan)]">
              {{ currentUserRank.score.toLocaleString() }}
            </span>

            <span class="font-retro text-lg text-muted hidden sm:block">
              {{ currentUserRank.games }} games
            </span>

            <span class="font-retro text-lg text-[var(--arcade-neon-pink)] hidden md:block">
              {{ currentUserRank.winRate }}%
            </span>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>