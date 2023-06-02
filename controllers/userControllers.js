
const { User} = require("../models")



module.exports = {
    // get all users
    async getUsers(req,res){
        try {
            const users = await User.find();
      
            res.json(users);
          } catch (err) {
            return res.status(500).json(err);
          }
    },

    async getSingleUser(req,res){
        try{
            const singleUser = await User.findOne({_id:req.params.userId})
            .select('-__v');

            if(!singleUser){
                return res.status(404).json({message: "No user found with that id"});
            }
            res.json(singleUser);
        }
        catch (error){
            return res.status(500).json(error);
        }
    },

    async createUser(req,res){
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        }
        catch (error){
            res.status(500).json(error);
        }
    },

    async updateUserInfo(req,res){
try{
    const user = await User.findOneAndUpdate({_id:req.params.userId}, req.body, { runValidators: true, new: true })

    if (!user){
        return res.status(404).json({message: "No user found with that id"});
    }
    res.json(user)
}
catch  (error){
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
            const addFriend = await User.findOneAndUpdate({_id:req.params.userId},{$addToSet: {friends: req.params.friendId}});
            if (!addFriend) {
                return res.status(404).json({message: "friend not found"});
            }
            res.json(addFriend);
        }
        catch (error){
            res.status(500).json(error);
        }
    },
    async removeFriend(req, res) {
  
        try {
            const delFriend = await User.findOneAndUpdate(
                {_id:req.params.userId}, 
                {$pull: {friends: req.params.friendId}});

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

