import type { ForumComment, ForumPost } from '~/types/forum'

interface BackendPost {
    postId: number
    title: string
    content: string
    createdAt: string
    userId: number
}

export const useForum = async () => {
    const api = useApi()

    const {
        data,
        pending,
        error,
        refresh
    } = await useAsyncData(
        'forum-posts',
        () => api<BackendPost[]>('/posts')
    )

    const posts = computed<ForumPost[]>(() => {
        return (data.value ?? []).map(post => ({
            id: post.postId,
            author: {
                username: `User ${post.userId}`,
                avatar: '/placeholder-user.jpg',
                level: 1,
            },
            content: post.content,
            createdAt: new Date(post.createdAt).toLocaleString(),
            likes: 0,
            liked: false,
            comments: [],
        }))
    })

    async function addPost(content: string) {
        await api<BackendPost>('/posts', {
            method: 'POST',
            body: {
                postId: 0,
                title: 'Forum Post',
                content,
                createdAt: new Date().toISOString(),
                userId: 1,
            },
        })

        await refresh()
    }

    function addReply(postId: number, content: string) {
        const post = posts.value.find(p => p.id === postId)

        if (!post) return

        post.comments.push({
            id: Date.now(),
            author: {
                username: 'You',
                avatar: '/placeholder-user.jpg',
                level: 1,
            },
            content,
            createdAt: 'Just now',
            likes: 0,
            liked: false,
        })
    }

    function toggleLike(post: ForumPost) {
        post.liked = !post.liked
        post.likes += post.liked ? 1 : -1
    }

    function toggleCommentLike(comment: ForumComment) {
        comment.liked = !comment.liked
        comment.likes += comment.liked ? 1 : -1
    }

    return {
        posts,
        pending,
        error,
        addPost,
        addReply,
        toggleLike,
        toggleCommentLike,
    }
}