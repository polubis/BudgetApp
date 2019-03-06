
const bcrypt = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');

const user = userId => {
  return User.findById(userId)
    .then(user => {
      return { 
        ...user._doc, 
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents) 
      };
    })
    .catch(err => {
      throw err;
    })
}

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds }});
    return events.map(event => {
      return { 
        ...event._doc, 
        _id: event.id, 
        creator: user.bind(this, event.creator)}
    })
  }
  catch(err) {
    throw err;
  }
}

module.exports = {
  events: () => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return { 
            ...event._doc, 
            _id: event.id,
            creator: user.bind(this, event._doc.creator)
          };
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
      createdEvent = { 
        ...res._doc, 
        _id: res._id.toString(),
        creator: user.bind(this, res._doc.creator)
      };
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
};