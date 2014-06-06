Template.postItem.helpers({
    ownPost: function () {
        'use strict';
        return this.userId === Meteor.userId();
    },
    domain: function () {
        'use strict';
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }
});