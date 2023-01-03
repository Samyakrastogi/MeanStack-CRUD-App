const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/meandb', (err)=>{
    if(!err){
        console.log("DB Connection Successful")
    }
    else{
        console.log("Error in Connection" + err)
    }
})

module.exports = mongoose;
