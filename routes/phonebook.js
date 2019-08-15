const express = require('express');
const router = express.Router();

const phonebookController = require('../controllers/phonebook');

router.post('/', phonebookController.createItem);

module.exports = router;