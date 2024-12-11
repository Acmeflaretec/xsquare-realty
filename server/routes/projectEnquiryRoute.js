const express = require('express');
const { createEnquiry, getEnquiries, getEnquiryDetails, updateEnquiryStatus } = require('../controllers/projectEnquiryController');

const router = express.Router();
    
router.post('/', createEnquiry);
router.get('/getAllProjectEnquirys', getEnquiries);
router.get('/:id', getEnquiryDetails);
router.put('/update-status', updateEnquiryStatus);

module.exports = router;
