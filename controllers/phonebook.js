const mongoose = require('mongoose');
const Phonebook = require('../models/phonebook');

function ValidateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}

module.exports = {
    createItem: async (req, res, next) => {
        try {
            if(!req.body.name || !req.body.number || !req.body.name.trim() || !req.body.number.trim()) {
                return res.status(400).json({error: 'Invalid JSON format'});
            }

            if(req.body.group) {
                req.body.group = req.body.group.trim();
            }

            if(req.body.email) {
                req.body.email = req.body.email.trim();
            }

            if(req.body.comment) {
                req.body.comment = req.body.comment.trim();
            }
 
            if(req.body.address) {
                req.body.address = req.body.address.trim();
            }

            if(req.body.name.length > 20) {
                return res.status(422).json({error: 'Name is too long'});
            }

            if(req.body.group && req.body.group.length > 20) {
                return res.status(422).json({error: 'Group name is too long'});
            }

            if(req.body.comment && req.body.comment.length > 20) {
                return res.status(422).json({error: 'comment is too long'});
            }

            if(req.body.address && req.body.address.length > 20) {
                return res.status(422).json({error: 'Address is too long'});
            }
                       
            if(req.body.email && !ValidateEmail(req.body.email)) {
                return res.status(422).json({error: 'Email format incorrect'});
            }

            const inputPhonebook = new Phonebook({
                Creator: req.userId,
                Name: req.body.name,
                Number: req.body.number.trim(),
                Group: req.body.group?(req.body.group):'None',
                Email: req.body.email?(req.body.email):'None',
                Address: req.body.address?(req.body.address):'None',
                Comment: req.body.comment?(req.body.comment):'None',
            });
            const savedPhonebook = await inputPhonebook.save();
            res.status(201).json(savedPhonebook);    
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});           
        }
    },

    getPhonebooks: async (req, res, next) => {
        try {
            const phonebooks = await Phonebook.find({Creator: req.userId});
            if(!phonebooks || phonebooks.length == 0) {
                return res.status(404).json({error: 'No item to serve'});
            }

            res.status(200).json(phonebooks); 
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});                
        }
    },

    getPhonebook: async (req, res, next) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(422).json({error: 'Invalid item ID'});
            }

            const phonebook = await Phonebook.findOne({_id: itemId, Creator: req.userId});
            if(!phonebook) {
                return res.status(404).json({error: 'No item to serve'});
            }

            res.status(200).json(phonebook);          
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});                
        }       
    },

    updatePhonebook: async (req, res, nexdt) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(422).json({error: 'Invalid item ID'});
            }

            const phonebook = await Phonebook.findOne({_id: itemId, Creator: req.userId});
            if(!phonebook) {
                return res.status(404).json({error: 'No item to update'});
            }

            if(req.body.name) 
                phonebook.Name = req.body.name;
            if(req.body.number && req.body.number.trim())
                phonebook.Number = req.body.number.trim();
            if(req.body.group)
                phonebook.group = req.body.group;
            if(req.body.email && req.body.email.trim())
                phonebook.Email = req.body.email.trim();
            if(req.body.comment)
                phonebook.Comment = req.body.comment;
            
            try {
                const updatedPhonebook = await phonebook.save();
                res.status(200).json(updatedPhonebook);
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
    },

    deletePhonebook: async (req, res, next) => {
        try {
            const itemId = req.params.itemId;
            if(!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(422).json({error: 'Invalid item ID'});
            }

            const deletedPhonebook = await Phonebook.findOneAndDelete({_id: itemId, Creator: req.userId});
            if(!deletedPhonebook) {
                return res.status(404).json({error: 'No item to delete'});
            }

            res.status(200).json(deletedPhonebook);     
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});           
        }
    },

    searchPhonebook: async (req, res, next) => {
        try {
            if(!req.body.name && !req.body.number && !req.body.group) {
                return res.status(400).json({error: 'Invalid JSON format'});
            }

            const name = req.body.name?req.body.name:'';
            const number = req.body.number?req.body.number:'';
            const group = req.body.group?req.body.group:'';

            const nameReg = new RegExp(name.replace(/\s+/g,"\\s+"), "gi");
            const numberReg = new RegExp(number.replace(/\s+/g,"\\s+"), "gi");
            const groupReg = new RegExp(group.replace(/\s+/g,"\\s+"), "gi");

            const phonebooks = await Phonebook.find({$and: [
                {Name: {"$regex": nameReg}},
                {Number: {"$regex": numberReg}},
                {Group: {"$regex": groupReg}},
                {Creator: req.userId}
            ]});
            
            res.status(200).json(phonebooks);
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});    
        }
    }
}