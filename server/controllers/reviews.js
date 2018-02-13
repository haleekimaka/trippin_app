var mongoose = require('mongoose');
var User = mongoose.model('User');
var Location = mongoose.model('Location');
var Review = mongoose.model('Review');


module.exports = {
    get_user: function (req, res) {
        User.find({ _id: req.params.id }).populate('written_reviews').populate('liked_reviews').exec(function (err, user) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log(user)
                console.log('successfully found the user!');
                res.json(user);
            }
        })
    },
    create_user: function (req, res) {
        console.log(req.body);
        var user = new User({
            username: req.body.username
        })
        user.save(function (err) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log('successfully added new user!');
                res.json(user._id);
            }
        })
    },
    check_user: function (req, res) {
        User.findOne({ username: req.params.username }, function (err, user) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log(user)
                console.log('successfully found the user!');
                res.json(user);
            }
        })
    },

    follow_user: function(req,res) {
        console.log("entered follow_user")
        User.findOne({_id: req.body.follower}, function(err, record){
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log("follower record: ", record);
                User.findOne({ _id: req.params.id }, function (err, other_record) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    }
                    else {
                        console.log("Line 66 follow_user: ", other_record);
                        other_record.followed_by.push({ _id: record._id, username: record.username });
                        other_record.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.json(err);
                            }
                            else {
                                record.follows.push({ _id: other_record._id, username: other_record.username, written_reviews: other_record.written_reviews.length });
                                record.save(function(err){
                                    if (err) {
                                        console.log(err);
                                        res.json(err);
                                    }
                                    else{
                                        console.log("successfully saved records");
                                    }
                                })
                            }
                        })
                        res.json(record);
                    }
                })
            }
        })
    },

    unfollow_user: function (req,res){
        console.log("follower id:",req.body.follower);
        console.log("entered unfollow_user")
        User.findOne({ _id: req.params.id }, function (err, record) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log("followed users' record: ", record);
                let edited_followers = [];
                for(let x = 0; x < record.followed_by.length; x++) {
                    if (record.followed_by[x]['_id'] != req.body.follower){
                        console.log(record.followed_by[x]['_id']);
                        console.log(req.body.follower);
                        edited_followers.push(record.followed_by[x]);
                    }
                }
                console.log(edited_followers);
                record.followed_by = edited_followers;
                console.log("record with edited_followers",record);
                record.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    }
                    else{
                        console.log("successfully saved record, about to get followers record");
                        User.findOne({ _id: req.body.follower }, function (err, other_record) {
                            if (err){
                                console.log(err);
                                res.json(err);
                            }
                            else {
                                console.log("followers record: ",other_record)
                                let new_follows = [];
                                if (other_record){
                                    for (let x = 0; x < other_record.follows.length; x++) {
                                        if (other_record.follows[x]._id != req.params.id) {
                                            new_follows.push(other_record.follows[x]);
                                        }
                                    }
                                    other_record.follows = new_follows;
                                    console.log("Edited followers record: ",other_record)
                                    other_record.save( function(err){
                                        if (err) {
                                            console.log(err);
                                            res.json(err);
                                        }
                                        else{
                                            console.log("Saved Followers record: ", other_record);
                                        }
                                    })
                                }
                                res.json(other_record);
                            }
                        })
                    }
                })
            }
        })
    },

    search: function(req,res){
        console.log(req.params.type);
        console.log(req.params.query);
        if(req.params.type == "username"){
            let name = req.params.query;
            User.find({ username: { $regex: '.*' + name + '.*', $options: "i" }}, function(err, user_records){
                if (err){
                    console.log(err);
                    res.json(err);
                }
                else{
                    console.log("found these records: ",user_records);
                    res.json(user_records);
                }
            })
        }

        else if (req.params.type == "location") {
            let place = req.params.query;
            Review.find({ location_info: { $regex: '.*' + place + '.*', $options: "i" } }, function (err, reviews){
                if (err) {
                    console.log(err);
                    res.json(err);
                }
                else {
                    console.log("found these reviews: ", reviews);
                    res.json(reviews);
                }
            })
        }

        else if (req.params.type == "title"){
            let title_query = req.params.query;
            Review.find({ title: { $regex: '.*' + title_query + '.*', $options: "i" } }, function (err, reviews) {
                if (err) {
                    console.log(err);
                    res.json(err);
                }
                else {
                    console.log("found these reviews: ", reviews);
                    res.json(reviews);
                }
            })
        }
    },

    user_reviews: function (req, res) {
        console.log(req.params.user);
        Review.find({ _user: req.params.user }).populate('_location').exec(function (err, data) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                // console.log("line 59 reviews.js: ", data);
                console.log('successfully found the user and their reviews!');
                res.json(data);
            }
        })
    },

    all_reviews: function(req,res) {
        Review.find({}, function(err, reviews){
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log('successfully found all reviews!');
                res.json(reviews);
            }
        })
    },

    top_reviews: function (req, res) {
        Review.find({}).populate('_location').sort({'likes':-1}).limit(5).exec(function (err, reviews) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log('successfully found top reviews!');
                res.json(reviews);
            }
        })
    },

    recent_reviews: function (req, res) {
        Review.find({}).sort({'createdAt': -1}).limit(5).exec(function (err, reviews) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log('successfully found recent reviews!');
                res.json(reviews);
            }
        })
    },

    like_review: function(req,res) {
        console.log(req.params.review);
        Review.findOne({_id: req.params.review}, function (err, review){
            if (err){
                console.log(err);
                res.json(err);
            }
            else {
                review.likes += 1;
                review.save(function (err){
                    if (err){
                        console.log(err);
                        res.json(err);
                    }
                    else{
                        console.log("updated review: ",review);
                        res.json(review);
                    }
                })
            }
        })
    },

    get_review: function (req, res) {
        console.log(req.params.id);
        Review.findOne({_id: req.params.id}).populate('_location').populate('_user').exec( function (err, review) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log('successfully found review!');
                // console.log(review);
                res.json(review);
            }
        })
    },

    remove_review: function(req,res){
        console.log(req.params.id);
        Review.findOne({ _id: req.params.id }).populate('_location').populate('_user').exec(function (err, review) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log('successfully found review! About to find location');
                Location.remove({ _id: review._location._id }, function(err,location){
                    if (err) {
                        console.log(err);
                        res.json(err);
                    }
                    else {
                        console.log('line 243, successfully deleted location');
                        User.update({ _id: review._user._id }, { $pull: { written_reviews: review._id }}, function (err, user_record) {
                            if (err) {
                                console.log(err);
                                res.json(err);
                            }
                            else {
                                console.log("Updated user_record: ", user_record);
                                console.log("review to be deleted: ", review);
                                review.remove();
                                console.log('review deleted');
                                res.json(user_record);
                            }
                        })
                    }
                })
            }
        })
    },

    add_review: function (req, res) {
        // console.log(req.body);
        Location.findOne({ coords: req.body._location.coords }, function (err, resp) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                if(resp){
                    console.log('exists');
                    var review = new Review({
                        title: req.body.title,
                        location_info: req.body._location.city + ", " + req.body._location.state + ", " + req.body._location.country,
                        length: req.body.length,
                        kind: req.body.kind,
                        activity1: req.body.activity1,
                        activity2: req.body.activity2,
                        tips: req.body.tips,
                        _location: resp.toObject(),
                        _user: req.body.user,
                        likes: 0,
                    })
                    review.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.json(err);
                        }
                    })
                    location.reviews.push(review);
                    location.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.json(err);
                        }
                    })
                    // console.log(review);
                    console.log('successfully added review record to location');
                    res.json(review);
                }
                else {
                    console.log("doesn't exist");
                    let location = new Location({
                        city: req.body._location.city,
                        coords: req.body._location.coords,
                        country: req.body._location.country,
                        state: req.body._location.state,
                        likes: 0,
                    })
                    location.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.json(err);
                        }
                    // console.log("saved new location record: ", location);
                    var review = new Review({
                        title: req.body.title,
                        location_info: req.body._location.city + ", " + req.body._location.state + ", " + req.body._location.country,
                        length: req.body.length,
                        kind: req.body.kind,
                        activity1: req.body.activity1,
                        activity2: req.body.activity2,
                        tips: req.body.tips,
                        _location: location.toObject(),
                        _user: req.body.user,
                        likes: 0,
                    })
                    // console.log("Line 166: ", review);
                    review.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.json(err);
                        }
                    location.reviews.push(review.toObject());
                    location.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.json(err);
                        }
                        else {
                            // console.log(review);
                            console.log('successfully added review record to location');
                            res.json(review);
                        }
                    })
    
                    })
                })
                }
            }
        })
    },
    add_to_user: function (req, res) {
        User.findOne({ _id: req.body._user }, function (err, record) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                // console.log('line 191 record: ', record)
                // console.log('successfully found user!');
                // console.log('line 193: ', req.body);
                record.written_reviews.push(req.body);
                record.save( function(err) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                        }
                    else {
                        // console.log('successfully added review to user');
                        // console.log('Line 202: ', record);
                        res.json(record);
                    }
                })
            }
        })
    },




}