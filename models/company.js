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

companySchema.methods.getChildrenCompanies = async function() {

    $jcount = 0;
    await Company.find({ parent: this.name }).exec()
        .then((result) => {
            /*if (result !== undefined) {
                console.log(this.name);
                pname = this.name;
                for ($j = 0; $j < result.length; $j++) {
                   result[$j].getChildrenCompanies()
                       .then(function (childchild) {
                           console.log(childchild);
                       })
                }

            }else {
                return "";
            }*/
            this.children = result;
            return this.children;
        });
};
// the schema is useless so far
// we need to create a model using it
var Company = mongoose.model('Company', companySchema);

// make this available to our users in our Node applications
module.exports = Company;