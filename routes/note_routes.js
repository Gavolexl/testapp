var ObjectID = require('mongodb').ObjectID;
var companyModel = require('../models');

module.exports = function (app) {

    app.get('/', (req,res) => {
        console.log("2");
        res.render('index');
    });
    app.get('/partials/:name', (req, res) => {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.post('/companies', (req, res) => {
        /*console.log("3");
        db.collection("notes").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.json({
                posts: result
            });
        });*/

        companyModel.find({}, function(err, companies) {
            if (err) throw err;

            res.json({
                companies: companies
            });
        });
    });

    app.get('/company/:id', (req, res) => {
        const id = req.params.id;
        /*const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send({company:item});
            }
        });*/
        companyModel.findById(id, function(err, company) {
            if (err) throw err;

            // show the one company
            res.send({company:company});
        });
    });

    app.post('/company', (req, res) => {
        /* console.log(req);
         db.collection('notes').insert(note, (err, result) => {
             if (err) {
                 res.send({ 'error': 'An error has occurred' });
             } else {
                 res.send(result.ops[0]);
             }
         });*/

        console.log(req.body);
        // create a new user
        var company = new companyModel({
            name: req.body.name,
            balance: req.body.balance,
            parent: req.body.parent
        });

        console.log(company.name);
// save the user
        company.save(function(err) {
            if (err) throw err;

            res.send(company);
        });
    });

    app.delete('/company/:id', (req, res) => {
        const id = req.params.id;
        /* const details = { '_id': new ObjectID(id) };
         db.collection('notes').remove(details, (err, item) => {
             if (err) {
                 res.send({'error':'An error has occurred'});
             } else {
                 res.send('company ' + id + ' deleted!');
             }
         });*/
        // find the user with id 4
        companyModel.findByIdAndRemove(id, function(err) {
            if (err) throw err;

            // we have deleted the user
            res.send('company ' + id + ' deleted!');
        });
    });

    app.put ('/company/:id', (req, res) => {
        const id = req.params.id;
        /* const details = { '_id': new ObjectID(id) };
         const note = { text: req.body.text, title: req.body.title };
         db.collection('notes').update(details, note, (err, result) => {
             if (err) {
                 res.send({'error':'An error has occurred'});
             } else {
                 res.send(note);
             }
         });*/
        const company = { name: req.body.name, balance: req.body.balance, parent: req.body.parent };
        companyModel.findByIdAndUpdate(id, company, function(err, company) {
            if (err) throw err;
            // we have the updated user returned to us
            res.send(company);
        });
    });
}