import { expect, test, type Page } from '@playwright/test'

test.setTimeout(60000)

async function login(page: Page) {
    await page.goto('/')

    await page.getByRole('button', { name: 'Sign In' }).click()

    await page.getByLabel('Email').fill('test@gmail.com')
    await page.getByLabel('Password').fill('Password')

    await page.getByRole('button', { name: 'INSERT COIN TO PLAY' }).click()

    await expect(page.getByText('Welcome Back, Player!')).not.toBeVisible()
}

test('new forum post appears in another browser without refresh through SignalR', async ({ browser }) => {
    const contextA = await browser.newContext()
    const contextB = await browser.newContext()

    const pageA = await contextA.newPage()
    const pageB = await contextB.newPage()

    pageA.on('console', msg => console.log(`PAGE A: ${msg.text()}`))
    pageB.on('console', msg => console.log(`PAGE B: ${msg.text()}`))

    await login(pageA)
    await login(pageB)

    await pageA.goto('/forum')
    await pageB.goto('/forum')

    await expect(pageA).toHaveURL(/forum/)
    await expect(pageB).toHaveURL(/forum/)

    await pageA.waitForTimeout(1500)
    await pageB.waitForTimeout(1500)

    const postContent = `SignalR E2E post ${Date.now()}`

    const postInput = pageA.getByPlaceholder(
        'Share your thoughts, tips, or questions with the community.'
    )

    await postInput.fill(postContent)
    console.log(
        'TEXTAREA VALUE:',
        await postInput.inputValue()
    )
    
    await expect(postInput).toHaveValue(postContent)
    
    const postButton = pageA.getByRole('button', { name: 'POST', exact: true })

    console.log(
        'BUTTON DISABLED:',
        await postButton.isDisabled()
    )
    
    await expect(postButton).toBeEnabled({
        timeout: 10000,
    })    
    
    await postButton.click()

    await expect(pageA.getByText(postContent)).toBeVisible()

    await expect(pageB.getByText(postContent)).toBeVisible({
        timeout: 20000,
    })
})