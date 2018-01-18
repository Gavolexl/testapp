const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express.createServer();
const port = 8000;

/*app.use(bodyParser.urlencoded({ extended: true }));*/
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
        layout: false
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    /*app.use(app.router);*/
});

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    require('./routes')(app, database.db("test_base"));
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});