const { test, describe, beforeEach, expect } = require('@playwright/test')

const { loginWith, createBlog, likeBlog } = require('./helper')

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'testpass')

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrongpass')

      const notification = page.getByText('invalid username or password')
      await expect(notification).toBeVisible()
      await expect(notification).toHaveCSS('border', '2px solid rgb(255, 0, 0)')
      await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
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
      await expect(
        page.getByRole('article').filter({ hasText: 'a blog created by playwright playwright' }),
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
        await blogContainer.getByRole('button', { name: 'view' }).click()
        await likeBlog(blogContainer)

        await expect(blogContainer.getByText('1 likes')).toBeVisible()
      })

      test('blogs are arranged in order according to likes, most likes first', async ({ page }) => {
        const blog2Container = page.getByRole('article').filter({ hasText: 'blog 2 playwright' })
        await blog2Container.getByRole('button', { name: 'view' }).click()
        await likeBlog(blog2Container)
        await likeBlog(blog2Container)

        const blog1Container = page.getByRole('article').filter({ hasText: 'blog 1 playwright' })
        await blog1Container.getByRole('button', { name: 'view' }).click()
        await likeBlog(blog1Container)

        const articles = page.getByRole('article')
        await expect(articles.nth(0)).toContainText('blog 2')
        await expect(articles.nth(1)).toContainText('blog 1')
      })

      test('one of those blogs can be deleted by the user who created it', async ({ page }) => {
        const blogContainer = page.getByRole('article').filter({ hasText: 'blog 1 playwright' })
        await blogContainer.getByRole('button', { name: 'view' }).click()

        page.once('dialog', async (dialog) => {
          expect(dialog.message()).toBe('Remove blog "blog 1" by playwright?')
          await dialog.accept()

          await blogContainer.getByRole('button', { name: 'remove' }).click()

          await expect(page.getByText('Blog "blog 1" deleted successfully')).toBeVisible()
          await expect(blogContainer).not.toBeVisible()
        })
      })
    })
  })
})
