var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    console.log("1");

    app.post('/api/posts', (req, res) => {
        console.log("3");
        db.collection("notes").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.json({
                posts: result
            });
        });
    });

    app.get('/', (req,res) => {
        console.log("2");
        res.render('index');
    });
    app.get('/partials/:name', (req, res) => {
        console.log("8");
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.get('/api/post/:id', (req, res) => {
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
    });




    app.post('/api/post', (req, res) => {
        console.log("4");
        const note = { text: req.body.text, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/api/post/:id', (req, res) => {
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

    app.put ('/api/post/:id', (req, res) => {
        console.log("put");
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
    });

    app.get('*', (req,res) => {
        console.log("9");
        res.render('index');
    });

};