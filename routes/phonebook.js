const express = require('express');
const router = express.Router();

const phonebookController = require('../controllers/phonebook');

router.get('/', phonebookController.getPhonebooks);
router.post('/', phonebookController.createItem);
router.get('/:itemId', phonebookController.getPhonebook);
router.put('/:itemId', phonebookController.updatePhonebook);
router.delete('/:itemId', phonebookController.deletePhonebook);
router.post('/searches', phonebookController.searchPhonebook)

module.exports = router;