var ObjectID = require('mongodb').ObjectID;

var MongoClient    = require('mongodb').MongoClient;
// module.exports = function(app, db) {
//
//
// };
MongoClient.connect("mongodb://root:root@ds251727.mlab.com:51727/test_base", (err, database) => {
    if (err) return console.log(err);

    db = database.db("test_base");
    exports.posts = function (req, res) {
        console.log(".5");
        db.collection("notes").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.json({
                posts: result
            });
        });
    };

    exports.post = function (req, res) {
        console.log("111");
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    };

// POST

    exports.addPost = function (req, res) {
        console.log("4");
        const note = { text: req.body.text, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    };

// PUT

    exports.editPost = function (req, res) {
        console.log("nice2");
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    };

// DELETE

    exports.deletePost = function (req, res) {
        console.log("nice");
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    };
});