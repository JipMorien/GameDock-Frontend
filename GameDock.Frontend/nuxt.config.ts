export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['./app/assets/css/main.css'],
  app: {
    head: {
      title: 'Pixel Arena - Retro Gaming',
      meta: [
        { name: 'description', content: 'Play classic arcade games with a modern twist. Compete with friends, climb the leaderboards, and relive the golden age of gaming.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap' }
      ]
    }
  }
})
