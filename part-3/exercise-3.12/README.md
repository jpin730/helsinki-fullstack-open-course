# Exercise 3.12

A command-line database application for the phonebook built with Node.js and MongoDB.

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

## Database Setup

Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a new cluster (free tier is sufficient)
3. Set up database user credentials (username and password)
4. Configure network access (allow access from all IP addresses: 0.0.0.0/0)
5. Get your MongoDB connection string from the "Connect" menu

## Usage

The application works from the command line and supports two operations:

### Adding a new entry to the phonebook

Pass three command-line arguments: password, name, and phone number.

```bash
node index.js yourpassword Anna 040-1234556
```

Output:

```text
added Anna number 040-1234556 to phonebook
```

**Note:** If the name contains whitespace characters, it must be enclosed in quotes:

```bash
node index.js yourpassword "Arto Vihavainen" 045-1232456
```

### Listing all entries in the phonebook

Pass only the password as a command-line argument:

```bash
node index.js yourpassword
```

Output:

```text
phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
```
