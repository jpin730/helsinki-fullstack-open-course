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

after(async () => {
  await mongoose.connection.close();
});
