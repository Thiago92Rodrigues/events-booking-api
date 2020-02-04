const express = require('express');
const bodyparser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers/index');

const checkAuthentication = require('./middleware/authenticate');
//const { logger } = require('./middleware/logger');

// initialize a express app
const app = express();

// add a parser for JSON format requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.sendStatus(200);

  next();
});

// MIDDLEWARES
//app.use(logger);
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
  .connect('mongodb://mongo:27017/events-booking-db', { useNewUrlParser: true })
  .then(() => {
    console.log('Sucessfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB - ', error);
  });

// defines in which PORT the server is going to listen to
const PORT = 3000;
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${server.address().port}`);
});
