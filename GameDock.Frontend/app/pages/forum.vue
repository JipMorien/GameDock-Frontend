<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  title: 'Forum',
})

// Post schema - max 500 characters per FR-09
const postSchema = z.object({
  content: z.string().min(1, 'Post cannot be empty').max(500, 'Post cannot exceed 500 characters'),
})

type PostSchema = z.output<typeof postSchema>

const newPostState = reactive({
  content: '',
})

const replyState = reactive<{ [key: number]: string }>({})

const isPosting = ref(false)
const replyingTo = ref<number | null>(null)

// Simulated forum posts (would come from your .NET backend)
const posts = ref([
  {
    id: 1,
    author: {
      username: 'PixelMaster99',
      avatar: '/placeholder-user.jpg',
      level: 23,
    },
    content: 'Just hit a new high score of 50,000! Anyone else grinding the leaderboards this weekend?',
    createdAt: '2 hours ago',
    likes: 15,
    liked: false,
    comments: [
      {
        id: 101,
        author: { username: 'RetroKing', avatar: '/placeholder-user.jpg', level: 18 },
        content: 'Nice! I am stuck at 45k. Any tips?',
        createdAt: '1 hour ago',
        likes: 3,
        liked: false,
      },
      {
        id: 102,
        author: { username: 'ArcadeQueen', avatar: '/placeholder-user.jpg', level: 31 },
        content: 'Focus on combo chains in the second stage. Game changer!',
        createdAt: '45 minutes ago',
        likes: 7,
        liked: true,
      },
    ],
  },
  {
    id: 2,
    author: {
      username: 'NeonNinja',
      avatar: '/placeholder-user.jpg',
      level: 15,
    },
    content: 'Looking for players to team up with. I usually play in the evenings (CET). Drop a comment if interested!',
    createdAt: '5 hours ago',
    likes: 8,
    liked: true,
    comments: [
      {
        id: 201,
        author: { username: 'GameMaster', avatar: '/placeholder-user.jpg', level: 27 },
        content: 'Count me in! Sent you a friend request.',
        createdAt: '4 hours ago',
        likes: 2,
        liked: false,
      },
    ],
  },
  {
    id: 3,
    author: {
      username: 'GameMaster',
      avatar: '/placeholder-user.jpg',
      level: 27,
    },
    content: 'Pro tip: The secret level unlocks after you complete stage 5 without losing a life. Took me forever to figure this out!',
    createdAt: 'Yesterday',
    likes: 42,
    liked: false,
    comments: [],
  },
])

const characterCount = computed(() => newPostState.content.length)
const characterCountClass = computed(() => {
  if (characterCount.value > 450) return 'text-red-500'
  if (characterCount.value > 400) return 'text-yellow-500'
  return 'text-muted'
})

async function onSubmitPost(event: FormSubmitEvent<PostSchema>) {
  isPosting.value = true
  
  // Simulate API call to your .NET backend
  // await $fetch('/api/forum/posts', { method: 'POST', body: event.data })
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  posts.value.unshift({
    id: Date.now(),
    author: {
      username: 'You',
      avatar: '/placeholder-user.jpg',
      level: 1,
    },
    content: event.data.content,
    createdAt: 'Just now',
    likes: 0,
    liked: false,
    comments: [],
  })
  
  newPostState.content = ''
  isPosting.value = false
}

async function submitReply(postId: number) {
  const content = replyState[postId]
  if (!content || content.length === 0 || content.length > 500) return
  
  // Simulate API call
  // await $fetch(`/api/forum/posts/${postId}/comments`, { method: 'POST', body: { content } })
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.comments.push({
      id: Date.now(),
      author: { username: 'You', avatar: '/placeholder-user.jpg', level: 1 },
      content,
      createdAt: 'Just now',
      likes: 0,
      liked: false,
    })
  }
  
  replyState[postId] = ''
  replyingTo.value = null
}

function toggleLike(post: typeof posts.value[0]) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function toggleCommentLike(comment: typeof posts.value[0]['comments'][0]) {
  comment.liked = !comment.liked
  comment.likes += comment.liked ? 1 : -1
}
</script>

<template>
  <div class="min-h-screen py-8">
    <UContainer>
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="font-pixel text-xl text-[var(--arcade-neon-cyan)] neon-text-cyan mb-2">FORUM</h1>
        <p class="font-retro text-lg text-muted">Connect with the GameDock community</p>
      </div>

      <!-- New Post Form -->
      <div class="game-container rounded-lg p-6 mb-8">
        <h2 class="font-pixel text-sm text-[var(--arcade-neon-pink)] mb-4">CREATE A POST</h2>
        <UForm :schema="postSchema" :state="newPostState" @submit="onSubmitPost">
          <UFormField name="content">
            <UTextarea
              v-model="newPostState.content"
              placeholder="Share your thoughts, tips, or questions with the community..."
              :rows="4"
              class="font-retro"
            />
          </UFormField>
          <div class="flex items-center justify-between mt-3">
            <span :class="['font-retro text-sm', characterCountClass]">
              {{ characterCount }}/500 characters
            </span>
            <UButton
              type="submit"
              :loading="isPosting"
              :disabled="characterCount === 0 || characterCount > 500"
              class="font-pixel text-xs bg-[var(--arcade-neon-pink)] hover:bg-[var(--arcade-neon-pink)]/80 text-white arcade-btn"
            >
              POST
            </UButton>
          </div>
        </UForm>
      </div>

      <!-- Posts List -->
      <div class="space-y-6">
        <div
          v-for="post in posts"
          :key="post.id"
          class="game-container rounded-lg p-6"
        >
          <!-- Post Header -->
          <div class="flex items-start gap-4 mb-4">
            <NuxtLink :to="`/profile/${post.author.username}`">
              <UAvatar
                :src="post.author.avatar"
                :alt="post.author.username"
                size="md"
                class="ring-2 ring-[var(--arcade-neon-cyan)]"
              />
            </NuxtLink>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <NuxtLink :to="`/profile/${post.author.username}`" class="font-retro text-lg text-white hover:text-[var(--arcade-neon-cyan)] transition-colors">
                  {{ post.author.username }}
                </NuxtLink>
                <UBadge variant="subtle" size="sm" class="font-pixel text-xs">
                  LVL {{ post.author.level }}
                </UBadge>
              </div>
              <p class="font-retro text-sm text-muted">{{ post.createdAt }}</p>
            </div>
          </div>

          <!-- Post Content -->
          <p class="font-retro text-lg text-white mb-4 whitespace-pre-wrap">{{ post.content }}</p>

          <!-- Post Actions -->
          <div class="flex items-center gap-4 mb-4">
            <UButton
              variant="ghost"
              size="sm"
              :class="post.liked ? 'text-[var(--arcade-neon-pink)]' : 'text-muted'"
              @click="toggleLike(post)"
            >
              <UIcon :name="post.liked ? 'i-lucide-heart' : 'i-lucide-heart'" class="size-4 mr-1" />
              <span class="font-retro">{{ post.likes }}</span>
            </UButton>
            <UButton
              variant="ghost"
              size="sm"
              class="text-muted"
              @click="replyingTo = replyingTo === post.id ? null : post.id"
            >
              <UIcon name="i-lucide-message-circle" class="size-4 mr-1" />
              <span class="font-retro">{{ post.comments.length }}</span>
            </UButton>
          </div>

          <!-- Comments -->
          <div v-if="post.comments.length > 0" class="border-t border-[var(--arcade-neon-cyan)]/10 pt-4 space-y-4">
            <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="flex gap-3 pl-4 border-l-2 border-[var(--arcade-neon-cyan)]/20"
            >
              <NuxtLink :to="`/profile/${comment.author.username}`">
                <UAvatar
                  :src="comment.author.avatar"
                  :alt="comment.author.username"
                  size="sm"
                  class="ring-1 ring-[var(--arcade-neon-cyan)]/50"
                />
              </NuxtLink>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <NuxtLink :to="`/profile/${comment.author.username}`" class="font-retro text-sm text-white hover:text-[var(--arcade-neon-cyan)]">
                    {{ comment.author.username }}
                  </NuxtLink>
                  <span class="font-retro text-xs text-muted">{{ comment.createdAt }}</span>
                </div>
                <p class="font-retro text-sm text-muted mb-2">{{ comment.content }}</p>
                <UButton
                  variant="ghost"
                  size="xs"
                  :class="comment.liked ? 'text-[var(--arcade-neon-pink)]' : 'text-muted'"
                  @click="toggleCommentLike(comment)"
                >
                  <UIcon name="i-lucide-heart" class="size-3 mr-1" />
                  <span class="font-retro text-xs">{{ comment.likes }}</span>
                </UButton>
              </div>
            </div>
          </div>

          <!-- Reply Form -->
          <div v-if="replyingTo === post.id" class="mt-4 pt-4 border-t border-[var(--arcade-neon-cyan)]/10">
            <div class="flex gap-3">
              <UAvatar src="/placeholder-user.jpg" alt="You" size="sm" />
              <div class="flex-1">
                <UTextarea
                  v-model="replyState[post.id]"
                  placeholder="Write a comment..."
                  :rows="2"
                  class="font-retro mb-2"
                />
                <div class="flex items-center justify-between">
                  <span class="font-retro text-xs text-muted">
                    {{ (replyState[post.id]?.length || 0) }}/500
                  </span>
                  <div class="flex gap-2">
                    <UButton
                      variant="ghost"
                      size="sm"
                      class="font-retro"
                      @click="replyingTo = null"
                    >
                      Cancel
                    </UButton>
                    <UButton
                      size="sm"
                      :disabled="!replyState[post.id] || replyState[post.id].length > 500"
                      class="font-pixel text-xs bg-[var(--arcade-neon-cyan)] hover:bg-[var(--arcade-neon-cyan)]/80 text-black"
                      @click="submitReply(post.id)"
                    >
                      REPLY
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center mt-8">
        <UButton variant="ghost" class="font-retro text-[var(--arcade-neon-cyan)]">
          Load More Posts
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
