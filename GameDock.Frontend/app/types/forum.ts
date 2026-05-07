export interface ForumAuthor {
    username: string
    avatar: string
    level: number
}

export interface ForumComment {
    id: number
    author: ForumAuthor
    content: string
    createdAt: string
    likes: number
    liked: boolean
}

export interface ForumPost {
    id: number
    author: ForumAuthor
    content: string
    createdAt: string
    likes: number
    liked: boolean
    comments: ForumComment[]
}