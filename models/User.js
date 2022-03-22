const { Schema, Types } = require('mongoose');


var validateEmail = function(email) {
    var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(email)
};


const UserSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            trim: true,
            unique : true,
        },
        email:{
            type: String,
            required: true,
            unique : true,
            validate:[validateEmail, 'Enter a Valid Email Address!']
        },
        thoughts:[{type:Schema.Types.ObjectId, ref:'Thoughts'}],
        friends:[{type:Schema.Types.ObjectId, ref:'User'}]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });