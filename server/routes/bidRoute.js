const express = require('express');
const router = express.Router();
const bidderController = require('../controller/bidcontroller');

// Route to get all bids
router.get('/bids', bidderController.getAllBids);

// Route to get bids by crop ID
router.get('/bids/:cropId', bidderController.getBidsByCropId);

// Route to place a bid
router.post('/createbid/:cropId/:buyerId', bidderController.placeBid);

// Route to update a bid
router.put('/updatebid/:id/:buyerId', bidderController.updateBid);

// Route to delete a bid
router.delete('/deletebid/:id', bidderController.deleteBid);

// Route to get the maximum bid for a particular crop
router.get('/maxbid/max/:cropId', bidderController.getMaxBidForCrop);

module.exports = router;
