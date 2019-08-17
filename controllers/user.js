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
                return res.status(201).json(savedUser);
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

    getUsers: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }
            
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

    getUser: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }

            const userId = req.params.userId;
            const user = await User.findById(userId);
            if(req.id == userId) {
                if(user) {
                    return res.status(200).json(user);
                }
                else {
                    return res.status(404).json({error: 'No user to serve'});
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

    updateUser: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }

            const userId = req.params.userId;
            if(req.id == userId) {
                const user = await User.findById(userId);
                if(user) {
                    const searchedUser = await User.find({
                        $and: [
                            { $or: [{ID: req.body.id}, {Nickname: req.body.nickname}] },
                            { _id: {$ne: user._id} }
                        ]});
                    if(searchedUser.length) {
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
            else {
                return res.status(401).json({error: 'Unauthenticated'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }

            const userId = req.params.userId;
            if(req.id == userId) {
                const deletedUser = await User.findOneAndDelete({_id: userId});
                if(deletedUser) {
                    return res.status(404).json(deletedUser);
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