<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits<{
  success: []
  switchToRegister: []
}>()

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: '',
})

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  
  // Simulate API call to your .NET backend
  // In production, this would be: await $fetch('/api/auth/login', { method: 'POST', body: event.data })
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  loading.value = false
  emit('success')
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField name="email" label="Email">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="player@gamedock.com"
        icon="i-lucide-mail"
        class="font-retro"
      />
    </UFormField>

    <UFormField name="password" label="Password">
      <UInput
        v-model="state.password"
        type="password"
        placeholder="Enter your password"
        icon="i-lucide-lock"
        class="font-retro"
      />
    </UFormField>

    <div class="flex items-center justify-between">
      <UCheckbox label="Remember me" class="font-retro text-sm" />
      <UButton variant="link" size="sm" class="font-retro">
        Forgot password?
      </UButton>
    </div>

    <UButton
      type="submit"
      block
      :loading="loading"
      class="font-pixel text-xs bg-[var(--arcade-neon-cyan)] hover:bg-[var(--arcade-neon-cyan)]/80 text-black arcade-btn"
    >
      INSERT COIN TO PLAY
    </UButton>

    <USeparator label="OR" />

    <div class="text-center">
      <span class="text-muted font-retro">New to the arcade?</span>
      <UButton variant="link" class="font-retro text-[var(--arcade-neon-pink)]" @click="emit('switchToRegister')">
        Create Account
      </UButton>
    </div>
  </UForm>
</template>
