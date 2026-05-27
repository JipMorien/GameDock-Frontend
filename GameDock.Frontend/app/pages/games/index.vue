<script setup lang="ts">
definePageMeta({
  title: 'Games',
})

const games = [
  {
    slug: 'a-blind-step',
    title: 'A Blind Step',
    description:
        'A Blind Step is een horror puzzle game die speelbaar is via Unity WebGL.',
    iframeUrl: '/games/a-blind-step/index.html',
    controls: [
      'Gebruik WASD om te bewegen.',
      'Gebruik je muis om rond te kijken.',
      'Speel fullscreen voor de beste ervaring.',
    ],
  },
  {
    slug: 'southpark',
    title: 'South Park',
    description: 'Speel de South Park WebGL game direct via GameDock.',
    image: '/images/games/southpark.png',
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