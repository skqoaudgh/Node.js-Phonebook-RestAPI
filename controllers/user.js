const User = require('../models/user');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            if(!req.body.id.trim() || !req.body.password.trim() || !req.body.nickname) {
                return res.status(400).json({error: 'Unexpected JSON input'});
            }

            if(req.body.id.trim().length < 4) {
                return res.status(403).json({error: 'ID is too short'});
            }
            if(req.body.id.trim().length > 20) {
                return res.status(403).json({error: 'ID is too long'});
            }

            if(req.body.nickname.length < 4) {
                return res.status(403).json({error: 'Nickname is too short'});
            }
            if(req.body.nickname.length > 20) {
                return res.status(403).json({error: 'Nickname is too long'});
            }

            if(req.body.password.trim().length < 4) {
                return res.status(403).json({error: 'Password is too short'});
            }
            if(req.body.password.trim().length > 20) {
                return res.status(403).json({error: 'Password is too long'});
            }

            const searchedUser = await User.find({$or: [{ID: req.body.id}, {Nickname: req.body.nickname}]});
            if(searchedUser.length) {
                return res.status(409).json({error: 'ID or Nickname is already exist'});
            }

            const inputUser = new User({
                ID: req.body.id.trim(),
                Password: req.body.password.trim(),
                Nickname: req.body.nickname,
                Comment: req.body.comment
            });
            const savedUser = await inputUser.save();
            if(inputUser == savedUser) {
                return res.status(200).json(savedUser);
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

    getUserById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await User.findOne({ID: id});
            if(user) {
                return res.status(200).json(user);
            }
            else {
                return res.status(404).json({error: 'No user to serve'});
            }
        }
        catch(err) {
            console.error(err);         
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    getUserByNickname: async (req, res, next) => {
        try {
            const nickname = req.params.nickname;
            const user = await User.findOne({Nickname: nickname});
            if(user) {
                return res.status(200).json(user);
            }
            else {
                return res.status(404).json({error: 'No user to serve'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});   
        }
    },

    getUserExceptionHandler: (req, res, next) => {
        return res.status(400).json({error: 'URI format is not available'});
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            if(users) {
                return res.status(200).json(users);
            }
            else {
                return res.status(404).json({error: 'No users to serve'});
            }
        }
        catch(err) {
            console.error(err);     
            return res.status(500).json({error: 'Internal server error'});  
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await User.findOne({ID: id});
            if(user) {
                const searchedUser = await User.find({
                    $and: [
                        { $or: [{ID: req.body.id}, {Nickname: req.body.nickname}] },
                        { _id: {$ne: user._id} }
                    ]});
                if(searchedUser.length) {
                    return res.status(409).json({error: 'ID or Nickname is already exist'});
                }

                user.ID = req.body.id.trim();
                user.Password = req.body.password.trim();
                user.Nickname = req.body.nickname;
                user.Comment = req.body.comment;

                try {
                    const updatedUser = await user.save();
                    return res.status(200).json(updatedUser);
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
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    updateUserByNickname: async (req, res, next) => {
        try {
            const nickname = req.params.nickname;
            const user = await User.findOne({Nickname: nickname});
            if(user) {
                const searchedUser = await User.find({
                    $and: [
                        { $or: [{ID: req.body.id}, {Nickname: req.body.nickname}] },
                        { _id: {$ne: user._id} }
                    ]});
                if(searchedUser.length) {
                    return res.status(409).json({error: 'ID or Nickname is already exist'});
                }

                user.ID = req.body.id.trim();
                user.Password = req.body.password.trim();
                user.Nickname = req.body.nickname;
                user.Comment = req.body.comment;

                try {
                    const updatedUser = await user.save();
                    return res.status(200).json(updatedUser);
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
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});
        }
    }
}