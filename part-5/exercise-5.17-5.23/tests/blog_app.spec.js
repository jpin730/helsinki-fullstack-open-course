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
    await expect(page.getByText('Blogs')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
    await page.getByRole('textbox', { name: 'Password' }).fill('testpass')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Test User logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpass')
    await page.getByRole('button', { name: 'login' }).click()

    const notification = page.getByText('invalid username or password')
    await expect(notification).toBeVisible()
    await expect(notification).toHaveCSS('border', '2px solid rgb(255, 0, 0)')
    await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Test User logged in')).not.toBeVisible()
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

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByRole('textbox', { name: 'Title' }).fill('a blog created by playwright')
        await page.getByRole('textbox', { name: 'Author' }).fill('playwright')
        await page.getByRole('textbox', { name: 'URL' }).fill('http://example.com')
        await page.getByRole('button', { name: 'create' }).click()
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('1 likes')).toBeVisible()
      })
    })
  })
})
