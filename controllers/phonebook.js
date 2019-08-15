const Phonebook = require('../models/phonebook');

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
    }
}