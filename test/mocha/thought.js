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

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return thought.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                thought.question.content = '';

                return thought.save(function(err) {
                    should.exist(err);
                    done();
                });
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
                
                thought.children = [thought2];
                console.log("done saving");
                return thought.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });
        afterEach(function(done) {
            Thought.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Thought.remove().exec();
            User.remove().exec();
            done();
        });
    });
});