const express = require('express');
const router = express.Router();

const blacklistController = require('../controllers/blacklist');

router.post('/', blacklistController.createBlacklist);
router.get('/', blacklistController.getBlacklists);
router.get('/:itemId', blacklistController.getBlacklist);
router.put('/:itemId', blacklistController.updateBlacklist);

module.exports = router;