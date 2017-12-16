const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/muber');
}
mongoose.connection
.once('open', () => {console.log('connect success')})
.on('error',(error) => { console.warn('Warning',error);
});
app.use(bodyParser.json());
routes(app);

//next means next middleware to change
app.use((err,req,res,next)=>{
    res.send({error:err.message});
});


module.exports = app;
