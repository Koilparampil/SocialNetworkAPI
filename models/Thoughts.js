const { Schema, model  } = require('mongoose');
const ReactionSchema = require('./Reaction.js')

const ThoughtsSchema = new Schema(
    {
        thoughtText:{
            type:String,
            required: true,
            minLength:1,
            maxLength:280,
        },
        createdAt:{
            type: Date,
            default: Date.now,

        },
        username:{
            type: String,
            required:true,

        },
        reactions:[ReactionSchema]
    },
    {
        toJSON:{
            getters: true,
            virtuals: true
        },
    }
);

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });


const Thoughts= model('Thoughts',ThoughtsSchema);
module.exports = Thoughts;