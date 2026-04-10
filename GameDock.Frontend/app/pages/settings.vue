<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  title: 'Settings',
})

const toast = useToast()

// Profile settings schema
const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters'),
  email: z.string().email('Invalid email address'),
})

// Password change schema - matching FR-01.3
const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type ProfileSchema = z.output<typeof profileSchema>
type PasswordSchema = z.output<typeof passwordSchema>

// Simulated user data (would come from your .NET backend)
const profileState = reactive({
  username: 'PixelMaster99',
  email: 'player@gamedock.com',
})

const passwordState = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const isSavingProfile = ref(false)
const isSavingPassword = ref(false)
const activeTab = ref('profile')

const tabs = [
  { label: 'Profile', value: 'profile', icon: 'i-lucide-user' },
  { label: 'Security', value: 'security', icon: 'i-lucide-shield' },
  { label: 'Notifications', value: 'notifications', icon: 'i-lucide-bell' },
]

// Notification settings
const notifications = reactive({
  emailNotifications: true,
  friendRequests: true,
  forumReplies: true,
  leaderboardUpdates: false,
  newsletter: false,
})

async function onSaveProfile(event: FormSubmitEvent<ProfileSchema>) {
  isSavingProfile.value = true
  
  // Simulate API call to your .NET backend
  // await $fetch('/api/user/profile', { method: 'PUT', body: event.data })
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  isSavingProfile.value = false
  toast.add({
    title: 'Profile Updated',
    description: 'Your profile has been saved successfully.',
    icon: 'i-lucide-check-circle',
    color: 'success',
  })
}

async function onChangePassword(event: FormSubmitEvent<PasswordSchema>) {
  isSavingPassword.value = true
  
  // Simulate API call to your .NET backend
  // await $fetch('/api/user/password', { method: 'PUT', body: event.data })
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  passwordState.currentPassword = ''
  passwordState.newPassword = ''
  passwordState.confirmPassword = ''
  
  isSavingPassword.value = false
  toast.add({
    title: 'Password Changed',
    description: 'Your password has been updated successfully.',
    icon: 'i-lucide-check-circle',
    color: 'success',
  })
}

async function saveNotifications() {
  // Simulate API call
  // await $fetch('/api/user/notifications', { method: 'PUT', body: notifications })
  await new Promise(resolve => setTimeout(resolve, 500))
  
  toast.add({
    title: 'Notifications Updated',
    description: 'Your notification preferences have been saved.',
    icon: 'i-lucide-check-circle',
    color: 'success',
  })
}
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer class="max-w-3xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="font-pixel text-xl text-[var(--arcade-neon-cyan)] neon-text-cyan mb-2">SETTINGS</h1>
        <p class="font-retro text-lg text-muted">Manage your account settings</p>
      </div>

      <!-- Settings Tabs -->
      <UTabs v-model="activeTab" :items="tabs" class="mb-6" />

      <!-- Profile Settings -->
      <div v-if="activeTab === 'profile'" class="game-container rounded-lg p-6">
        <h2 class="font-pixel text-sm text-[var(--arcade-neon-pink)] mb-6">PROFILE SETTINGS</h2>
        
        <!-- Avatar Section -->
        <div class="flex items-center gap-6 mb-8 pb-6 border-b border-[var(--arcade-neon-cyan)]/10">
          <div class="relative">
            <UAvatar
              src="/placeholder-user.jpg"
              alt="Your avatar"
              size="3xl"
              class="ring-4 ring-[var(--arcade-neon-cyan)]"
            />
          </div>
          <div>
            <p class="font-retro text-lg text-white mb-2">Profile Picture</p>
            <p class="font-retro text-sm text-muted mb-3">Upload a new avatar image</p>
            <UButton variant="outline" size="sm" class="font-retro">
              <UIcon name="i-lucide-upload" class="size-4 mr-2" />
              Upload Image
            </UButton>
          </div>
        </div>

        <!-- Profile Form -->
        <UForm :schema="profileSchema" :state="profileState" class="space-y-6" @submit="onSaveProfile">
          <UFormField name="username" label="Username">
            <template #hint>
              <span class="text-xs text-muted">Must be unique</span>
            </template>
            <UInput
              v-model="profileState.username"
              placeholder="Enter your username"
              icon="i-lucide-user"
              class="font-retro"
            />
          </UFormField>

          <UFormField name="email" label="Email Address">
            <UInput
              v-model="profileState.email"
              type="email"
              placeholder="Enter your email"
              icon="i-lucide-mail"
              class="font-retro"
            />
          </UFormField>

          <div class="pt-4">
            <UButton
              type="submit"
              :loading="isSavingProfile"
              class="font-pixel text-xs bg-[var(--arcade-neon-cyan)] hover:bg-[var(--arcade-neon-cyan)]/80 text-black arcade-btn"
            >
              SAVE CHANGES
            </UButton>
          </div>
        </UForm>
      </div>

      <!-- Security Settings -->
      <div v-if="activeTab === 'security'" class="game-container rounded-lg p-6">
        <h2 class="font-pixel text-sm text-[var(--arcade-neon-pink)] mb-6">CHANGE PASSWORD</h2>
        
        <UForm :schema="passwordSchema" :state="passwordState" class="space-y-6" @submit="onChangePassword">
          <UFormField name="currentPassword" label="Current Password">
            <UInput
              v-model="passwordState.currentPassword"
              type="password"
              placeholder="Enter your current password"
              icon="i-lucide-lock"
              class="font-retro"
            />
          </UFormField>

          <UFormField name="newPassword" label="New Password">
            <template #hint>
              <span class="text-xs text-muted">Min 8 chars, 1 uppercase</span>
            </template>
            <UInput
              v-model="passwordState.newPassword"
              type="password"
              placeholder="Enter your new password"
              icon="i-lucide-lock"
              class="font-retro"
            />
          </UFormField>

          <UFormField name="confirmPassword" label="Confirm New Password">
            <UInput
              v-model="passwordState.confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              icon="i-lucide-lock"
              class="font-retro"
            />
          </UFormField>

          <div class="pt-4">
            <UButton
              type="submit"
              :loading="isSavingPassword"
              class="font-pixel text-xs bg-[var(--arcade-neon-pink)] hover:bg-[var(--arcade-neon-pink)]/80 text-white arcade-btn"
            >
              UPDATE PASSWORD
            </UButton>
          </div>
        </UForm>

        <!-- Danger Zone -->
        <div class="mt-8 pt-6 border-t border-red-500/20">
          <h3 class="font-pixel text-sm text-red-500 mb-4">DANGER ZONE</h3>
          <div class="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div>
              <p class="font-retro text-lg text-white">Delete Account</p>
              <p class="font-retro text-sm text-muted">Permanently delete your account and all data</p>
            </div>
            <UButton variant="outline" color="error" class="font-retro">
              Delete Account
            </UButton>
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div v-if="activeTab === 'notifications'" class="game-container rounded-lg p-6">
        <h2 class="font-pixel text-sm text-[var(--arcade-neon-pink)] mb-6">NOTIFICATION PREFERENCES</h2>
        
        <div class="space-y-6">
          <div class="flex items-center justify-between py-3 border-b border-[var(--arcade-neon-cyan)]/10">
            <div>
              <p class="font-retro text-lg text-white">Email Notifications</p>
              <p class="font-retro text-sm text-muted">Receive notifications via email</p>
            </div>
            <USwitch v-model="notifications.emailNotifications" @update:model-value="saveNotifications" />
          </div>

          <div class="flex items-center justify-between py-3 border-b border-[var(--arcade-neon-cyan)]/10">
            <div>
              <p class="font-retro text-lg text-white">Friend Requests</p>
              <p class="font-retro text-sm text-muted">Notify when someone sends a friend request</p>
            </div>
            <USwitch v-model="notifications.friendRequests" @update:model-value="saveNotifications" />
          </div>

          <div class="flex items-center justify-between py-3 border-b border-[var(--arcade-neon-cyan)]/10">
            <div>
              <p class="font-retro text-lg text-white">Forum Replies</p>
              <p class="font-retro text-sm text-muted">Notify when someone replies to your posts</p>
            </div>
            <USwitch v-model="notifications.forumReplies" @update:model-value="saveNotifications" />
          </div>

          <div class="flex items-center justify-between py-3 border-b border-[var(--arcade-neon-cyan)]/10">
            <div>
              <p class="font-retro text-lg text-white">Leaderboard Updates</p>
              <p class="font-retro text-sm text-muted">Notify when your rank changes</p>
            </div>
            <USwitch v-model="notifications.leaderboardUpdates" @update:model-value="saveNotifications" />
          </div>

          <div class="flex items-center justify-between py-3">
            <div>
              <p class="font-retro text-lg text-white">Newsletter</p>
              <p class="font-retro text-sm text-muted">Receive updates about GameDock</p>
            </div>
            <USwitch v-model="notifications.newsletter" @update:model-value="saveNotifications" />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
