const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    index: {type: Number},
    slotnumber: {type: String, unique: true},
    status:{type: String, enum:['available', 'occupied'], default: 'available'},
    price: {type: String},
    location: {type: String}
});


const Slots = mongoose.model('carSlots', slotSchema);
module.exports = Slots;