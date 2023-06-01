const router = require("express").Router();

const {
    getThoughts,
    createThoughts,
    getSingleThought,
    updateThoughtInfo,
    deleteThought,
    createReaction,

} = require("../../controllers/thoughtControllers");

router.route("/").get(getThoughts).post(createThoughts);
router.route("/:thoughtId").get(getSingleThought).put(updateThoughtInfo).delete(deleteThought);
router.route("/:thoughtId/reactions").post(createReaction);
module.exports = router;