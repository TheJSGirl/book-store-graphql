const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');

//connect to mlab database
//make sure to replace my db string & cards with your own
mongoose.connect('mongodb://localhost/graphql');
mongoose.connection.once('open', () => {
  console.log('connected to database');
});
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('listing at port', 4000);
});
