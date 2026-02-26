const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox', { name: 'Username' }).fill('root')
    await page.getByRole('textbox', { name: 'Password' }).fill('sekret')
    await page.getByRole('button', { name: 'login' }).click()

    const locator = page.getByText('root logged in')
    await expect(locator).toBeVisible()
  })
})
