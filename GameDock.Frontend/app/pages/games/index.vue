<script setup lang="ts">
definePageMeta({
  title: 'Games',
})

const games = [
  {
    slug: 'a-blind-step',
    title: 'A Blind Step',
    description:
        'A Blind Step is a puzzle platformer that makes you navigate tricky situations in the dark. Can you find your way out?',
    iframeUrl: '/games/a-blind-step/index.html',
    controls: [
      'Use WASD to move around',
      'Use the space bar to jump',
      'Play in fullscreen for the best experience!',],
    image: "/banners/ABlindStep.png"
  },
  {
    slug: 'southpark',
    title: 'South Park',
    description: 'South Park Go is a fun and quirky platformer thats here to make you laugh. Can you hold your blatter?',
    iframeUrl: '/games/southpark/index.html',
    controls: [
      'Use WASD to move around',
      'Use the space bar to jump',
      'Play in fullscreen for the best experience!',],
    image: '/banners/southparkgo.png',
  },
]
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <div class="text-center mb-10">
        <h1 class="font-pixel text-2xl text-[var(--arcade-neon-blue)] neon-text-blue mb-2">
          GAMES
        </h1>
        <p class="font-retro text-xl text-muted">
          Choose a game and start playing
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
            v-for="game in games"
            :key="game.slug"
            :to="`/games/${game.slug}`"
            class="group"
        >
          <UCard
              class="h-full transition-transform duration-200 group-hover:scale-[1.02]"
          >
            <div class="aspect-video bg-black/40 rounded-lg overflow-hidden mb-4">
              <img
                  :src="game.image"
                  :alt="game.title"
                  class="w-full h-full object-cover"
              >
            </div>

            <h2 class="font-pixel text-lg text-[var(--arcade-neon-pink)] mb-2">
              {{ game.title }}
            </h2>

            <p class="font-retro text-muted mb-4">
              {{ game.description }}
            </p>

            <UButton
                label="Play game"
                icon="i-lucide-gamepad-2"
                color="primary"
                block
            />
          </UCard>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>