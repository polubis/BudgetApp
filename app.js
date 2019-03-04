const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const Event = require('./models/event');
const User = require('./models/user');

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
    
    type User {
      _id: ID!
      email: String!
    }

    input UserInput {
      email: String!
      password: String!
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
      createUser(userInput: UserInput): User
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
        date: new Date(),
        creator: '5c7d941cf14b4a39943624da' // mongoose konwertnie na obiekt
      });
      let createdEvent;
      return event.save()
      .then(res => {
        createdEvent = { ...res._doc, _id: res._id.toString() };
        return User.findById('5c7d941cf14b4a39943624da');
      })
      .then(user => {
        if (!user) {
          throw new Error('User dont exists');
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(res => {
        return createdEvent;
      })
      .catch(err => {
        throw err;
      })
     
    },
    createUser: args => {
      return User.findOne({ email: args.userInput.email })
        .then(user => {
          if (user) {
            throw new Error('User exists already');
          }
          return bcrypt.hash(args.userInput.password, 12);
        })
        .then(hashedPass => {
          const user = new User({
            email: args.userInput.email,
            password: hashedPass
          }); 
          return user.save();
        })
        .then(res => {
          return { ...res._doc, _id: res.id }
        })
        .catch(err => {
          throw err;
        })
    }
  },
  graphiql: true
}));

app.listen(3000);
