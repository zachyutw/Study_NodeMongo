const mongoose =require('mongoose');

before(done =>{
    mongoose.connect('mongodb://localhost/muber_test');
    mongoose.connection
        .once('open', ()=>done())
        .on('error',err =>{
            console.warn('Warining',error);
        })

});

beforeEach(done =>{
    const {drivers} =mongoose.connection.collections;
    drivers.drop()
        //important ****** testing enviroment 
        .then(()=> drivers.ensureIndex({'geometry.coordinates':'2dsphere'}))
        .then(()=>done()).catch(()=>done());
})