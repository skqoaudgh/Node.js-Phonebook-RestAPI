const User = require('../models/user');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            if(!req.body.id || !req.body.password.trim() || !req.body.nickname) {
                return res.status(400).json({error: 'Unexpected JSON input'});
            }

            const searchedUser = await User.find({$or: [{ID: req.body.id}, {Nickname: req.body.nickname}]});
            if(searchedUser.length) {
                return res.status(409).json({error: 'ID or Nickname is already exist'});
            }

            if(req.body.password.trim().length < 6) {
                return res.status(403).json({error: 'Password is too short'});
            }

            const inputUser = new User({
                ID: req.body.id,
                Password: req.body.password.trim(),
                Nickname: req.body.nickname,
                Comment: req.body.comment
            });
            const savedUser = await inputUser.save();
            if(inputUser == savedUser) {
                res.status(200).json(savedUser);
            }
            else {
                res.status(204).json({error: 'Not expected value is found'});
            }
        }
        catch(err) {
            res.status(500).json({error: 'Internal server error'});
            console.error(err);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const word = req.params.word;
            const user = await User.findOne({$or: [{ID: word}, {Nickname: word}]});
            if(user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({error: 'No user to serve'});
            }
        }
        catch(err) {
            res.status(500).json({error: 'Internal server error'});
            console.error(err);           
        }
    },

    getUserExceptionHandler: (req, res, next) => {
        res.status(400).json({error: 'URI format is not available'});
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            if(users) {
                res.status(200).json(users);
            }
            else {
                res.status(404).json({error: 'No users to serve'});
            }
        }
        catch(err) {
            res.status(500).json({error: 'Internal server error'});
            console.error(err);           
        }
    }
}