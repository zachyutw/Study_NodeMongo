const Driver = require('../models/driver')
module.exports = {
    //greetting:function(req,res){}
    greeting(requesetstest, respepapewpapes){
        //send a response back to client
        respepapewpapes.send({hi:'there there'});
    },
    create(req,res, next) {
        console.log(req.body);
        const driverProps = req.body;
        Driver
        .create(driverProps)
        .then( driver => res.send(driver))
        .catch(next);
        
    },
    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({_id:driverId},driverProps)
        .then(()=> Driver.findById({_id:driverId}))
        .then(driver => res.send(driver))
        .catch(next);
    },
    delete(req, res, next){
        const driverId = req.params.id;
        Driver.findByIdAndRemove({_id:driverId})
            .then(driver => res.status(204).send(driver))
            .catch(next);
    },
    index(req,res,next){
        const {lng,lat} = req.query;
        Driver.geoNear(
            {type:'Point', coordinates:[parseFloat(lng),parseFloat(lat)]},
            {spherical:true, maxDistance:200000})
            .then( drivers => 
                res.send(drivers))
            .catch(next);
    }
};

