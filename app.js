const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers/index');
const checkAuthentication = require('./middleware/authenticate');

// initialize a express app
const app = express();

// add a parser for JSON format requests
app.use(bodyParser.json());

app.use(checkAuthentication);


/**
 * graphiql - it's a dev tool, which provides an interface for testing your GraphQL API
 * 
 * schema - defines the queries and mutations treated by the server
 *        - defines the requests args and their types, and also the response type
 * 
 * rootValue - defines which function is going to be call when certain query reachs the server
 * 
 */
app.use('/graphql', graphqlHttp({
    graphiql: true,
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
}));


// connect to a MongoDB database
mongoose
.connect(
    'mongodb://mongo:27017/graphql-event-app',
    { useNewUrlParser: true }
)
.then(() => {
    console.log('Sucessfully connected to MongoDB');
})
.catch(error => {
    console.error('Failed to connect to MongoDB - ', error);
});


// defines in which PORT the server is going to listen to
const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST);
