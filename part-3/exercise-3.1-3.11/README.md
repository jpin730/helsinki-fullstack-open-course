# Exercise 3.1-3.11

A simple phonebook backend API built with Express.js.

This app was created using the command:

```bash
npm init
```

## How to Run the App

To run this app, follow these steps:

Install the dependencies:

```bash
npm install
```

Start the development server with auto-reload:

```bash
npm run dev
```

Also, you can start the server in production mode without auto-reload:

```bash
npm start
```

If you want to debug the application using Visual Studio Code, just press F5 or go to the Run option menu and select "Start Debugging".

## Testing with REST Client

HTTP requests are available in the `requests/` folder. Install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension to use them.

The base URL is configured in [.vscode/settings.json](.vscode/settings.json) for the `local` environment.

Production environment requests are available by selecting the `production` environment in the REST Client.

## Deployment

The app is deployed at: <https://helsinki-fullstack-open-course.onrender.com>

> NOTE: Before running the app, make sure to run the `npm run build:ui` script to copy the built frontend files from the previous part of the course.
