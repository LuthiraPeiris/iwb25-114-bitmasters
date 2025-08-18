import ballerina/file;
import ballerina/http;
import ballerina/io;
import ballerina/log;
import ballerina/time;
import ballerina/uuid;

public type Message record {
    string id;
    string text;
    string sender;
    string timestamp;
};

public type ChatSession record {
    string sessionId;
    string userId;
    Message[] messages;
    string createdAt;
    string updatedAt;
};

public type ChatRequest record {
    string message;
    string? sessionId = ();
    string? userId = ();
};

public type ChatResponse record {
    boolean success;
    string message;
    anydata? data = ();
};

public type OpenAIRequest record {
    string model;
    OpenAIMessage[] messages;
    decimal temperature;
    int max_tokens;
};

public type OpenAIMessage record {
    string role;
    string content;
};

public type OpenAIResponse record {
    string id;
    string 'object;
    int created;
    string model;
    OpenAIChoice[] choices;
    OpenAIUsage usage;
};

public type OpenAIChoice record {
    int index;
    OpenAIMessage message;
    string finish_reason;
};

public type OpenAIUsage record {
    int prompt_tokens;
    int completion_tokens;
    int total_tokens;
};

const string CHATS_DIR = "./data/chats";

public isolated function initializeChatData() returns error? {
    if !check file:test(CHATS_DIR, file:EXISTS) {
        if !check file:test("./data", file:EXISTS) {
            check file:createDir("./data");
        }
        check file:createDir(CHATS_DIR);
        log:printInfo("Created chat data directory");
    }
}

public isolated function sendMessageToOpenAI(string userMessage, string apiKey, Message[] chatHistory) returns string|error {
    OpenAIMessage[] openAIMessages = [
        {
            role: "system",
            content: "You are a helpful AI assistant. Be friendly, informative, and concise in your responses."
        }
    ];

    int historyLimit = chatHistory.length() > 10 ? chatHistory.length() - 10 : 0;
    foreach int i in historyLimit ..< chatHistory.length() {
        Message msg = chatHistory[i];
        if msg.sender == "user" {
            openAIMessages.push({role: "user", content: msg.text});
        } else if msg.sender == "bot" {
            openAIMessages.push({role: "assistant", content: msg.text});
        }
    }

    openAIMessages.push({role: "user", content: userMessage});

    OpenAIRequest request = {
        model: "gpt-3.5-turbo",
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 500
    };

    http:Client openAIClient = check new ("https://api.openai.com");

    http:Response response = check openAIClient->post("/v1/chat/completions", request, {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
    });

    if response.statusCode == 200 {
        json responseJson = check response.getJsonPayload();
        OpenAIResponse openAIResponse = check responseJson.cloneWithType(OpenAIResponse);

        if openAIResponse.choices.length() > 0 {
            return openAIResponse.choices[0].message.content;
        } else {
            return error("No response from OpenAI");
        }
    } else {
        json errorJson = check response.getJsonPayload();
        log:printError("OpenAI API Error: " + errorJson.toString());
        return error("OpenAI API Error: " + response.statusCode.toString());
    }
}

public isolated function processChatMessage(ChatRequest request, string apiKey) returns ChatResponse|error {
    if request.message.trim().length() == 0 {
        return {
            success: false,
            message: "Message cannot be empty"
        };
    }

    string sessionId = request.sessionId ?: uuid:createType1AsString();
    string userId = request.userId ?: "anonymous";

    ChatSession chatSession = check loadOrCreateChatSession(sessionId, userId);

    Message userMessage = {
        id: uuid:createType1AsString(),
        text: request.message,
        sender: "user",
        timestamp: time:utcToString(time:utcNow())
    };

    chatSession.messages.push(userMessage);

    string aiResponse = check sendMessageToOpenAI(request.message, apiKey, chatSession.messages);

    Message botMessage = {
        id: uuid:createType1AsString(),
        text: aiResponse,
        sender: "bot",
        timestamp: time:utcToString(time:utcNow())
    };

    chatSession.messages.push(botMessage);

    chatSession.updatedAt = time:utcToString(time:utcNow());

    check saveChatSession(chatSession);

    log:printInfo("Chat processed for session: " + sessionId);

    return {
        success: true,
        message: "Message processed successfully",
        data: {
            sessionId: sessionId,
            userMessage: userMessage,
            botMessage: botMessage,
            totalMessages: chatSession.messages.length()
        }
    };
}

public isolated function getChatHistory(string sessionId) returns ChatResponse|error {
    string filePath = CHATS_DIR + "/" + sessionId + ".json";

    if !check file:test(filePath, file:EXISTS) {
        return {
            success: false,
            message: "Chat session not found"
        };
    }

    json sessionJson = check io:fileReadJson(filePath);
    ChatSession chatSession = check sessionJson.cloneWithType(ChatSession);

    return {
        success: true,
        message: "Chat history retrieved successfully",
        data: {
            sessionId: chatSession.sessionId,
            messages: chatSession.messages,
            messageCount: chatSession.messages.length()
        }
    };
}

isolated function loadOrCreateChatSession(string sessionId, string userId) returns ChatSession|error {
    string filePath = CHATS_DIR + "/" + sessionId + ".json";

    if check file:test(filePath, file:EXISTS) {
        json sessionJson = check io:fileReadJson(filePath);
        ChatSession chatSession = check sessionJson.cloneWithType(ChatSession);
        return chatSession;
    } else {
        ChatSession newSession = {
            sessionId: sessionId,
            userId: userId,
            messages: [],
            createdAt: time:utcToString(time:utcNow()),
            updatedAt: time:utcToString(time:utcNow())
        };
        return newSession;
    }
}

isolated function saveChatSession(ChatSession session) returns error? {
    string filePath = CHATS_DIR + "/" + session.sessionId + ".json";
    check io:fileWriteJson(filePath, <json>session);
}

public isolated function chatHealthCheck() returns ChatResponse {
    return {
        success: true,
        message: "Chat service is running",
        data: {
            timestamp: time:utcToString(time:utcNow()),
            version: "1.0.0",
            serviceName: "Chat Service"
        }
    };
}
