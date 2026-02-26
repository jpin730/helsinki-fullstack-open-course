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

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
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

    describe('and several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: 'blog 1',
          author: 'playwright',
          url: 'http://example.com',
        })
        await createBlog(page, {
          title: 'blog 2',
          author: 'playwright',
          url: 'http://example.com',
        })
      })

      test('one of those blogs can be liked', async ({ page }) => {
        const blogContainer = page.getByRole('article').filter({ hasText: 'blog 1 playwright' })
        await page.pause()
        await blogContainer.getByRole('button', { name: 'view' }).click()
        await blogContainer.getByRole('button', { name: 'like' }).click()

        await expect(blogContainer.getByText('1 likes')).toBeVisible()
      })
    })
  })
})
