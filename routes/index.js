
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

module.exports = function(app) {
    require('./note_routes')(app);
    // Тут, позже, будут и другие обработчики маршрутов
};

