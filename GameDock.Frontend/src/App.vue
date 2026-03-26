<script setup>
import { ref, onMounted } from 'vue'

const message = ref('Loading...')

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5177/api/test')
    const data = await response.json()
    message.value = `${data.message} - ${data.time}`
  } catch (err) {
    message.value = 'Error connecting to backend'
    console.error(err)
  }
})
</script>

<template>
  <h1>GameDock Test</h1>
  <p>{{ message }}</p>
</template>