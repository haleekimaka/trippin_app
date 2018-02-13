var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 3 },
    follows: [],
    followed_by: [],
    written_reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    liked_reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    liked_locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
}, { timestamps: true })

mongoose.model('User', UserSchema);
