Template.postsList.helpers({
    posts: function () {
        'use strict';
        return Posts.find();
    }
});