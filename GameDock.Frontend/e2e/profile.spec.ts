import { expect, test } from '@playwright/test'

async function login(page) {
    await page.goto('/')

    await page.getByRole('button', { name: 'Sign In' }).click()

    await page.getByLabel('Email').fill('test@gmail.com')
    await page.getByLabel('Password').fill('Password')

    await page.getByRole('button', { name: 'INSERT COIN TO PLAY' }).click()

    await expect(page.getByText('Welcome Back, Player!')).not.toBeVisible()
}

test('logged in user can view profile page', async ({ page }) => {
    await login(page)

    await page.goto('/profile')

    await expect(page.getByText('Edit Profile')).toBeVisible()
    await expect(page.getByText('GAMES PLAYED')).toBeVisible()
    await expect(page.getByText('GLOBAL RANK')).toBeVisible()
    await expect(page.getByText('Could not load profile.')).not.toBeVisible()
})