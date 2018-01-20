// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var companySchema = new Schema({
    name: String,
    balance: Number,
    parent: String,
    children: Array
});

companySchema.methods.getChildrenCompanies = function() {

    var query = Company.find({ parent: this.name }, function(err, companies) {
        if (err) throw err;
        this.children = companies;
    });

    query.then(function () {
        console.log("2");
        return this.children;
    });

};
// the schema is useless so far
// we need to create a model using it
var Company = mongoose.model('Company', companySchema);

// make this available to our users in our Node applications
module.exports = Company;