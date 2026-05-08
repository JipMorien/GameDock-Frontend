<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  title: 'Settings',
})

interface BackendProfile {
  profileId: number
  userName: string
  userId: number
  bio: string
  avatarId: number
  createdAt: string
}

const api = useApi()
const toast = useToast()

const isSavingProfile = ref(false)
const avatars = [1, 2, 3, 4, 5]

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username cannot be longer than 20 characters'),
  bio: z.string().max(250, 'Bio cannot be longer than 250 characters'),
  avatarId: z.number().min(1).max(5),
})

const profileState = reactive({
  username: '',
  bio: '',
  avatarId: 1,
})

const { data: profileData, pending, error } = await useAsyncData<BackendProfile>(
    'settings-profile',
    () => api('/profiles/me')
)

if (profileData.value) {
  profileState.username = profileData.value.userName
  profileState.bio = profileData.value.bio
  profileState.avatarId = profileData.value.avatarId
}

async function onSaveProfile() {
  isSavingProfile.value = true

  try {
    await api('/profiles/me', {
      method: 'PUT',
      body: {
        userName: profileState.username,
        bio: profileState.bio,
        avatarId: profileState.avatarId,
      },
    })
    
    window.dispatchEvent(new Event('profile-updated'))

    await refreshNuxtData('profile')
    await refreshNuxtData('settings-profile')

    toast.add({
      title: 'Profile updated',
      description: 'Your profile has been saved successfully.',
      icon: 'i-lucide-check-circle',
      color: 'success',
    })

    await navigateTo('/profile')
  
  } catch {
    toast.add({
      title: 'Update failed',
      description: 'Could not save your profile.',
      icon: 'i-lucide-alert-circle',
      color: 'error',
    })
  } finally {
    isSavingProfile.value = false
  }
}
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <div class="text-center mb-8">
        <h1 class="font-pixel text-2xl text-[var(--arcade-neon-cyan)] neon-text-cyan mb-2">
          SETTINGS
        </h1>
        <p class="font-retro text-xl text-muted">
          Manage your GameDock profile
        </p>
      </div>

      <div class="game-container rounded-lg p-6 max-w-3xl mx-auto">
        <div v-if="pending" class="font-retro text-muted text-center">
          Loading settings...
        </div>

        <div v-else-if="error" class="font-retro text-red-500 text-center">
          Could not load your profile.
        </div>

        <UForm
            v-else
            :schema="profileSchema"
            :state="profileState"
            class="space-y-6"
            @submit="onSaveProfile"
        >
          <div class="flex items-center gap-6 pb-6 border-b border-[var(--arcade-neon-cyan)]/10">
            <UAvatar
                :src="`/avatars/avatar-${profileState.avatarId}.png`"
                :alt="profileState.username"
                size="3xl"
                class="ring-4 ring-[var(--arcade-neon-cyan)] pulse-glow"
            />

            <div>
              <p class="font-retro text-lg text-white mb-2">
                Profile Picture
              </p>
              <p class="font-retro text-sm text-muted mb-3">
                Choose one of the available avatars
              </p>

              <div class="flex flex-wrap gap-3">
                <button
                    v-for="avatar in avatars"
                    :key="avatar"
                    type="button"
                    class="rounded-full border-2 p-1 transition-all"
                    :class="profileState.avatarId === avatar
                    ? 'border-[var(--arcade-neon-cyan)] scale-110'
                    : 'border-transparent opacity-70 hover:opacity-100'"
                    @click="profileState.avatarId = avatar"
                >
                  <img
                      :src="`/avatars/avatar-${avatar}.png`"
                      :alt="`Avatar ${avatar}`"
                      class="w-12 h-12 rounded-full object-cover"
                  >
                </button>
              </div>
            </div>
          </div>

          <UFormField name="username" label="Username">
            <UInput
                v-model="profileState.username"
                placeholder="Enter your username"
                class="font-retro"
            />
          </UFormField>

          <UFormField name="bio" label="Bio">
            <UTextarea
                v-model="profileState.bio"
                placeholder="Tell other players something about yourself"
                :rows="5"
                class="font-retro"
            />
          </UFormField>

          <div class="flex justify-end gap-3 pt-4">
            <UButton
                color="neutral"
                variant="ghost"
                class="font-retro"
                to="/profile"
            >
              Cancel
            </UButton>

            <UButton
                type="submit"
                color="primary"
                class="font-retro"
                :loading="isSavingProfile"
            >
              Save Profile
            </UButton>
          </div>
        </UForm>
      </div>
    </UContainer>
  </div>
</template>