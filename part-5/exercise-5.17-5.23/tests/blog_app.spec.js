const { test, describe, expect } = require('@playwright/test')

describe('Blog app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox', { name: 'Username' }).fill('root')
    await page.getByRole('textbox', { name: 'Password' }).fill('sekret')
    await page.getByRole('button', { name: 'login' }).click()

    const locator = page.getByText('root logged in')
    await expect(locator).toBeVisible()
  })
})