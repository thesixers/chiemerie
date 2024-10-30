const express = require('express');
const userAuth = require('../controllers/userController');
const Slots = require('../models/slots');
const Admin = require('../models/admin');
const router = express.Router();
const {generateRandomString, main, tokenChecker, getDate30DaysFromNow} = require('../middleware/mailSender');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/ticket');

require('dotenv').config();

router.get('*', tokenChecker)

let {JWT_SECRET} = process.env;
let maxAge = 2 * 24 * 60 * 60

const createToken = (id) =>{
    return jwt.sign({id}, JWT_SECRET, {expiresIn: maxAge})
}


router.get('/', (req,res) =>{
    res.redirect('/cars/login')
})

router.get('/login', async (req,res) =>{
    res.render('adminLogin')
});
router.get('/register', (req,res)=>{
    res.render('userRegister');
});
// router.get('/userDashboard', userAuth.getUserDashboardPage);
router.get('/adminDashboard', async (req,res) =>{
    res.render('adminDashboard')
});
router.get('/manageSlot', async (req,res) =>{
    res.render('manageSlots')
});

router.get('/tickets', (req,res) =>{
    res.render('ticketHistory');
})

router.get('/logout', (req,res)=> {
    res.cookie('carsAdmin', '', {maxAge: 1, httpOnly: true});
    res.redirect('/cars/login');
})

router.post('/register', async (req,res) =>{
    let {email} = req.body;
    let password = generateRandomString();
    let message = `Your admin account has been created and ur password is ${password}`;


    try {
        await main(email, message);
        let adminAcc = await Admin.create({email, password})
        if(adminAcc) res.json({M: 'Admin created !!!'});
    } catch (err) {
        console.error(err.message);
        res.json({E: err.message});
    }
});

router.post('/login', async (req,res)=>{
    let {email, password} = req.body;
    maxAge = maxAge * 1000;
    try {
        let user = await Admin.login({email, password});
        let token = createToken(user.id);
        res.cookie('carsAdmin', token, {maxAge, httpOnly: true})
        if(user) res.json({M: 'login successful'})
    } catch (err) {
        console.log(err.message);
        res.json({E: err.message});
    }
})

router.post('/addslot', async (req,res) =>{
    let {slotNumber, price, location} = req.body;
    try {
        let createSlot = await Slots.create({slotnumber: slotNumber, price, location});
        if(!createSlot) res.json({E: 'Slot not uploaded an error occured'});
        let it = await Slots.find();
        console.log(it);
        res.json({M: 'Slot Added'});
    } catch (err) {
        console.error(err.message);
        res.json({E: err.message});   
    }
});

router.post('/book', async (req,res) =>{
    console.log(req.body);
    let {email, paymentReference, slotId, amountPaid} = req.body;
    let code = generateRandomString();
    let endDate  = getDate30DaysFromNow().toDateString();

    try {
        let slot = await Slots.findById(slotId);
        let createTicket = await Ticket.create({slotnumber: slot.slotnumber, amountPayed: amountPaid, ref: paymentReference, payersEmail: email, ticketcode: code, endDate});
        console.log(createTicket);
        if(createTicket){
            slot.status = 'occupied';
            await slot.save();
            await main(email, `Your ticket Number is ${createTicket.ticketcode} for parking space ${slot.slotnumber} at ${slot.location} which expires on the ${createTicket.endDate}`);
            res.json({M: 'Ticket Number has been sent to Your email'})
        };
    } catch (err) {
        console.log(err);

    }
})


module.exports = router;
