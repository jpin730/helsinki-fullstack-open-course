const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpass',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
    await page.getByRole('textbox', { name: 'Password' }).fill('testpass')
    await page.getByRole('button', { name: 'login' }).click()

    const locator = page.getByText('Test User logged in')
    await expect(locator).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
      await page.getByRole('textbox', { name: 'Password' }).fill('testpass')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox', { name: 'Title' }).fill('a blog created by playwright')
      await page.getByRole('textbox', { name: 'Author' }).fill('playwright')
      await page.getByRole('textbox', { name: 'URL' }).fill('http://example.com')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(
        page.getByText('Blog "a blog created by playwright" created successfully'),
      ).toBeVisible()
    })
  })
})
