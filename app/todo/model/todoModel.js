const   mongoose = require('mongoose'),
        Schema   = mongoose.Schema;

const todoSchema = new Schema({
    tittle: String,
    description: String,
    expiration: Date,
    completed: Date,
    deleted: Date,
    created: Date
});

const model = mongoose.model('Todo', todoSchema);

module.exports.getModel = () => {
    return model;
}


