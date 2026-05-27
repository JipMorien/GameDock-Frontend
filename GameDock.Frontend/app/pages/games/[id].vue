<script setup lang="ts">
definePageMeta({
  title: 'Play Game',
})

const route = useRoute()

const games = [
  {
    slug: 'gamedock-runner',
    title: 'GameDock Runner',
    description:
        'GameDock Runner is de eerste speelbare game binnen GameDock. De game draait als Unity WebGL build direct in de browser.',
    iframeUrl: '/games/gamedock-runner/index.html',
    controls: [
      'Gebruik WASD of pijltjestoetsen om te bewegen.',
      'Gebruik spatie om te springen.',
      'Speel fullscreen voor de beste ervaring.',
    ],
  },
]

const game = computed(() =>
    games.find(game => game.slug === route.params.slug),
)

const gameFrame = ref<HTMLIFrameElement | null>(null)

function openFullscreen() {
  const iframe = gameFrame.value

  if (!iframe) return

  if (iframe.requestFullscreen) {
    iframe.requestFullscreen()
  }
}
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <div v-if="game">
        <div class="mb-6">
          <UButton
              to="/games"
              label="Back to games"
              icon="i-lucide-arrow-left"
              variant="ghost"
              class="mb-4"
          />

          <h1 class="font-pixel text-2xl text-[var(--arcade-neon-blue)] neon-text-blue mb-3">
            {{ game.title }}
          </h1>

          <p class="font-retro text-xl text-muted max-w-3xl">
            {{ game.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          <UCard>
            <div class="flex justify-between items-center mb-4">
              <h2 class="font-pixel text-lg text-[var(--arcade-neon-pink)]">
                Play
              </h2>

              <UButton
                  label="Fullscreen"
                  icon="i-lucide-maximize"
                  @click="openFullscreen"
              />
            </div>

            <div class="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                  ref="gameFrame"
                  :src="game.iframeUrl"
                  :title="game.title"
                  class="w-full h-full border-0"
                  allow="fullscreen"
                  allowfullscreen
              />
            </div>
          </UCard>

          <UCard>
            <h2 class="font-pixel text-lg text-[var(--arcade-neon-yellow)] mb-4">
              Controls
            </h2>

            <ul class="space-y-3">
              <li
                  v-for="control in game.controls"
                  :key="control"
                  class="font-retro text-muted flex gap-2"
              >
                <UIcon
                    name="i-lucide-chevron-right"
                    class="text-[var(--arcade-neon-green)] mt-1"
                />
                <span>{{ control }}</span>
              </li>
            </ul>
          </UCard>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h1 class="font-pixel text-2xl text-[var(--arcade-neon-pink)] mb-4">
          Game not found
        </h1>

        <p class="font-retro text-muted mb-6">
          This game does not exist.
        </p>

        <UButton
            to="/games"
            label="Back to games"
            icon="i-lucide-arrow-left"
        />
      </div>
    </UContainer>
  </div>
</template>