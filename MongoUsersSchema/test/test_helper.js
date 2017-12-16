const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //use ES6 respertention

//before function would be only run one time.
before(() => {
    mongoose.connect('mongodb://localhost/user_test');
    mongoose.connection
    .once('open', () => {})
    .on('error',(error) => { console.warn('Warning',error);
    });
    
});

beforeEach((done)=>{

    //collections will be the model undr case plus s 
    const {users, comments, blogposts} = mongoose.connection.collections;
    users.drop( () => {
        comments.drop (()=>{
            blogposts.drop(()=>{
                done();
            })
        })
        
    });
});