import backend.auth;
import backend.chat;
import backend.forum;

import ballerina/http;
import ballerina/log;

configurable string openai_api_key = ?;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
        allowCredentials: true,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "OPTIONS"]
    }
}
service / on new http:Listener(8080) {

    function init() returns error? {
        check auth:initializeDataFile();
        check chat:initializeChatData();
        check forum:initializeForumData();
        log:printInfo("Auth, Chat, and Forum services initialized successfully");
    }

    resource function post signup(@http:Payload auth:SignupRequest request) returns auth:Response|error {
        return check auth:registerUser(request);
    }

    resource function post login(@http:Payload auth:LoginRequest request) returns auth:Response|error {
        return check auth:authenticateUser(request);
    }

    resource function get checkUsername(string username) returns auth:Response|error {
        return check auth:checkUsernameAvailability(username);
    }

    resource function get checkEmail(string email) returns auth:Response|error {
        return check auth:checkEmailAvailability(email);
    }

    resource function get users() returns auth:Response|error {
        return check auth:getAllUsers();
    }

    resource function post chat(@http:Payload chat:ChatRequest request) returns chat:ChatResponse|error {
        return check chat:processChatMessage(request, openai_api_key);
    }

    resource function get chat/[string sessionId]() returns chat:ChatResponse|error {
        return check chat:getChatHistory(sessionId);
    }

    resource function get chat/health() returns chat:ChatResponse {
        return chat:chatHealthCheck();
    }

    resource function get forum/posts() returns forum:ForumResponse|error {
        return check forum:getAllPosts();
    }

    resource function get forum/posts/[string postId]() returns forum:ForumResponse|error {
        return check forum:getPostWithReplies(postId);
    }

    resource function post forum/posts(@http:Payload forum:CreatePostRequest request) returns forum:ForumResponse|error {
        return check forum:createPost(request);
    }

    resource function post forum/replies(@http:Payload forum:CreateReplyRequest request) returns forum:ForumResponse|error {
        return check forum:createReply(request);
    }

    resource function get forum/health() returns forum:ForumResponse {
        return forum:forumHealthCheck();
    }

    resource function get health() returns auth:Response {
        return auth:healthCheck();
    }
}
