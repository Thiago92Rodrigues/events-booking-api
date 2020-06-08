# Events Booking App 🎫

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Thiago92Rodrigues/events-booking-app?color=%237519C1">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Thiago92Rodrigues/events-booking-app">
  <img alt="License" src="https://img.shields.io/github/license/Thiago92Rodrigues/events-booking-app?color=%237519C1">
</p>

Create and delete your events;<br />
Book other user's events;<br />
View the events you have booked in a list form or in a chart with the events divided by price.<br />

## Stack

- API Server: <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-green.svg?logo=node.js" alt="Node.js"></a> / <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-green.svg?logo=node.js" alt="Express"></a>
- SPA App (Web Frontend): <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React.js-blue.svg?logo=react" alt="React.js"></a>
- API Architeture: <a href="https://graphql.org/"><img src="https://img.shields.io/badge/GraphQL-E10098.svg?logo=graphql" alt="GraphQL"></a>
- Database: <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-47A248.svg?logo=mongodb" alt="MongoDB"></a>

## GraphQL API

A GraphQL API only has one single endpoint (usually named `/graphql`).

It only receives **POST** requests (the reason for that is **POST** requests have a body, and **GET** ones don't).

It has a query language (DSL) used for telling the server which operation and data is beeing required.

There are two types of operations:

- `query` -> for fetching data
- `mutation` -> for updating data (create, update, delete)

## Running the Application

To run the app simply start both the backend and the frontend `docker-compose` files.

To do that run the following command in both directories (backend and frontend).

The server will be up in PORT `3000` and the SPA app in PORT `3001`.

```sh
docker-compose up
```

## Dependencies

### Backend

- `express`</br>
  Fast, unopinionated, minimalist web framework for node.</br>
  https://www.npmjs.com/package/express

- `graphql`</br>
  The JavaScript reference implementation for GraphQL, a query language for APIs created by Facebook.</br>
  https://www.npmjs.com/package/graphql

- `express-graphql`</br>
  Create a GraphQL HTTP server with any HTTP web framework that supports connect styled middleware, including Connect itself, Express and Restify.</br>
  https://www.npmjs.com/package/express-graphql

- `mongoose`</br>
  ODM for MongoDB. It's a MongoDB object modeling tool designed to work in an asynchronous environment. Provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more.</br>
  https://www.npmjs.com/package/mongoose

- `body-parser`</br>
  Parse incoming request bodies in a middleware before the app's handlers. Able to parser requests in JSON format.</br>
  https://www.npmjs.com/package/body-parser

- `jsonwebtoken`</br>
  An implementation of JSON Web Tokens.</br>
  https://www.npmjs.com/package/jsonwebtoken

- `bcrypt`</br>
  A library to help you hash passwords.</br>
  https://www.npmjs.com/package/bcrypt

### Frontend

- `react`</br>
  React is a JavaScript library for creating user interfaces.</br>
  https://www.npmjs.com/package/react

- `react-dom`</br>
  This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm.</br>
  https://www.npmjs.com/package/react-dom

- `react-router-dom`</br>
  DOM bindings for React Router.</br>
  https://www.npmjs.com/package/react-router-dom

- `chart.js`</br>
  Simple yet flexible JavaScript charting for designers & developers.</br>
  https://www.npmjs.com/package/chart.js?activeTab=readme

- `react-chartjs`</br>
  Rich interactive react charting components using chart.js.</br>
  https://www.npmjs.com/package/react-chartjs
