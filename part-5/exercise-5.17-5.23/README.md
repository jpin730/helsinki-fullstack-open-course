# Exercise 5.17-5.23

End-to-end tests for the Blog List application using [Playwright](https://playwright.dev/).

## Prerequisites

Both the backend (part 4) and the frontend (exercise 5.1-5.16) must be running before executing the tests. The backend must expose a `/api/testing/reset` endpoint (testing mode) for the tests to reset state between runs.

Start the backend:

```bash
cd ../../part-4/exercise-4.1-4.23
npm run start:test
```

Start the frontend:

```bash
cd ../exercise-5.1-5.16
npm run dev
```

## Setup

Install the dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npm test
```

View the HTML test report after a run:

```bash
npm run test:report
```

## Project Structure

```text
tests/
  blog_app.spec.js   # Main test suite
  helper.js          # Shared helpers: loginWith, createBlog, likeBlog
playwright.config.mjs
```

## Configuration

Tests run against `http://localhost:5173` using Chromium (Desktop Chrome). Parallel execution is disabled to keep test state predictable.
