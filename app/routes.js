
const User = require('./exercise');
const dateFormat = require('dateformat')

const CreateUser = async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        try {
            const newUser = await User.create({
                username
            });
            res.status(200).json({ _id: newUser._id, username: newUser.username })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    }
    else {
        res.status(400).json({ "error": "username already exists." })
    }
}


const GetAllUsers = async (req, res, next) => {
    const users = await User.find().select('_id username');

    res.status(200).json([...users])
}

const AddExcercise = async (req, res, next) => {
    const { userId, description, duration, date } = req.body;
    const exercise = { description, duration, date: date || dateFormat(Date.now(), "yyyy-mm-dd") }
    if (!userId) {
        res.status(400).json("unknown userid");
    }

    const user = await User.findOne({ _id: userId });

    if (user) {
        user.exercises = [...user.exercises, exercise]

        const result = await user.save();
        res.status(200).json(result);
    }
    else {
        res.status(400).json("unknown userid");
    }
}

const GetExercises = async (req, res, next) => {
    var result = {};
    const { userId, to, from, limit } = req.query;
    if (!userId) {
        res.status(400).json("unkown userid")
    }
    
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).json("unkown user");
    }
    if (to && from) {
        result = await User.findOne({ _id: userId }, { date: { $gte: new Date(from), $lte: new Date(to) } });
    }
    else if (limit) {
        result = await User.findOne({ _id: userId }, { exercises: { $slice: parseInt(limit) } });
    }
    else {
        result = await User.findOne({ _id: userId });
    }
    res.status(200).json({ _id: result._id, username: result.username, count: result.exercises && result.exercises.length, log: result.exercises });
}

module.exports = { CreateUser, GetAllUsers, AddExcercise, GetExercises };