// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var companySchema = new Schema({
    name: String,
    balance: {type:Number},
    parent: String,
    children: Array,
    childrenBalance: {type : Number,default:0},
});

companySchema.methods.getChildrenCompanies = async function() {

    this.childrenBalance = this.balance;

    const cursor = Company.find({ parent: this.name }).cursor();
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {

        await doc.getChildrenCompanies();

        this.childrenBalance += doc.balance;
        this.children.push(doc);
    }



};
// the schema is useless so far
// we need to create a model using it
var Company = mongoose.model('Company', companySchema);

// make this available to our users in our Node applications
module.exports = Company;