<h1 align="center">Ticket 🎫</h1>

<p align="center">Web application for creating and booking events.</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/th92rodr/ticket?color=7159c1" />
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/th92rodr/ticket?color=b24c63" />
  <a href="https://github.com/th92rodr/ticket/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/th92rodr/ticket?color=3675d3" />
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-fff?color=1A424F" />
  <a href="https://github.com/th92rodr/ticket/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/th92rodr/ticket?style=social" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/repo status-Done-fff?style=flat&color=47A248" alt="Done - The project has been finalized." />
</p>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#tech-stack">Tech Stack</a> •
 <a href="#how-it-works">How it works</a> •
 <a href="#license">License</a>
</p>

## About

Web application for creating and booking events.

## Features

- [x] Create and Delete Your Events
- [x] Book Other User's Events
- [x] View the events you have booked in a list form or in a chart with the events divided by price

## Tech Stack

The following tools were used for building this project:

**API**

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [GraphQL](https://graphql.org/)

**Website**

- [React.js](https://pt-br.reactjs.org/)

---

## How it works

### GraphQL API

A GraphQL API only has one single endpoint (usually named `/graphql`).

It only receives `POST` requests (the reason for that is `POST` requests have a body, and `GET` ones don't).

It has a query language (DSL) used for telling the server which operation and data is being required.

There are two types of operations:

- `query` -> for fetching data
- `mutation` -> for updating data (create, update, delete)

### Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:

- `Node.js`<br />
  recommend version 12.10

  `Node` can be installed from `https://nodejs.org/en/`.

- `NPM`:<br />
  recommend version 6.13

  Installing `Node` will also install `NPM` automatically.

- `Docker`:<br />

  `Docker` can be installed from `https://docs.docker.com/get-docker/`.

### Running the Application

To run the app simply start both the backend and the frontend `docker-compose` files.

To do that run the following command in both directories (backend and frontend).

The server will be up in PORT `3000` and the SPA app in PORT `3001`.

```sh
docker-compose up
```

---

## License

This project is under the license [MIT](./LICENSE).
