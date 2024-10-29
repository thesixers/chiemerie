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

module.exports = {main, generateRandomString, tokenChecker};