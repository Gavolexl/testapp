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

        var counter = 0;
        companyModel.find({parent:"root"}).exec()
            .then(function (companies) {
                for ($i = 0; $i < companies.length; $i++) {
                    companies[$i].getChildrenCompanies().then(function (data) {
                        counter++;
                        if (counter === companies.length) {
                            res.json({companies:companies});
                        }
                    });
                }


            })

    });
    app.post('/companiessel', (req, res) => {

        var counter = 0;
        companyModel.find().exec()
            .then(function (companies) {

                /*for ($i = 0; $i < companies.length; $i++) {

                    companies[$i].getChildrenCompanies().then(function (data) {
                        counter++;
                        if (counter === companies.length) {
                            res.json({companies:companies});
                        }
                    });
                }*/

                res.json({companies:companies});


            })

    });

    app.get('/company/:id', (req, res) => {
        const id = req.params.id;

        companyModel.findById(id, function(err, company) {
            if (err) throw err;

            // show the one company
            res.send({company:company});
        });
    });

    app.post('/company', (req, res) => {

        // create a new user
        var company = new companyModel({
            name: req.body.name,
            balance: req.body.balance,
            parent: req.body.parent
        });

        if (req.body.name === undefined || req.body.balance === undefined) {
            res.send({'error' : "Some field are empty"});
        } else {
            company.save(function (err) {
                if (err) throw err;

                res.send(company);
            });
        }
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