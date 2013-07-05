var notes = require('../models/notes');

/// Get notes
module.exports = {

    index: function(req, res) {
        res.render('index', { title: 'TODO'});
    }

};