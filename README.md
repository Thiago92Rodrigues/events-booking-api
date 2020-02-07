
# EVENTS BOOKING APP

- **Framework**: `NodeJS` / `Express.js`
- **Architeture**: `GraphQl`
- **Database**: `MongoDB`


## DEPENDENCIES

- **`express`** - work with HTTP requests and responses
- **`body-parser`** - able to parser requests in JSON format
- **`express-graphql`** - library to work with GraphQL in a node app
- **`mongoose`** - library to connect to and manage a MongoDB database
- **`bcrypt`** - library to encrypt the user's password (generating a hash for them)
- **`jsonwebtoken`** - 


## GraphQL API

only has one single endpoint (usually name `/graphql`)

it only receives **POST** requests (the reason for that is **POST** requests have a body, and **GET** ones don't)
 
it has a query language (DSL) used for telling the server which operation and data is beeing required
 
there are two types of operations
- `query` -> for fetching data
- `mutation` -> for updating data (create, update, delete)

 
## RUNNING THE APPLICATION

to run the app simply start both backend and frontend dockers compose</br>
to do that run the following command in both directories (backend and frontend)</br>
the server will be up in PORT `3000` and the react app in PORT `3001`
```sh
docker-compose up
```
