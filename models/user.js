var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
    
var userSchema = new Schema({
    name: String,
    age: Number
}, {
    collection:'user'
});

module.exports = mongoose.model('User', userSchema);
