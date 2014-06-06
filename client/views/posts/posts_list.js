Template.postsList.helpers({
    posts: function () {
        'use strict';
        return Posts.find({}, {sort: {submitted: -1}});
    }
});