const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const graphQlHttp = require('express-graphql');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const formatError = require('./graphql/errors/index');
const isAuth = require('./middleware/is-auth');

const app = express();

const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/BudgetApp');
  }
  catch(err) {
    process.exit(1);
  }
}

connectToDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS"
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use('/graphql', graphQlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
  formatError: err => formatError.getError(err)
}));

app.listen(3030);
