// Check that the userUd specified owns the documents
ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
}