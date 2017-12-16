const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');
describe('Drivers controller', () => {
    it('Post to /api/drivers creates a new driver', done =>{
        //count add before and after
        Driver.count().then(count=>{

            request(app)
            .post('/api/drivers')
            .send({email:'test1@test.com'})
            .end(()=>{
                Driver.count().then(newCount =>{
                    console.log('new '+newCount+' old '+count);
                    assert(count + 1 === newCount);
                    done();
                })
               
            });
        });
        
    });

    it('PUT to /api/drivers/id edits an existing driver', done=>{
        const driver = new Driver({email:'t@t.com', driving:true});

        driver.save().then(()=>{
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({driving:true})
                .end(()=>{
                    Driver.findOne({email:'t@t.com'})
                        .then(driver =>{ 
                        assert(driver.driving ===true);
                        done();
            });
            })
        });
    });

    it('DELETE to /api/drivers/id delete an exsiting driver',done =>{
        const driver = new Driver({email:'testd@test.com', driving:true});
        driver.save().then(()=>{
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(()=>{
                    Driver.findOne({email:'testd@test.com'})
                        .then((driver)=>{
                            assert(driver === null);
                            done();
                        });
                });

        });
    });

    it('GET to /api/drivers/  findes drivers in a location', done=>{
        const seattleDriver = new Driver({
            email:'seattle@test.com',
            geometry:{type:'Point', coordinates:[-122.4759902, 47.6147628]}
        });
        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry:{ type:'Point',coordinates:[-80.253, 25.791]}
        });

        Promise.all([seattleDriver.save(),miamiDriver.save()])
            .then(()=>{
                request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err,response)=>{
                        assert(response.body.length ===1);
                        assert(response.body.email='miami@test.com');
                        console.log(response.header.date);
                        done();
                    })
            })
    });
});