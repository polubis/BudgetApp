const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

let Event = require('./models/event');

const app = express();

mongoose.connect('mongodb://localhost:27017/BudgetApp')
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


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
    "POST,  OPTIONS"
  );
  next();
});

app.use('/graphql', graphQlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.find()
        .then(events => {
          return events.map(event => {
            return { ...event._doc, _id: event.id };
          })
        })
        .catch(err => {
          throw err;
        });
    },
    createEvent: args => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date()
      });
      return event.save()
      .then(res => {
        return { ...res._doc, _id: res._id.toString() };
      }).catch(err => {
        throw err;
      })
     
    }
  },
  graphiql: true
}));

app.listen(3000);
