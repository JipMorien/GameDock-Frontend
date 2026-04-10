<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits<{
  success: []
  switchToLogin: []
}>()

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type Schema = z.output<typeof schema>

const state = reactive({
  username: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  
  // Simulate API call to your .NET backend
  // In production, this would be: await $fetch('/api/auth/register', { method: 'POST', body: event.data })
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  loading.value = false
  emit('success')
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField name="username" label="Player Name">
      <UInput
        v-model="state.username"
        placeholder="xX_ProGamer_Xx"
        icon="i-lucide-user"
        class="font-retro"
      />
    </UFormField>

    <UFormField name="email" label="Email">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="player@gamedock.com"
        icon="i-lucide-mail"
        class="font-retro"
      />
    </UFormField>

    <UFormField name="phoneNumber" label="Phone Number">
      <UInput
        v-model="state.phoneNumber"
        type="tel"
        placeholder="0612345678"
        icon="i-lucide-phone"
        class="font-retro"
      />
    </UFormField>

    <UFormField name="password" label="Password">
      <template #hint>
        <span class="text-xs text-muted">Min 8 chars, 1 uppercase</span>
      </template>
      <UInput
        v-model="state.password"
        type="password"
        placeholder="Create a strong password"
        icon="i-lucide-lock"
        class="font-retro"
      />
    </UFormField>

    <UFormField name="confirmPassword" label="Confirm Password">
      <UInput
        v-model="state.confirmPassword"
        type="password"
        placeholder="Confirm your password"
        icon="i-lucide-lock"
        class="font-retro"
      />
    </UFormField>

    <UButton
      type="submit"
      block
      :loading="loading"
      class="font-pixel text-xs bg-[var(--arcade-neon-pink)] hover:bg-[var(--arcade-neon-pink)]/80 text-white arcade-btn"
    >
      CREATE PLAYER
    </UButton>

    <USeparator label="OR" />

    <div class="text-center">
      <span class="text-muted font-retro">Already have an account?</span>
      <UButton variant="link" class="font-retro text-[var(--arcade-neon-cyan)]" @click="emit('switchToLogin')">
        Sign In
      </UButton>
    </div>
  </UForm>
</template>
