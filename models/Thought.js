const { timeStamp } = require('console');
const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type:String,
        required: true,
        arguments: [1, 280],
    },

    userName: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        
        
    },
});

const thoughSchema = new Schema({
    thoughtText: {
        type: 'string',
        required: true,
        arguments: [1, 280],
    },

    createdAt: {
        type: Date,
        default: Date.now(),
       
    },

    userName: {
        type: 'string',
        required: true,
    },

    reactions: [reactionSchema]
}, 
{
    toJSON: {
        virtuals:true,
    }, 
    id: false,
}
);




thoughSchema.virtual("reactionCount"), (function() {
    return this.reactions.length;
})

const Thought = model("Thought", thoughSchema);

module.exports = Thought;