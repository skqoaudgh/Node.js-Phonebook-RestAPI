const express = require('express');
const router = express.Router();

const phonebookController = require('../controllers/phonebook');

router.get('/', phonebookController.getPhonebooks);
router.post('/', phonebookController.createItem);
router.get('/:Itemid', phonebookController.getPhonebook);
router.put('/:Itemid', phonebookController.updatePhonebook);
router.delete('/:Itemid', phonebookController.deletePhonebook);
router.get('/search/relation/:searchWord', phonebookController.searchPhonebookByRelation);
router.get('/search/:searchWord', phonebookController.searchPhonebook);

module.exports = router;