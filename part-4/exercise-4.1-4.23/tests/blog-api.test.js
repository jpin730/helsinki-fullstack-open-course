const { after, beforeEach, test } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const HTTP_STATUS = require('../consts/http-status');
const Blog = require('../models/blog');
const helper = require('./test-helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.BLOGS);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(HTTP_STATUS.OK)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.BLOGS.length);
});

test('unique identifier of blogs is named id', async () => {
  const response = await api.get('/api/blogs');

  const blog = response.body.at(0);
  assert.ok(blog.id);
  assert.strictEqual(blog._id, undefined);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'https://test.com',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(HTTP_STATUS.CREATED)
    .expect('Content-Type', /application\/json/);

  const blogsInDb = await helper.getBlogsInDb();
  assert.strictEqual(blogsInDb.length, helper.BLOGS.length + 1);

  const titles = blogsInDb.map((blog) => blog.title);
  assert(titles.includes(newBlog.title));
});

test('blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Test blog without likes',
    author: 'Test author',
    url: 'https://test.com',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(HTTP_STATUS.CREATED)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.likes, 0);

  const blogsInDb = await helper.getBlogsInDb();
  const addedBlog = blogsInDb.find((blog) => blog.id === response.body.id);
  assert.strictEqual(addedBlog.likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
