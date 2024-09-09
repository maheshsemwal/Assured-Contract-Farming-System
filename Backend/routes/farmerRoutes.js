const express = require('express');
const {registerFarmer, updateFarmerDetails, getFarmers, getFarmerById, getFarmersByLocation} = require('../controllers/FarmerController')

const router = express.Router();

router.route('/').get(getFarmers);
router.route('/:id').get(getFarmerById);
router.route('/getByLocation').get(getFarmersByLocation);
router.route('/register').post(registerFarmer);
router.route('/update/:id').patch(updateFarmerDetails);

module.exports = router;