const assert = require('assert');
const User = require('../src/user');

describe('',(done)=> 'string');
(done) => {
    done.net
}

describe('Creating records', () => { 
    //done would control the waiting time.
    it('saves a user',(done) => {
        const joe = new User({name: 'Joe'});
        //insert a new record to mongo database
        joe.save()
        .then( () => { 
            assert(!joe.isNew);
            done();
        });
    });
});