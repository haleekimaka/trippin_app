var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new mongoose.Schema({
    title: { type: String },
    location_info: { type: String },
    length: { type: Number },
    kind: [],
    activity1: { type: String },
    activity2: { type: String },
    tips: { type: String },
    _location: { type: Schema.Types.ObjectId, ref: 'Location'},
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    likes: { type: Number, default: 0 },
}, { timestamps: true });

mongoose.model('Review', ReviewSchema);