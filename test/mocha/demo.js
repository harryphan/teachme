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
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                
                thought = new Thought({
                    question:{
                        content:'What is Christmas?',
                        author:user
                    }
                });

                done();
            });
        });

        describe('Linked thoughts', function() {
            it('should be able to save without problems', function(done) {
                thought.answer={
                    content:'it is a holiday',
                    author:user
                }
                thought.save(function(err) {
                    should.not.exist(err);
                });
                var thought2=new Thought({
                    question:{
                        content:'What is a holiday?',
                        author:user
                    },
                    parents:[thought]
                });
                thought2.save(function(err) {
                    should.not.exist(err);
                });
                thought.children=[thought2];
                return thought.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

           
        });
        
    });
});