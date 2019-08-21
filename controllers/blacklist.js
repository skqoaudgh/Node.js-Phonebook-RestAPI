const Blacklist = require('../models/blacklist');

module.exports = {
    createBlacklist: async (req, res, next) => {
        try {
            if(!req.body.number) {
                return res.status(400).json({error: 'Invalid JSON format'});        
            }
    
            const inputBlacklist = new Blacklist({
                Creator: req.userId,
                Number: req.body.number.trim()
            });
            const savedBlacklist = await inputBlacklist.save();
            res.status(201).json(savedBlacklist);         
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});            
        }
    }
}