const User = require("../models/user.model");

//Booking events
exports.addEvent = async (req, res) => {
  try {
    console.log(req.body);
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser.eventAttended.includes(req.body.eventAttended)) {
        return res.status(400).send({ error: 'Event already attended' });
      }

      const result = await User.updateOne(
        { username: req.body.username }, 
        { $push: { eventAttended: req.body.eventAttended } }, 
        { upsert: true }
      );

      console.log('Event '+req.body.eventAttended+' added to username '+req.body.username);
      res.send({ message: 'Event attended successfully' });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



//My events
exports.myEvent = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body.username;
    const user = await User.find({ username: userId });
    if (user && user.length > 0) {
      const eventAttendedLength = user[0].eventAttended ? user[0].eventAttended.length : 0;
      res.status(200).json({
        length: eventAttendedLength,
        data: user[0].eventAttended,
      });
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
