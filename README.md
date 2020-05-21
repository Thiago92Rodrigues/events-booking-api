# Events Booking App

Create and delete your events;
Book other user's events;
View the events you have booked in a list form or in a chart with the events divided by price.

## Stack

- Backend: `Node.js` / `Express.js`
- Frontend: `React.js`
- API Architeture: `GraphQl`
- Database: `MongoDB`

## GraphQL API

A GraphQL API only has one single endpoint (usually named `/graphql`).

It only receives **POST** requests (the reason for that is **POST** requests have a body, and **GET** ones don't).

It has a query language (DSL) used for telling the server which operation and data is beeing required.

There are two types of operations:

- `query` -> for fetching data
- `mutation` -> for updating data (create, update, delete)

## Running the Application

To run the app simply start both the backend and the frontend docker compose files.

To do that run the following command in both directories (backend and frontend).

The server will be up in PORT `3000` and the react app in PORT `3001`.

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
