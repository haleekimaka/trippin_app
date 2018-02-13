var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new mongoose.Schema({
    coords: [],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    city: { type: String },
    state: { type: String },
    country: { type: String },
    likes: {type: Number}
}, { timestamps: true });

mongoose.model('Location', LocationSchema);
