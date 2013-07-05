var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Cool');
});

var NoteSchema = mongoose.Schema({id: String, text: String});
var Note = mongoose.model('Note', NoteSchema);

module.exports = {

    save: function (data) {
        var note = new Note(data);
        note.save(function (err) {
            if (err) {
                throw err;
            }
        });
    },

    findAll: function (callback) {
        Note.find(function (err, notes) {
            if (err) {
                throw err;
            }
            callback(notes);
        });
    },

    removeAll: function () {
        Note.remove(function (err) {
            if (err) {
                throw err;
            }
        });
    }
};