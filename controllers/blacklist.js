const mongoose = require('mongoose');

const Blacklist = require('../models/blacklist');

module.exports = {
    createBlacklist: async (req, res, next) => {
        try {
            if(!req.body.number) {
                return res.status(400).json({error: {
                    "status": 400,
                    "error": 'InvalidJsonNodeValue',
                    "message": 'The value provided for the JSON nodes in the request body was not in the correct format.'
                }});        
            }
    
            const checkOverLap = await Blacklist.find({Creator: req.userId, Number: req.body.number});
            if(checkOverLap && checkOverLap.length > 0) {
                return res.status(409).json({error: {
                    "status": 409,
                    "error": 'ResourceAlreadyExists',
                    "message": 'The number already exists.'
                }});
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
            res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }});               
        }
    },

    getBlacklists: async (req, res, next) => {
        try {
            const blacklists = await Blacklist.find({Creator: req.userId});
            if(blacklists && blacklists.length == 0) {
                return res.status(404).json({error: {
                    "status": 404,
                    "error": 'ItemNotFound',
                    "message": 'The item does not exist.'
                }});
            }

            res.status(200).json(blacklists);    
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }});                
        }
    },

    getBlacklist: async (req, res, next) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(400).json({error: {
                    "status": 400,
                    "error": 'InvalidQueryParameterValue',
                    "message": 'An invalid value was specified for itemId of the query parameters in the request URI.'
                }});
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.userId});
            if(!blacklist) {
                return res.status(404).json({error: {
                    "status": 404,
                    "error": 'ItemNotFound',
                    "message": 'The item does not exist.'
                }});
            }

            res.status(200).json(blacklist);          
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }});                   
        }       
    },

    updateBlacklist: async (req, res, nexdt) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(400).json({error: {
                    "status": 400,
                    "error": 'InvalidQueryParameterValue',
                    "message": 'An invalid value was specified for itemId of the query parameters in the request URI.'
                }});
            }

            const blacklist = await Blacklist.findOne({_id: itemId, Creator: req.userId});
            if(!blacklist) {
                return res.status(404).json({error: {
                    "status": 404,
                    "error": 'ItemNotFound',
                    "message": 'The item does not exist.'
                }});
            }

            if(req.body.number && req.body.number.trim())
                blacklist.Number = req.body.number.trim();
            
            try {
                const updatedBlacklist = await blacklist.save();
                res.status(200).json(updatedBlacklist);
            }
            catch(err) {
                console.error(err);
                res.status(500).json({error: {
                    "status": 500,
                    "error": 'InternalError',
                    "message": 'The server encountered an internal error. Please retry the request.'
                }});                       
            }
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }});     
        }
    },

    deleteBlacklist: async (req, res, next) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(400).json({error: {
                    "status": 400,
                    "error": 'InvalidQueryParameterValue',
                    "message": 'An invalid value was specified for itemId of the query parameters in the request URI.'
                }});
            }

            const deletedBlacklist = await Blacklist.findOneAndDelete({_id: itemId, Creator: req.userId});
            if(!deletedBlacklist) {
                return res.status(404).json({error: {
                    "status": 404,
                    "error": 'ItemNotFound',
                    "message": 'The item does not exist.'
                }});
            }

            res.status(200).json(deletedBlacklist);     
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }});             
        }
    }
}