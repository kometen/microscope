Posts = new Meteor.Collection('posts');

Posts.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Posts.deny({
    update: function (userId, post, fieldNames) {
        // May only edit following two fields
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    post: function (postAttributes) {
        var user = Meteor.user(), postWithSameLink = Posts.findOne({url: postAttributes.url});
        
        // Ensure user is logged in
        if (!user) {
            throw new Meteor.Error(401, 'You need to login to post new stories');
        }
        
        // Ensure post has a title
        if (!postAttributes.title) {
            throw new Meteor.Error(422, 'Please fill in a headline');
        }
        
        // Check there are no previous posts with same link
        if (postAttributes.url && postWithSameLink) {
            throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);
        }
        
        // Pick out the whilelisted keys
        var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime(),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });
        
        var postId = Posts.insert(post);
        
        return postId;
    },

    upvote: function (postId) {
        var user = Meteor.user();

        // Ensure user is logged in
        if (!user) {
            throw new Meteor.Error(401, 'You need to login to upvote');
        }

        Posts.update({
            _id: postId,
            upvoters: {$ne: user._id}
        }, {
            $addToSet: {upvoters: user._id},
            $inc: {votes: 1}
        });
    }
});