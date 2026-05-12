<script setup lang="ts">
const route = useRoute()
const userId = Number(route.params.userId)

const {
  user,
  pending,
  error,
  xpProgress,
} = useProfile(userId)
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <div v-if="pending" class="font-retro text-muted text-center">
        Loading profile...
      </div>

      <div v-else-if="error" class="font-retro text-red-500 text-center">
        Could not load profile.
      </div>

      <div v-else class="game-container rounded-lg p-8 max-w-3xl mx-auto">
        <div class="flex items-center gap-6">
          <UAvatar
              :src="user.avatar"
              :alt="user.username"
              size="3xl"
          />

          <div>
            <h1 class="font-pixel text-xl text-[var(--arcade-neon-cyan)]">
              {{ user.username }}
            </h1>

            <p class="font-retro text-muted mt-2">
              {{ user.bio || 'No bio yet.' }}
            </p>

            <p class="font-retro text-sm text-muted mt-2">
              Member since {{ user.memberSince }}
            </p>
          </div>
        </div>

        <div class="mt-8">
          <p class="font-retro text-white mb-2">
            Level {{ user.level }}
          </p>

          <UProgress :model-value="xpProgress" />
        </div>
      </div>
    </UContainer>
  </div>
</template>