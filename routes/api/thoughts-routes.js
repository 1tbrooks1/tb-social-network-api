const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    editThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts)

router.route('/:id').get(getSingleThought).put(editThought).delete(deleteThought);

router.route('/:userId').post(createThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;