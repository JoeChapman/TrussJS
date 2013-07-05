var notes = require('../models/notes');

// Add note
module.exports = {

    create: function (req, res) {
        notes.save(req.body);
        res.send('Well done!');
    },

    read: function (req, res) {
        notes.findAll(function (all) {
            res.json(all);
        });
    },

    update: function () {},

    remove: function (req, res) {
        notes.removeAll();
        res.send('Removed!');
    }


};