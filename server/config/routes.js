var reviews = require('../controllers/reviews.js');
var path = require('path');

module.exports = function (app) {
    app.get('/user/:id', reviews.get_user);

    app.post('/user', reviews.create_user);

    app.put('/user/follow/:id', reviews.follow_user);

    app.put('/user/unfollow/:id', reviews.unfollow_user);

    app.get('/user/check/:username', reviews.check_user);

    app.get('/reviews', reviews.all_reviews); 

    app.post('/reviews', reviews.add_review);

    app.post('/reviews/addtouser', reviews.add_to_user);

    app.get('/reviews/one/:id', reviews.get_review);

    // app.put('/reviews/:id', reviews.edit_review);

    app.delete('/reviews/:id', reviews.remove_review);

    app.get('/reviews/top', reviews.top_reviews); 
    
    app.get('/reviews/recent', reviews.recent_reviews);

    app.get('/reviews/user/:user', reviews.user_reviews);

    app.put('/reviews/like/:review', reviews.like_review);

    // app.put('location/like/:location', reviews.like_location)

    app.get('/search/:type/:query', reviews.search);

    app.all("*", (request, response) => { response.sendFile(path.resolve("./trippin/dist/index.html")) });
}