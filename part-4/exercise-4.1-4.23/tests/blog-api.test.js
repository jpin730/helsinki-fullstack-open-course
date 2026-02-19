const { after, beforeEach, test } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const HTTP_STATUS = require('../consts/http-status');
const Blog = require('../models/blog');
const { BLOGS } = require('./test-helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(BLOGS);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(HTTP_STATUS.OK)
    .expect('Content-Type', /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
