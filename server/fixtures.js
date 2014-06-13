if (Posts.find().count() === 0) {

    var now = new Date().getTime();

    var tomId = Meteor.users.insert({
        profile: {name: 'Tom Coleman'}
    });
    var tom = Meteor.users.findOne(tomId);
    var sashaId = Meteor.users.insert({
        profile: {name: 'Sacha Greif'}
    });
    var sasha = Meteor.users.findOne(sashaId);

    var telescopeId = Posts.insert({
        title: 'Introducing Telescope',
        userId: sashaId,
        author: sasha.profile.name,
        url: 'http://sachagreif.com/introducing-telescope',
        submitted: now - 7 * 3600 * 1000,
        commentsCount: 2,
        upvoters: [],
        votes: 0
    });

    Comments.insert({
        postId: telescopeId,
        userId: tom._id,
        author: tom.profile.name,
        submitted: now - 5 * 3600 * 1000,
        body: 'Interesting project Sacha, can I get involed?'
    });

    Comments.insert({
        postId: telescopeId,
        userId: sasha._id,
        author: sasha.profile.name,
        submitted: now - 3 * 3600 * 1000,
        body: 'You sure can Tom!'
    });

    Posts.insert({
        title: 'Meteor',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://meteor.com',
        submitted: now - 10 * 3600 * 1000,
        commentsCount: 0,
        upvoters: [],
        votes: 0
    });

    Posts.insert({
        title: 'The Meteor Book',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://themeteorbook.com',
        submitted: now - 12 * 3600 * 1000,
        commentsCount: 0,
        upvoters: [],
        votes: 0
    });

    for (var i = 0; i < 10; i++) {
        Posts.insert({
            title: 'Test post #' + i,
            author: sasha.profile.name,
            userId: sasha._id,
            url: 'https://google.com/?q=test-1' + i,
            submitted: now -i * 3600 * 1000,
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });
    }
}