const express = require("express");
const feedbackHandler = require("../../handler/FeedbackHandler/feedbackHandler");
const { authUser } = require("../../middleware/authMiddleware");
const router = express.Router();

router.get('/myFeedbacks', authUser, feedbackHandler.getFeedbacks);
router.get('/feedback/:id', feedbackHandler.getSingleFeedback);
router.post('/feedback/new',authUser, feedbackHandler.createFeedback);
router.put('/feedback/:id',authUser, feedbackHandler.updateFeedback);
router.delete('/feedback/:id',authUser, feedbackHandler.deleteFeedback);

module.exports = router;