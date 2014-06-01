Posts = new Meteor.Collection('posts');

Posts.allow({
    insert: function (userId, doc) {
        // quickfix, only allow posting if logged in
        return !! userId;
    }
});