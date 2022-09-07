const { User } = require('../models');

const { signToken } = require('../utils/auth')


module.exports = {
    getUsers(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ email: req.body.email })
        .select('.__v')
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },

    signUp(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },

    login(req, res) {
        User.findOne({ email: req.body.email })
        .select('.__v')
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            const correctPw = await user.isCorrectPassword(req.body.password)
            
            if(!correctPw) {
                res.status(401).json({ message: 'Incorrect password or email'})
            }

            const token = signToken(user);

            res.send(token)
        })
        .catch((err) => res.status(500).json(err));
    }
}