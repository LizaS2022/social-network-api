const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUserInfo,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controllers/userControllers");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).put(updateUserInfo).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);
module.exports = router;