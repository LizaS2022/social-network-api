const { ObjectId } = require('mongoose').Types;
// const { builtinModules } = require('module');
const { User, Thought} = require("../models")



module.exports = {
    // get all users
    async getUsers(req,res){
        try {
            console.log(" in the get users function")
            const users = await User.find();
      
            res.json(users);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    async getSingleUser(req,res){
        try{
            console.log("in the single user functions function")
            const singleUser = await User.findOne({_id:req.params.userId})
            .select('-__v');

            if(!singleUser){
                return res.status(404).json({message: "No user found with that id"});
            }
            res.json(singleUser);
        }
        catch (error){
            console.log(error);
            return res.status(500).json(error);
        }
    },

    async createUser(req,res){
        console.log("in the create function")
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        }
        catch (error){
            res.status(500).json(error);
        }
    },

    async updateUserInfo(req,res){
        console.log("in the update function")
try{
    const user = await User.findOneAndUpdate({_id:req.params.userId}, req.body, { runValidators: true, new: true })

    if (!user){
        return res.status(404).json({message: "No user found with that id"});
    }
    res.json(user)
}
catch  (error){
    console.log(error);
    res.status(500).json(error);
    
}
    },

    async deleteUser(req,res){
        try {
            const delUser = await User.findOneAndDelete({_id:req.params.userId})
            if (!delUser){
                return res.status(404).json({message: "User not found"});
            }
            res.json(delUser)
        }
        catch (error){
            res.status(500).json(error);
        }
    }, 

    async addFriend(req,res) {
        try {
            const addFriend = await User.findOneAndUpdate({_id:req.params.userId},{$addToSet: {friends: req.params.friendId}},{ runValidators: true, new: true });
            if (!addFriend) {
                return res.status(404).json({message: "friend not found"});
            }
            res.json(addFriend);
        }
        catch (error){
            console.log(error);
            res.status(500).json(error);
        }
    },
    async removeFriend(req, res) {
        console.log("in the remove friend");
        console.log(req.params.userId);
        console.log(req.params.friendId);
        try {
            const delFriend = await User.findOneAndUpdate(
                {_id:req.params.userId}, 
                {$pull: {friends: req.params.friendId}},{runValidators: true, new:true});

                console.log(delFriend);

            if (!delFriend) {
                return res.status(404).json({message: "no user found with that id"});
            }
            res.json(delFriend);
        }
        catch (error) {
            res.status(500).json(error);
        }

    }
}

