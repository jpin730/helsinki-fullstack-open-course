const { test, describe, beforeEach, expect } = require('@playwright/test')

const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpass',
      },
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('Blogs')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'testuser', 'testpass')

    await expect(page.getByText('Test User logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'testuser', 'wrongpass')

    const notification = page.getByText('invalid username or password')
    await expect(notification).toBeVisible()
    await expect(notification).toHaveCSS('border', '2px solid rgb(255, 0, 0)')
    await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Test User logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testpass')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'a blog created by playwright',
        author: 'playwright',
        url: 'http://example.com',
      })

      await expect(
        page.getByText('Blog "a blog created by playwright" created successfully'),
      ).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: 'a blog created by playwright',
          author: 'playwright',
          url: 'http://example.com',
        })
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('1 likes')).toBeVisible()
      })
    })
  })
})
