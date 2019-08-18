const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {

    createUser: async (req, res, next) => {
        try {
            if(!req.body.id || !req.body.password || !req.body.id.trim() || !req.body.password.trim() || !req.body.nickname) {
                return res.status(400).json({error: 'Unexpected JSON input'});
            }

            if(req.body.id.trim().length < 4) {
                return res.status(403).json({error: 'ID is too short'});
            }
            else if(req.body.id.trim().length > 20) {
                return res.status(403).json({error: 'ID is too long'});
            }

            if(req.body.nickname.length < 4) {
                return res.status(403).json({error: 'Nickname is too short'});
            }
            else if(req.body.nickname.length > 20) {
                return res.status(403).json({error: 'Nickname is too long'});
            }

            if(req.body.password.trim().length < 4) {
                return res.status(403).json({error: 'Password is too short'});
            }
            else if(req.body.password.trim().length > 20) {
                return res.status(403).json({error: 'Password is too long'});
            }

            if(req.body.comment.trim().length > 100) {
                return res.status(403).json({error: 'Comment is too long'});
            }

            const searchedUser = await User.find({$or: [{ID: req.body.id}, {Nickname: req.body.nickname}]});
            if(searchedUser.length > 0) {
                return res.status(409).json({error: 'ID or Nickname is already exist'});
            }

            const inputUser = new User({
                ID: req.body.id.trim(),
                Password: req.body.password.trim(),
                Nickname: req.body.nickname,
                Comment: req.body.comment
            });
            const savedUser = await inputUser.save();
            res.status(201).json(savedUser);
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            if(!users) {
                return res.status(404).json({error: 'No users to serve'});
            }

            res.status(200).json(users);
        }
        catch(err) {
            console.error(err);     
            res.status(500).json({error: 'Internal server error'});  
        }
    },

    getUser: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            if(!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({error: 'User ID incorrect'});
            }

            const user = await User.findById(userId);
            if(!user) {
                return res.status(404).json({error: 'No user to serve'});
            }

            res.status(200).json(user);
        }
        catch(err) {
            console.error(err);     
            return res.status(500).json({error: 'Internal server error'});             
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            if(!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({error: 'User ID incorrect'});
            }

            const user = await User.findById(userId);
            if(!user) {
                return res.status(404).json({error: 'No user to update'});
            }

            const searchedUser = await User.find({
                $and: [
                    { $or: [{ID: req.body.id}, {Nickname: req.body.nickname}] },
                    { _id: {$ne: user._id} }
                ]});
            if(searchedUser.length > 0) {
                return res.status(409).json({error: 'ID or Nickname is already exist'});
            }

            if(req.body.password && req.body.password.trim())
                user.Password = req.body.password.trim();
            if(req.body.nickname)
                user.Nickname = req.body.nickname;
            if(req.body.comment)
                user.Comment = req.body.comment;

            try {
                const updatedUser = await user.save();
                res.status(200).json(updatedUser);
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

    deleteUser: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            if(!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({error: 'User ID incorrect'});
            }

            const deletedUser = await User.findOneAndDelete({_id: userId});
            if(!deletedUser) {
                return res.status(404).json({error: 'No user to delete'});
            }

            res.status(404).json(deletedUser);
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});           
        }
    }
}