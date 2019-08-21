const mongoose = require('mongoose');

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
    },

    getBlacklists: async (req, res, next) => {
        try {
            const blacklists = await Blacklist.find({Creator: req.userId});
            if(!blacklists || blacklists.length == 0) {
                return res.status(404).json({error: 'No item to serve'});
            }

            res.status(200).json(blacklists);    
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});             
        }
    },

    getBlacklist: async (req, res, next) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(422).json({error: 'Invalid item ID'});
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.userId});
            if(!blacklist) {
                return res.status(404).json({error: 'No item to serve'});
            }

            res.status(200).json(blacklist);          
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});                
        }       
    },

    updateBlacklist: async (req, res, nexdt) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(422).json({error: 'Invalid item ID'});
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.userId});
            if(!blacklist) {
                return res.status(404).json({error: 'No item to update'});
            }

            if(req.body.number && req.body.number.trim())
                blacklist.Number = req.body.number.trim();
            
            try {
                const updatedBlacklist = await blacklist.save();
                res.status(200).json(updatedBlacklist);
            }
            catch(err) {
                console.error(err);
                res.status(500).json({error: 'Internal server error'});                   
            }
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'}); 
        }
    }
}