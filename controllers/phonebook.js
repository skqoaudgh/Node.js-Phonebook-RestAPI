const Phonebook = require('../models/phonebook');

function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

module.exports = {
    createItem: async (req, res, next) => {
        try {
            const userId = req.userId;
            if(req.id == userId) {
                if(!req.body.name || !req.body.number || !req.body.name.trim() || !req.body.number.trim()) {
                    return res.status(400).json({error: 'Unexpected JSON input'});
                }
    
                if(req.body.email) {
                    req.body.email = req.body.email.trim();
                }
    
                const id = req.id;
                const inputPhonebook = new Phonebook({
                    Creator: id,
                    Name: req.body.name,
                    Number: req.body.number.trim(),
                    Relation: req.body.relation?(req.body.relation):'None',
                    Email: req.body.email?(req.body.email):'None',
                    Comment: req.body.comment?(req.body.comment):'None',
                });
                const savedPhonebook = await inputPhonebook.save();
                if(inputPhonebook == savedPhonebook) {
                    return res.status(201).json(savedPhonebook);
                }
                else {
                    return res.status(204).json({error: 'Not expected value is found'});
                }   
            }
            else {
                return res.status(401).json({error: 'Unauthenticated'});
            }   
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});           
        }
    },

    getPhonebooks: async (req, res, next) => {
        try {
            const userId = req.userId;
            if(req.id == userId) {
                const phonebooks = await Phonebook.find({Creator: userId});
                if(phonebooks && phonebooks.length > 0) {
                    return res.status(200).json(phonebooks);
                }
                else {
                    return res.status(404).json({error: 'No item to serve'});
                }  
            }
            else {
                return res.status(401).json({error: 'Unauthenticated'});
            }    
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});                
        }
    },

    getPhonebook: async (req, res, next) => {
        try {
            const userId = req.userId;
            const itemId = req.params.Itemid;
            if(req.id == userId) {
                const phonebook = await Phonebook.findOne({_id: itemId, Creator: userId});
                if(phonebook) {
                    return res.status(200).json(phonebook);
                }
                else {
                    return res.status(404).json({error: 'No item to serve'});
                }
            }
            else {
                return res.status(401).json({error: 'Unauthenticated'});
            }            
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});                
        }       
    },

    searchPhonebook: async (req, res, next) => {
        try {
            const userId = req.userId;
            if(req.id == userId) {
                const searchWord = req.params.searchWord;
                if(!searchWord || !searchWord.trim()) {
                    return res.status(400).json({error: 'Unexpected JSON input'});
                }
    
                let pbByName = [], pbByNumber = [], result = {};
                pbByName = await Phonebook.find({$and: [
                    {Name: {"$regex": new RegExp(searchWord.replace(/\s+/g,"\\s+"), "gi")}},
                    {Creator: userId}
                ]});
                if(isNumeric(searchWord)) {
                    pbByNumber = await Phonebook.find({$and: [
                        {Number: {"$regex": new RegExp(searchWord.replace(/\s+/g,"\\s+"), "gi")}},
                        {Creator: userId}
                    ]});
                }
    
                if(pbByName.length > 0) {
                    result.resultByName = pbByName;
                }
                if(pbByNumber.length > 0) {
                    result.resultByNumber = pbByNumber;
                }
    
                if(pbByName.length == 0 && pbByNumber.length == 0) {
                    return res.status(404).json({error: 'No item to serve'});
                }

                return res.status(200).json(result);
            }
            else {
                return res.status(401).json({error: 'Unauthenticated'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});               
        }
    },

    searchPhonebookByRelation: async (req, res, next) => {
        try {
            const userId = req.userId;
            if(req.id == userId) {
                const searchWord = req.params.searchWord;
                if(!searchWord || !searchWord.trim()) {
                    return res.status(400).json({error: 'Unexpected JSON input'});
                }
    
                const phonebook = await Phonebook.find({$and: [
                    {Relation: {"$regex": new RegExp(searchWord.replace(/\s+/g,"\\s+"), "gi")}},
                    {Creator: userId}
                ]});
                if(phonebook.length == 0) {
                    return res.status(404).json({error: 'No item to serve'});
                }
                return res.status(200).json(phonebook);
            }
            else {
                return res.status(401).json({error: 'Unauthenticated'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});               
        }
    },

    updatePhonebook: async (req, res, nexdt) => {
        try {
            const userId = req.userId;
            if(req.id == userId) {
                const itemid = req.params.Itemid;
                const phonebook = await Phonebook.findOne({_id: itemid, Creator: userId});
    
                if(phonebook) {
                    if(req.body.name) 
                        phonebook.Name = req.body.name;
                    if(req.body.number && req.body.number.trim())
                        phonebook.Number = req.body.number.trim();
                    if(req.body.relation)
                        phonebook.relation = req.body.relation;
                    if(req.body.email && req.body.email.trim())
                        phonebook.Email = req.body.email.trim();
                    if(req.body.comment)
                        phonebook.Comment = req.body.comment;
                    
                    try {
                        const updatedPhonebook = await phonebook.save();
                        return res.status(200).json(updatedPhonebook);
                    }
                    catch(err) {
                        console.error(err);
                        return res.status(500).json({error: 'Internal server error'});                   
                    }
                }
                else {
                    return res.status(404).json({error: 'No user to update'});
                }
            }
            else {
                return res.status(401).json({error: 'Unauthenticated'}); 
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'}); 
        }
    },

    deletePhonebook: async (req, res, next) => {
        try {
            const userId = req.userId;
            if(req.id == userId) {
                const itemId = req.params.Itemid;
                const deletedPhonebook = await Phonebook.findOneAndDelete({_id: itemId, Creator: userId});
                if(deletedPhonebook) {
                    return res.status(404).json(deletedPhonebook);
                }
                else {
                    return res.status(404).json({error: 'No user to delete'});
                }
            }
            else {
                return res.status(401).json({error: 'Unauthenticated'}); 
            }           
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});           
        }
    }
}