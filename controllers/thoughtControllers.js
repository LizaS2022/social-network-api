const { ObjectId } = require('mongoose').Types;
const { User, Thought} = require("../models")

module.exports = {

    async getThoughts(req,res) {
        try {
            const thought = await Thought.find();

            if(!thought){
                res.status(404).json({message:"no thought found"})
            }
            res.json(thought);
        }
        catch(error) {
            return res.status(500).json(error);
        }
    },

    async createThoughts(req, res) {
        try{
            const newThought = await Thought.create(req.body);
            res.json(newThought);
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },

    async getSingleThought(req,res){
        try{
            console.log("in the single thought functions function")
            const singleThought = await Thought.findOne({_id:req.params.thoughtId})
            .select('-__v');

            if(!singleThought ){
                return res.status(404).json({message: "No thought found with that id"});
            }
            res.json(singleThought);
        }
        catch (error){
            console.log(error);
            return res.status(500).json(error);
        }
    },

    async updateThoughtInfo(req,res){
        console.log("in the update thought function")
        try{
            const thought = await Thought.findOneAndUpdate({_id:req.params.thoughtId}, req.body, { runValidators: true, new: true })

            if (!thought){
                return res.status(404).json({message: "No thought found with that id"});
            }
            res.json(thought);
        }
        catch  (error){
            console.log(error);
            res.status(500).json(error);
            
        }
    },

    async deleteThought(req,res){
        try {
            const delThought = await Thought.findOneAndDelete({_id:req.params.thoughtId})
            if (!delThought){
                return res.status(404).json({message: "Thought not found"});
            }
            res.json(delThought);
        }
        catch (error){
            res.status(500).json(error);
        }
    }, 

    async createReaction(req,res) {
        try {
            
            const addReaction = await Thought.findOneAndUpdate({_id:req.params.thoughtId},{$addToSet: {reactions: req.body}},{ runValidators: true, new: true });
            if (!addReaction) {
                return res.status(404).json({message: "reaction not found"});
            }
            res.json(addReaction);
        }
        
        catch (error){
            console.log(error);
                    res.status(500).json(error);
        }
    },

    async removeReaction(req, res) {
        try {
            const delReaction = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId}, 
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new:true});

                console.log(delReaction);

            if (!delReaction) {
                return res.status(404).json({message: "no reaction found with that id"});
            }
            res.json(delReaction);
        }
        catch (error) {
            res.status(500).json(error);
        }

    }
}

