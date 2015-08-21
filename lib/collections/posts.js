Posts = new Mongo.Collection('posts');
Posts.allow({
    update: function(userId, post) {
        var postCheck = postCheckExists(post);

        if(postCheck.postExists){
            return postCheck;
        }
        
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    },
});
Posts.deny({
    update: function(userId, post, fieldNames) {
        // 只能更改如下两个字段：
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    postInsert: function(postAttributes) {

        var postCheck = postCheckExists(postAttributes);

        if(postCheck.postExists){
            return postCheck;
        }
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var postId = Posts.insert(post);
        console.log(postId);
        return {
            _id: postId
        };
    }
});

function postCheckExists(post) {
    check(Meteor.userId(), String);
    check(post, {
        title: String,
        url: String
    });

    var postWithSameLink = Posts.findOne({
        url: post.url
    });
    if (postWithSameLink) {
        return {
            postExists: true,
            _id: postWithSameLink._id
        }
    }

    return post;
}
