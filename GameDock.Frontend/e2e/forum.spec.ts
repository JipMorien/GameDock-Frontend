import { expect, test, type Page } from '@playwright/test'

async function login(page: Page) {
    await page.goto('/')

    await page.getByRole('button', { name: 'Sign In' }).click()

    await page.getByLabel('Email').fill('test@gmail.com')
    await page.getByLabel('Password').fill('Password')

    await page.getByRole('button', { name: 'INSERT COIN TO PLAY' }).click()

    await expect(page.getByText('Welcome Back, Player!')).not.toBeVisible()
}

test('logged in user can create a forum post', async ({ page }) => {
    await login(page)

    const postContent = `E2E forum post ${Date.now()}`

    const token = await page.evaluate(() => localStorage.getItem('token'))

    expect(token).toBeTruthy()

    const response = await page.request.post('https://api.gamedoc.tech/api/posts', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            postId: 0,
            title: 'Forum Post',
            content: postContent,
            createdAt: new Date().toISOString(),
            userId: 1,
        },
    })

    expect(response.ok()).toBeTruthy()

    await page.goto('/forum')

    await expect(page.getByText(postContent)).toBeVisible()
})