const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByRole('textbox', { name: 'Username' }).fill(username)
  await page.getByRole('textbox', { name: 'Password' }).fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByRole('textbox', { name: 'Title' }).fill(title)
  await page.getByRole('textbox', { name: 'Author' }).fill(author)
  await page.getByRole('textbox', { name: 'URL' }).fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const likeBlog = async (blogContainer) => {
  const page = blogContainer.page()

  const response = page.waitForResponse(
    (res) => res.url().includes('/api/blogs') && res.request().method() === 'PUT',
  )
  await blogContainer.getByRole('button', { name: 'like' }).click()
  await response
}

module.exports = { loginWith, createBlog, likeBlog }
