import { expect, test } from '@playwright/test'

test('user can open a game detail page', async ({ page }) => {
    await page.goto('/games')

    await expect(page.getByRole('heading', { name: 'GAMES' })).toBeVisible()

    await page.getByRole('link', { name: /A Blind Step/ }).click()

    await expect(page).toHaveURL(/\/games\/a-blind-step/)
    await expect(page.getByRole('heading', { name: 'A Blind Step' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Fullscreen' })).toBeVisible()
})