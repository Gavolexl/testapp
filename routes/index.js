
/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log("index");
    res.render('index');
};

exports.partials = function (req, res) {
    console.log("parts");
    var name = req.params.name;
    res.render('partials/' + name);
};
const noteRoutes = require('./note_routes');
module.exports = function(app, db) {
       noteRoutes(app, db);
    // Тут, позже, будут и другие обработчики маршрутов
};