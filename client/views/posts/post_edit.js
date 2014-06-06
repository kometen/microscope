Template.postEdit.events({
    'submit form': function (e) {
        'use strict';
        e.preventDefault();
        
        var currentPostId = this._id;
        
        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        }
        
        Posts.update(currentPostId, {$set: postProperties}, function (error) {
            if (error) {
                // Display the error to the user
                Errors.throw(error.reason);
            } else {
                Router.go('postPage', {_id: currentPostId});
            }
        });
    },
    
    'click .delete': function (e) {
        'use strict';
        e.preventDefault();
        
        if (confirm('Delete this post?')) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});