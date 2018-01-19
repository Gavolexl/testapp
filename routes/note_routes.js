var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

    app.get('/', (req,res) => {
        console.log("2");
        res.render('index');
    });
    app.get('/partials/:name', (req, res) => {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.post('/postslist', (req, res) => {
        console.log("3");
        db.collection("notes").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.json({
                posts: result
            });
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send({post:item});
            }
        });
    });

    app.post('/notes', (req, res) => {
        const note = { text: req.body.text, title: req.body.title };
        console.log(req);
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.put ('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.text, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });
};