const express = require('express');
const bodyparser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers/index');

const checkAuthentication = require('./middlewares/authentication');
const cors = require('./middlewares/cors');

const app = express();

// add a parser for JSON format requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// MIDDLEWARES
app.use(cors);
app.use(checkAuthentication);

/**
 * GraphQl single route
 *
 * graphiql - it's a dev tool, which provides an interface for testing your GraphQL API
 * access it by http://<HOST>:<PORT>/graphql
 *
 * schema - defines the queries and mutations treated by the server
 *        - defines the requests args and their types, and also the response type
 *
 * rootValue - defines which function is going to be call when certain query reachs the server
 *
 */
app.use(
  '/graphql',
  graphqlHttp({
    graphiql: true,
    schema: graphQlSchema,
    rootValue: graphQlResolvers
  })
);

// connect to a MongoDB database
mongoose
  .connect('mongodb://db:27017/events-booking-db', { useNewUrlParser: true })
  .then(() => {
    console.log('Sucessfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB - ', error);
  });

module.exports = app;
