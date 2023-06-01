const { Schema, model, Types } = require('mongoose');
const thoughtSchema = require("./Thought")


// building the user table/collection
const userSchema = new Schema({

    userName: {type: String, unique: true, required: true, trim:true},
    email: {type: String, required: true, unique: true, match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Not a valid email address"]},
    thoughts: [{type:Schema.Types.ObjectId, ref:"Thought"}],
    friends: [{type:Schema.Types.ObjectId, ref:"User"}],
},
{
    toJSON:  {
        getters: true,
        virtuals:true,
    }, 
    id: false,
}
);

userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
})

// freeze the name and keep the model name singular
const User = model("User", userSchema);



module.exports = User;
    
