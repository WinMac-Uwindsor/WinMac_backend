const Ticket = require("../models/complaint.model");

//Add Complaint
Ticket.createUser = async function (username, message) {
  const ticket = new Ticket({ username, message });
  const savedTicket = await ticket.save();
  return savedTicket;
};

exports.addTicket = async (req, res, next) => {
  const { username, message } = req.body;
  console.log(req.body);
  try {
    // Call the createUser method on the Ticket model
    const savedTicket = await Ticket.createUser(username, message);

    res.status(201).json({
      message: "Ticket created!",
      TicketDetails: {
        username: savedTicket.username,
        message: savedTicket.message,
      },
    });
  } catch (error) {
    return next(error);
  }
};



//show tickets
exports.getAllTickets = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body.username;
    const user = await Ticket.find({ username: userId });
    if (user && user.length > 0) {
      const eventBookedLength = user ? user.length : 0;
      console.log("Tickets requested for id: "+userId);
      res.status(200).json({
        length: eventBookedLength,
        data: user,
      });
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteTicket = async (req, res, next) => {
  const { event_id } = req.body;
  console.log(req.body);
  console.log("ticket id: "+req.body.event_id);
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.body.event_id );
    if (!deletedTicket) {
      return res.status(404).json({
        error: "Complaint not found!",
      });
    }
    res.status(200).json({
      message: "Ticket resolved successfully!",
      deletedTicket,
    });
  } catch (error) {
    return next(error);
  }
};


