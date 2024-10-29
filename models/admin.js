const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    email: {type: String, required: [true, 'pls enter ur email'], unique: [true, 'this email is already registered']},
    password: {type: String, required: [true, 'pls enter your password']}
});

adminSchema.pre('save', async function(){

    let salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password, salt);
  
});

adminSchema.statics.login = async function({email, password}){
    let user = await Admin.findOne({email});

    if(email === '') throw Error('email or regno field cant be empty')

    if(!user) throw Error('user not found')

    if(password === '') throw Error('Password field is empty');

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) throw Error('incorrect password');

    return user;
}

const Admin = mongoose.model('carsAdmin', adminSchema);
module.exports = Admin;