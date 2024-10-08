const Player = require('../models/playerModel');

exports.registerPlayer = async (req, res) => {
    try {
        const { name } = req.body;
        const player = new Player({ name });
        await player.save();
        res.status(201).json({ message: 'Player registered successfully', player });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
