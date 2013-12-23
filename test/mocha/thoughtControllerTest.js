var  should = require('should'),
    app = require('../../app'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Thought = mongoose.model('Thought');

//Globals
var user;
var thought;

//The tests
describe('<Unit Test>', function() {
    describe('Model Article:', function() {
        

        describe('Linked thoughts', function() {
            it('should be able to save without problems', function(done) {
                var id ='52b8666c3431990000000002';
                Thought.findById(id, function(err, thought) {
                    if (err) console.log(err);
                    if (!thought) console.log(new Error('Failed to load article ' + id));
                    console.log(thought);
                    done();
                });
            });

           
        });
        
    });
});