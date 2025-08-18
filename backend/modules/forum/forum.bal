import ballerina/io;
import ballerina/lang.array;
import ballerina/log;
import ballerina/time;
import ballerina/uuid;

const string FORUM_DATA_FILE = "forum_data.json";

public type Post record {
    string id;
    string title;
    string content;
    string authorId;
    string authorUsername;
    string[] tags;
    string createdAt;
    boolean isPinned;
    int replyCount;
};

public type Reply record {
    string id;
    string postId;
    string content;
    string authorId;
    string authorUsername;
    string createdAt;
};

public type PostWithReplies record {
    Post post;
    Reply[] replies;
};

public type ForumData record {
    Post[] posts;
    Reply[] replies;
};

public type CreatePostRequest record {
    string title;
    string content;
    string authorId;
    string authorUsername;
    string[] tags;
};

public type CreateReplyRequest record {
    string postId;
    string content;
    string authorId;
    string authorUsername;
};

public type ForumResponse record {
    boolean success;
    string message;
    Post|Post[]|PostWithReplies? data;
};

ForumData forumData = {posts: [], replies: []};

public function initializeForumData() returns error? {
    string|error content = io:fileReadString(FORUM_DATA_FILE);

    if (content is string && content.trim() != "") {
        forumData = check content.fromJsonStringWithType(ForumData);
        log:printInfo("Forum data loaded successfully");
    } else {
        check saveForumData();
        log:printInfo("Forum data file created");
    }
}

function saveForumData() returns error? {
    string jsonString = forumData.toJsonString();
    check io:fileWriteString(FORUM_DATA_FILE, jsonString);
}

public function getAllPosts() returns ForumResponse|error {
    foreach Post post in forumData.posts {
        int count = 0;
        foreach Reply reply in forumData.replies {
            if (reply.postId == post.id) {
                count += 1;
            }
        }
        post.replyCount = count;
    }

    Post[] sortedPosts = forumData.posts.sort(array:DESCENDING, post => post.createdAt);

    return {
        success: true,
        message: "Posts retrieved successfully",
        data: sortedPosts
    };
}

public function getPostWithReplies(string postId) returns ForumResponse|error {
    Post? foundPost = ();

    foreach Post post in forumData.posts {
        if (post.id == postId) {
            foundPost = post;
            break;
        }
    }

    if (foundPost is ()) {
        return {
            success: false,
            message: "Post not found",
            data: ()
        };
    }

    Reply[] postReplies = [];
    foreach Reply reply in forumData.replies {
        if (reply.postId == postId) {
            postReplies.push(reply);
        }
    }

    postReplies = postReplies.sort(array:ASCENDING, reply => reply.createdAt);

    foundPost.replyCount = postReplies.length();

    PostWithReplies result = {
        post: foundPost,
        replies: postReplies
    };

    return {
        success: true,
        message: "Post with replies retrieved successfully",
        data: result
    };
}

public function createPost(CreatePostRequest request) returns ForumResponse|error {
    if (request.title.trim() == "" || request.content.trim() == "") {
        return {
            success: false,
            message: "Title and content are required",
            data: ()
        };
    }

    Post newPost = {
        id: uuid:createType1AsString(),
        title: request.title.trim(),
        content: request.content.trim(),
        authorId: request.authorId,
        authorUsername: request.authorUsername,
        tags: request.tags,
        createdAt: time:utcToString(time:utcNow()),
        isPinned: false,
        replyCount: 0
    };

    forumData.posts.push(newPost);

    check saveForumData();

    log:printInfo("New post created: " + newPost.id);

    return {
        success: true,
        message: "Post created successfully",
        data: newPost
    };
}

public function createReply(CreateReplyRequest request) returns ForumResponse|error {
    if (request.content.trim() == "") {
        return {
            success: false,
            message: "Reply content is required",
            data: ()
        };
    }

    boolean postExists = false;
    foreach Post post in forumData.posts {
        if (post.id == request.postId) {
            postExists = true;
            break;
        }
    }

    if (!postExists) {
        return {
            success: false,
            message: "Post not found",
            data: ()
        };
    }

    Reply newReply = {
        id: uuid:createType1AsString(),
        postId: request.postId,
        content: request.content.trim(),
        authorId: request.authorId,
        authorUsername: request.authorUsername,
        createdAt: time:utcToString(time:utcNow())
    };

    forumData.replies.push(newReply);

    check saveForumData();

    log:printInfo("New reply created: " + newReply.id);

    return {
        success: true,
        message: "Reply created successfully",
        data: ()
    };
}

public function forumHealthCheck() returns ForumResponse {
    return {
        success: true,
        message: "Forum service is healthy",
        data: ()
    };
}
