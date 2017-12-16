//Genral update using and $inc operator example

const assert = require('assert');
const User = require('../src/user');

describe('Updateing records ',()=>{
    let joe;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
        .then( ()=> done());
    });
    function assertName(operation, done) {
        operation.then(()=> User.find({}) ).then( (users) => {
            assert(users.length ===1);
            assert(users[0].name === 'Alex');
            done();
        });
    }

    //we can set different proerpties sepratily 
    it('A model instance type using set and save',(done)=>{
        console.log(joe);
        joe.set('name','Alex');
        assertName(joe.save(),done);
    });
    it('A model instance can update', (done)=>{
        
        assertName( joe.update({name:'Alex'}),done);
    });
    it('A model class can update one record',(done)=>{
        assertName(
        User.update({name:'Joe'},{name:'Alex'}), done);
    });
    it('A model class method findOneAndUpdate can update one record',(done)=>{
        assertName(
            User.findOneAndUpdate({name:'Joe'},{name:'Alex'})
            ,done);
    });
    it('A model class method findByIdAndUpdate can update one record',(done)=>{
        assertName(
        User.findByIdAndUpdate(joe._id, {name:'Alex'})
        ,done);
    });

    it('A user can have their likes incremented by 1',(done) => {
        //$inc mongo server would increas the value of fieldrecord
        User.update({name:'Joe'},{$inc:{likes:10}})
        .then(()=> User.findOne({name:'Joe'}))
        .then((user)=>{
            assert(user.likes ===10);
            done();
        });
    })
});