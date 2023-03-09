const User = require("../models/user.model");
const Post = require("../models/eventList.model");

//Booking events
exports.addEvent = async (req, res) => {
  try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser.eventBooked.includes(req.body.eventBooked)) {
        return res.status(400).send({ error: 'Event already booked' });
      }

      const hasEvent = await Post.findOne({ event_id: req.body.eventBooked });
      console.log(hasEvent.limit);
      if(hasEvent){ 
        if(hasEvent.limit>0){
          updatedLimit = hasEvent.limit;
          updatedLimit = updatedLimit-1;
          console.log(updatedLimit);
          Post.updateOne({ event_id: req.body.eventBooked }, { $set: { limit: updatedLimit } }, function(err, result) {
              if (err) throw err;
      
              console.log('Limit updated');
          });
          
          const result = await User.updateOne(
            { username: req.body.username }, 
            { $push: { eventBooked: req.body.eventBooked } }, 
            { upsert: true }
          );
    
          console.log('Event '+req.body.eventBooked+' added to username '+req.body.username);
          res.send({ message: 'Event added successfully' });
        }
        else{
          console.log('Event '+req.body.eventBooked+' is full');
          res.send({ error: 'No seats available for this event' });
        }
      }
      else{
        console.log('Event '+req.body.eventBooked+' does not exists');
        res.send({ error: 'Event  does not exists' });
      }
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


//Canceling events
exports.removeEvent = async (req, res) => {
  try {

    const hasEvent = await Post.findOne({ event_id: req.body.eventBooked });
    console.log(hasEvent.limit);
    if(hasEvent){ 
        updatedLimit = hasEvent.limit;
        updatedLimit = updatedLimit+1;
        console.log(updatedLimit);
        Post.updateOne({ event_id: req.body.eventBooked }, { $set: { limit: updatedLimit } }, function(err, result) {
            if (err) throw err;
    
            console.log('Limit updated');
        });
        const result = await User.updateOne(
          { username: req.body.username }, 
          { $pull: { eventBooked: req.body.eventBooked } }
        );
        if(result.nModified === 0 && result.n === 0){
          // if the record was not modified or created
          res.status(404).send({ error: 'User not found' });
        } else {
          console.log('Event '+req.body.eventBooked+' removed from username '+req.body.username);
          res.send({ message: 'Event removed successfully' });
        }
        
    }
    else{
      console.log('Event '+req.body.eventBooked+' does not exists');
      res.send({ error: 'Event  does not exists' });
    }

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


//My events
exports.myEvent = async (req, res) => {
  try {
    const userId = req.body.username;
    const user = await User.find({ username: userId });
    if (user && user.length > 0) {
      const eventBookedLength = user[0].eventBooked ? user[0].eventBooked.length : 0;
      res.status(200).json({
        length: eventBookedLength,
        data: user[0].eventBooked,
      });
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
