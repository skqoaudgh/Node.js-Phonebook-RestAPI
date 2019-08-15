const Phonebook = require('../models/phonebook');

function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

module.exports = {
    createItem: async (req, res, next) => {
        try {
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
                Relation: req.body.Relation?(req.body.Relation):'None',
                Email: req.body.email?(req.body.email):'None',
                Comment: req.body.Comment?(req.body.Comment):'None',
            });
            const savedPhonebook = await inputPhonebook.save();
            if(inputPhonebook == savedPhonebook) {
                return res.status(200).json(savedPhonebook);
            }
            else {
                return res.status(204).json({error: 'Not expected value is found'});
            }     
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});           
        }
    },

    getPhonebooks: async (req, res, next) => {
        try {
            const id = req.id;
            const phonebooks = await Phonebook.find({Creator: id});
            if(phonebooks) {
                return res.status(200).json(phonebooks);
            }
            else {
                return res.status(404).json({error: 'No item to serve'});
            }            
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});                
        }
    },

    getPhonebook: async (req, res, next) => {
        try {
            const id = req.id;
            const itemId = req.params.id;
            const phonebook = await Phonebook.findById(itemId);
            if(phonebook) {
                if(phonebook.Creator != id) {
                    return res.status(401).json({error: 'Unauthenticated'});
                }
                else {
                    return res.status(200).json(phonebook);
                }
                
            }
            else {
                return res.status(404).json({error: 'No item to serve'});
            }            
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});                
        }       
    },

    searchPhonebook: async (req, res, next) => {
        try {
            const id = req.id;
            const searchWord = req.params.searchWord;
            if(!searchWord || !searchWord.trim()) {
                return res.status(400).json({error: 'Unexpected JSON input'});
            }

            let pbByName = [], pbByNumber = [], result = {};
            pbByName = await Phonebook.find({$and: [
                {Name: {"$regex": new RegExp(searchWord.replace(/\s+/g,"\\s+"), "gi")}},
                {Creator: id}
            ]});
            if(isNumeric(searchWord)) {
                pbByNumber = await Phonebook.find({$and: [
                    {Number: {"$regex": new RegExp(searchWord.replace(/\s+/g,"\\s+"), "gi")}},
                    {Creator: id}
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
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});               
        }
    },

    updatePhonebook: async (req, res, nexdt) => {
        try {
            const id = req.id;
            const item = req.params.id;
            const phonebook = await Phonebook.findById(item);
            if(phonebook.Creator == id) {
                if(req.body.name) 
                    phonebook.Name = req.body.name;
                if(req.body.number && req.body.number.trim())
                    phonebook.Number = req.body.number.trim();
                if(req.body.Relation)
                    phonebook.Relation = req.body.Relation;
                if(req.body.email && req.body.email.trim())
                    phonebook.Email = req.body.email.trim();
                if(req.body.Comment)
                    phonebook.Comment = req.body.Comment;
                
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
            const id = req.id;
            const item = req.params.id;
            const deletedPhonebook = await Phonebook.findOneAndDelete({_id: item});
            if(deletedPhonebook) {
                if(deletedPhonebook.Creator == id) {
                    return res.status(404).json(deletedPhonebook);
                }
                else {
                    return res.status(401).json({error: 'Unauthenticated'});  
                }
            }
            else {
                return res.status(404).json({error: 'No user to delete'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});           
        }
    }
}