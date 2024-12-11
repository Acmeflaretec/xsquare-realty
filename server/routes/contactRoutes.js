const express = require('express');
const { createContact,getContacts,updateContactStatus } = require('../controllers/contactController');

const router = express.Router();

router.post('/', createContact);
router.get('/getAllContacts', getContacts);
router.put('/update-status', updateContactStatus);

module.exports = router;
