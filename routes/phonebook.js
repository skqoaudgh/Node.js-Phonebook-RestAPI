const express = require('express');
const router = express.Router();
const routerS = express.Router();

const phonebookController = require('../controllers/phonebook');

// phonebook
router.post('/', phonebookController.createItem);
router.get('/:id', phonebookController.getPhonebook);
router.put('/:id', phonebookController.updatePhonebook);
router.get('/search/:searchWord', phonebookController.searchPhonebook);



// phonebooks
routerS.get('/', phonebookController.getPhonebooks);

module.exports = {
    phonebook: router,
    phonebooks: routerS
};