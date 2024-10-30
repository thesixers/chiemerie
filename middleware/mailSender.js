const env = require('dotenv');
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Slots = require('../models/slots');
const Ticket = require('../models/ticket');
env.config();

const { EMAIL_USER, Email_PASS, JWT_SECRET } = process.env;

async function main(email, message){
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, 
      secure: true, 
      auth: {
        user: EMAIL_USER,
        pass: Email_PASS
      }  
    });
  
    const info = await transporter.sendMail({
      from: 'carsfunai.com <the.sixers.com@gmail.com>',
      to: email,
      subject: 'admin account password',
      html: message
    })
  
    console.log('message sent:' + info.messageId)
  
  }


  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
  
const tokenChecker = (req, res, next) =>{
  let token = req.cookies.carsAdmin;

  if(!token) res.redirect('/cars/login');

  jwt.verify(token, JWT_SECRET, async (err, dt) =>{
    if(err) res.redirect('/cars/login');

      let Slot = await Slots.find();
      let Tickets = await Ticket.find();

      res.locals.payload = {Slot, Tickets};
    next();
  })
}

function getDate30DaysFromNow() {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 30);
  return futureDate;
}


function scheduleDateCheck(targetDate) {

  const currentDateString = new Date().toDateString();
      
      if (currentDateString === targetDate) {
          console.log("The date matches the target date!");
          return true;
      } else {
          console.log("No match yet. Checking again in 24 hours.");
          return false;
      }
}


async function loopTickets() {
  let tickets = await Ticket.find();

  for (const e of tickets) {
    const isDateMatched = scheduleDateCheck(e.endDate);
    
    if (isDateMatched) {
      e.status = 'inactive';
      await e.save();

      const slot = await Slots.findOne({slotnumber: e.slotnumber});
      
      if (slot) {
        slot.status = 'available';
        await slot.save();
      }
    }
  }
}


module.exports = {main, generateRandomString, tokenChecker, getDate30DaysFromNow, loopTickets};