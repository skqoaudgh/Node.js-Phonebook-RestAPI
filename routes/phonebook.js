const express = require('express');
const router = express.Router();
const routerS = express.Router();

const phonebookController = require('../controllers/phonebook');

// phonebook
router.post('/', phonebookController.createItem);
router.get('/:Itemid', phonebookController.getPhonebook);
router.put('/:Itemid', phonebookController.updatePhonebook);
router.delete('/:Itemid', phonebookController.deletePhonebook);
router.get('/search/relation/:searchWord', phonebookController.searchPhonebookByRelation);
router.get('/search/:searchWord', phonebookController.searchPhonebook);



// phonebooks
routerS.get('/', phonebookController.getPhonebooks);

module.exports = {
    phonebook: router,
    phonebooks: routerS
};