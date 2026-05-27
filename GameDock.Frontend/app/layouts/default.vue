<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

interface BackendProfile {
  profileId: number
  userName: string
  userId: number
  bio: string
  avatarId: number
  createdAt: string
}

const colorMode = useColorMode()
const api = useApi()

const isLoggedIn = ref(false)
const loginModalOpen = ref(false)
const registerModalOpen = ref(false)
const profile = ref<BackendProfile | null>(null)

const avatarUrl = computed(() => {
  return `/avatars/avatar-${profile.value?.avatarId ?? 1}.png`
})

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: 'Games', to: '/games', icon: 'i-lucide-joystick' },
  { label: 'Forum', to: '/forum', icon: 'i-lucide-message-square' },
  { label: 'Leaderboard', to: '/leaderboard', icon: 'i-lucide-trophy' },
  { label: 'Friends', to: '/friends', icon: 'i-lucide-users' },
  { label: 'Statistics', to: '/statistics', icon: 'i-lucide-bar-chart-3' },
  { label: 'About', to: '/about', icon: 'i-lucide-info' },
])

async function loadProfile() {
  if (!localStorage.getItem('token')) return

  try {
    profile.value = await api<BackendProfile>('/profiles/me')
    isLoggedIn.value = true
  } catch (error) {
    console.error('LOAD PROFILE FAILED', error)

    // tijdelijk NIET uitloggen
    profile.value = null
    isLoggedIn.value = true
  }
}

async function handleAuthSuccess() {
  isLoggedIn.value = true
  loginModalOpen.value = false
  registerModalOpen.value = false
  await loadProfile()
}

async function logout() {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  profile.value = null

  await navigateTo('/')
}

onMounted(async () => {
  colorMode.preference = 'dark'
  isLoggedIn.value = !!localStorage.getItem('token')

  await loadProfile()

  window.addEventListener('profile-updated', loadProfile)
})

onBeforeUnmount(() => {
  window.removeEventListener('profile-updated', loadProfile)
})

const userMenuItems = [
  [
    { label: 'Profile', icon: 'i-lucide-user', to: '/profile' },
    { label: 'Settings', icon: 'i-lucide-settings', to: '/settings' },
  ],
  [
    { label: 'Sign out', icon: 'i-lucide-log-out', onSelect: logout },
  ],
]
</script>

<template>
  <div>
    <UHeader class="border-b border-[var(--arcade-neon-cyan)]/20 bg-[var(--arcade-darker)]">
      <template #title>
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="relative">
            <UIcon name="i-lucide-joystick" class="size-8 text-[var(--arcade-neon-pink)]" />
            <div class="absolute -inset-1 bg-[var(--arcade-neon-pink)]/20 blur-md rounded-full -z-10" />
          </div>

          <span class="font-pixel text-sm text-[var(--arcade-neon-cyan)] neon-text-cyan hidden sm:block">
            GAMEDOCK
          </span>
        </NuxtLink>
      </template>

      <UNavigationMenu :items="navItems" class="hidden lg:flex" />

      <template #right>
        <ClientOnly>
          <template v-if="isLoggedIn">
            <UDropdownMenu :items="userMenuItems">
              <UButton variant="ghost" class="p-0">
                <UAvatar
                    :src="avatarUrl"
                    :alt="profile?.userName ?? 'Player Avatar'"
                    size="sm"
                    class="ring-2 ring-[var(--arcade-neon-cyan)]"
                />
              </UButton>
            </UDropdownMenu>
          </template>

          <template v-else>
            <UButton
                label="Sign In"
                color="neutral"
                variant="ghost"
                class="font-retro text-lg"
                @click="loginModalOpen = true"
            />

            <UButton
                label="Join"
                class="font-retro text-lg bg-[var(--arcade-neon-pink)] hover:bg-[var(--arcade-neon-pink)]/80 text-white arcade-btn"
                @click="registerModalOpen = true"
            />
          </template>
        </ClientOnly>
      </template>

      <template #body>
        <UNavigationMenu
            :items="navItems"
            orientation="vertical"
            class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain class="bg-[var(--arcade-dark)] min-h-screen">
      <slot />
    </UMain>

    <UFooter class="border-t border-[var(--arcade-neon-cyan)]/20 bg-[var(--arcade-darker)]">
      <template #left>
        <p class="text-muted text-sm font-retro">
          &copy; {{ new Date().getFullYear() }} GameDock. All rights reserved.
        </p>
      </template>

      <template #right>
        <div class="flex items-center gap-2">
          <UButton
              icon="i-simple-icons-github"
              color="neutral"
              variant="ghost"
              to="https://github.com"
              target="_blank"
          />

          <UButton
              icon="i-simple-icons-discord"
              color="neutral"
              variant="ghost"
              to="https://discord.com"
              target="_blank"
          />
        </div>
      </template>
    </UFooter>

    <UModal
        v-model:open="loginModalOpen"
        title="Welcome Back, Player!"
        :ui="{ title: 'font-pixel text-sm text-center text-[var(--arcade-neon-cyan)]' }"
    >
      <template #body>
        <LoginForm
            @success="handleAuthSuccess"
            @switch-to-register="loginModalOpen = false; registerModalOpen = true"
        />
      </template>
    </UModal>

    <UModal
        v-model:open="registerModalOpen"
        title="Create Your Player"
        :ui="{ title: 'font-pixel text-sm text-center text-[var(--arcade-neon-pink)]' }"
    >
      <template #body>
        <RegisterForm
            @success="handleAuthSuccess"
            @switch-to-login="registerModalOpen = false; loginModalOpen = true"
        />
      </template>
    </UModal>
  </div>
</template>