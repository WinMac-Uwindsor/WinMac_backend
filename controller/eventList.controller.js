const Post = require("../models/eventList.model");

  
  exports.getAllEvents = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
  
    try {
      const event_list = await Post.find().sort({_id: 1}).limit(limit).skip(skipIndex).exec();
      console.log(event_list);
      res.status(200).json({
        length: event_list.length,
        data: event_list,
      });
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong!",
        error: error
      });
    }
  };

  exports.eventDetails = async (req, res) => {
    try {
      console.log("Event Detail requested for id: "+req.body.event_id);
      const user = await Post.find({ event_id: req.body.event_id });
      if (user && user.length > 0) {
        res.status(200).json({
          data: user,
        });
        console.log("Event Detail sent for id: "+req.body.event_id);
      } else {
        console.log("Event not found for id: "+req.body.event_id);
        res.status(404).send({ error: 'Event not found' });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };