const express = require('express');
const router = express.Router();

const blacklistController = require('../controllers/blacklist');

router.post('/', blacklistController.createBlacklist);
router.get('/', blacklistController.getBlacklists)
router.get('/:itemId', blacklistController.getBlacklist)

module.exports = router;