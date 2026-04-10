<script setup lang="ts">
definePageMeta({
  title: 'About',
})

const features = [
  {
    icon: 'i-lucide-gamepad-2',
    title: 'WebGL Gaming',
    description: 'Play games directly in your browser with WebGL technology. No downloads or installations required.',
  },
  {
    icon: 'i-lucide-message-square',
    title: 'Community Forums',
    description: 'Connect with other gamers, share tips, ask questions, and be part of the GameDock community.',
  },
  {
    icon: 'i-lucide-trophy',
    title: 'Global Leaderboards',
    description: 'Climb the rankings and prove your skills against players from around the world.',
  },
  {
    icon: 'i-lucide-users',
    title: 'Friends System',
    description: 'Add friends, see their profiles, and challenge them to games.',
  },
  {
    icon: 'i-lucide-bar-chart-3',
    title: 'Personal Statistics',
    description: 'Track your progress with detailed stats including high scores, win rates, and game history.',
  },
  {
    icon: 'i-lucide-user',
    title: 'Player Profiles',
    description: 'Create your profile, showcase your achievements, and share your forum posts.',
  },
]

const team = [
  { name: 'Your Name', role: 'Developer', avatar: '/placeholder-user.jpg' },
]

const techStack = [
  { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs', color: '#4FC08D' },
  { name: 'Nuxt', icon: 'i-simple-icons-nuxtdotjs', color: '#00DC82' },
  { name: '.NET Core', icon: 'i-simple-icons-dotnet', color: '#512BD4' },
  { name: 'PostgreSQL', icon: 'i-simple-icons-postgresql', color: '#4169E1' },
  { name: 'WebGL', icon: 'i-lucide-cube', color: '#990000' },
  { name: 'Docker', icon: 'i-simple-icons-docker', color: '#2496ED' },
]
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <!-- Hero Section -->
      <div class="text-center mb-16 py-12">
        <div class="relative inline-block mb-6">
          <UIcon name="i-lucide-joystick" class="size-20 text-[var(--arcade-neon-pink)]" />
          <div class="absolute -inset-4 bg-[var(--arcade-neon-pink)]/20 blur-2xl rounded-full -z-10" />
        </div>
        <h1 class="font-pixel text-2xl sm:text-3xl text-[var(--arcade-neon-cyan)] neon-text-cyan mb-4">
          ABOUT GAMEDOCK
        </h1>
        <p class="font-retro text-xl sm:text-2xl text-white max-w-2xl mx-auto mb-4">
          A community for gamers, by gamers
        </p>
        <p class="font-retro text-lg text-muted max-w-xl mx-auto">
          GameDock is a browser-based gaming platform where you can play games, connect with other players,
          discuss on forums, and compete on leaderboards. Built for young adults with a passion for gaming.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="mb-16">
        <h2 class="font-pixel text-lg text-[var(--arcade-neon-pink)] text-center mb-8">FEATURES</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="game-container rounded-lg p-6 hover:border-[var(--arcade-neon-pink)] transition-colors"
          >
            <div class="w-12 h-12 rounded-lg bg-[var(--arcade-neon-cyan)]/10 flex items-center justify-center mb-4">
              <UIcon :name="feature.icon" class="size-6 text-[var(--arcade-neon-cyan)]" />
            </div>
            <h3 class="font-pixel text-xs text-white mb-2">{{ feature.title }}</h3>
            <p class="font-retro text-lg text-muted">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="mb-16">
        <h2 class="font-pixel text-lg text-[var(--arcade-neon-cyan)] text-center mb-8">POWERED BY</h2>
        <div class="flex flex-wrap justify-center gap-6">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="stat-card rounded-lg p-4 flex items-center gap-3 min-w-[140px]"
          >
            <UIcon :name="tech.icon" class="size-8" :style="{ color: tech.color }" />
            <span class="font-retro text-lg text-white">{{ tech.name }}</span>
          </div>
        </div>
      </div>

      <!-- Architecture Info -->
      <div class="game-container rounded-lg p-8 mb-16">
        <h2 class="font-pixel text-lg text-[var(--arcade-neon-yellow)] text-center mb-6">ARCHITECTURE</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="font-pixel text-xs text-[var(--arcade-neon-cyan)] mb-3">FRONTEND</h3>
            <ul class="space-y-2 font-retro text-lg text-muted">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--arcade-neon-cyan)]" />
                Vue.js 3 with Nuxt framework
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--arcade-neon-cyan)]" />
                Nuxt UI component library
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--arcade-neon-cyan)]" />
                WebGL game canvas integration
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--arcade-neon-cyan)]" />
                Tailwind CSS styling
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-pixel text-xs text-[var(--arcade-neon-pink)] mb-3">BACKEND</h3>
            <ul class="space-y-2 font-retro text-lg text-muted">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--arcade-neon-pink)]" />
                .NET Core Web API (C#)
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--arcade-neon-pink)]" />
                PostgreSQL database
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--arcade-neon-pink)]" />
                Docker containerization
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="size-4 text-[var(--arcade-neon-pink)]" />
                RESTful API architecture
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Contact / Links -->
      <div class="text-center">
        <h2 class="font-pixel text-lg text-[var(--arcade-neon-pink)] mb-6">GET IN TOUCH</h2>
        <div class="flex justify-center gap-4">
          <UButton
            icon="i-simple-icons-github"
            color="neutral"
            variant="soft"
            size="lg"
            to="https://github.com"
            target="_blank"
            class="font-retro"
          >
            GitHub
          </UButton>
          <UButton
            icon="i-simple-icons-discord"
            color="neutral"
            variant="soft"
            size="lg"
            to="https://discord.com"
            target="_blank"
            class="font-retro"
          >
            Discord
          </UButton>
          <UButton
            icon="i-lucide-mail"
            color="neutral"
            variant="soft"
            size="lg"
            to="mailto:contact@gamedock.com"
            class="font-retro"
          >
            Email
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
