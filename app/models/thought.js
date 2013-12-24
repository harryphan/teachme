
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

var ThoughtSchema = new Schema({
    question:{
        content:String,
        author:{
            type: Schema.ObjectId,
            ref:'User',
            trim:true
        }
    },
    answer:{
        content: {
            type: String,
            default: '',
            trim: true
        },
        author:{
            type: Schema.ObjectId,
            ref:'User'
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    public:{
        type:Boolean,
        default:false
    },
    parents:[{
        type: Schema.ObjectId,
        ref:'Thought'
    }],
    children:[{
        type:Schema.ObjectId,
        ref:'Thought'
    }]
});

/**
 * Validations
 */
ThoughtSchema.path('question.content').validate(function(content) {
    return content.length;
}, 'Title cannot be blank');


/**
 * Statics
 */
ThoughtSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Thought', ThoughtSchema);
