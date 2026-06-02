import { expect, test } from '@playwright/test'

test('user can log in', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Sign In' }).click()

    await expect(page.getByText('Welcome Back, Player!')).toBeVisible()

    await page.getByLabel('Email').fill('test@gmail.com')
    await page.getByLabel('Password').fill('Password')

    await page.getByRole('button', { name: 'INSERT COIN TO PLAY' }).click()

    await expect(page.getByText('Welcome Back, Player!')).not.toBeVisible()
})