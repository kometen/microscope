Errors = {
    // Local (client only) collection
    collection: new Meteor.Collection(null),
    
    throw: function (message) {
        'use strict';
        Errors.collection.insert({message: message, seen: false});
    },
    
    clearSeen: function () {
        'use strict';
        Errors.collection.remove({seen: true});
    }
};