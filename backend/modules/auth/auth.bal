import ballerina/file;
import ballerina/io;
import ballerina/log;
import ballerina/regex;
import ballerina/time;
import ballerina/uuid;

public type User record {
    string id;
    string username;
    string email;
    string password;
    string role = "user";
    string createdAt;
};

public type UserData record {
    User[] users;
};

public type SignupRequest record {
    string username;
    string email;
    string password;
    string confirmPassword;
};

public type LoginRequest record {
    string email;
    string password;
};

public type Response record {
    boolean success;
    string message;
    anydata? data = ();
};

const string USERS_FILE_PATH = "./data/users.json";
const string EMAIL_REGEX = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";

public isolated function initializeDataFile() returns error? {
    if !check file:test(USERS_FILE_PATH, file:EXISTS) {
        if !check file:test("./data", file:EXISTS) {
            check file:createDir("./data");
        }

        UserData initialData = {
            users: [
                {
                    id: uuid:createType1AsString(),
                    username: "admin",
                    email: "admin@example.com",
                    password: "admin123",
                    role: "admin",
                    createdAt: time:utcToString(time:utcNow())
                },
                {
                    id: uuid:createType1AsString(),
                    username: "testuser",
                    email: "test@example.com",
                    password: "test123",
                    role: "user",
                    createdAt: time:utcToString(time:utcNow())
                }
            ]
        };

        check io:fileWriteJson(USERS_FILE_PATH, <json>initialData);
        log:printInfo("Created users.json with initial data");
        log:printInfo("Pre-populated credentials:");
        log:printInfo("  Admin: admin@example.com / admin123");
        log:printInfo("  Test User: test@example.com / test123");
    }
}

public isolated function registerUser(SignupRequest request) returns Response|error {
    Response? validationError = validateSignupRequest(request);
    if validationError is Response {
        return validationError;
    }

    UserData userData = check readUsersFromFile();

    foreach User user in userData.users {
        if user.username.toLowerAscii() == request.username.toLowerAscii() {
            return {
                success: false,
                message: "Username already taken"
            };
        }
        if user.email.toLowerAscii() == request.email.toLowerAscii() {
            return {
                success: false,
                message: "Email already registered"
            };
        }
    }

    User newUser = {
        id: uuid:createType1AsString(),
        username: request.username,
        email: request.email.toLowerAscii(),
        password: request.password,
        role: "user",
        createdAt: time:utcToString(time:utcNow())
    };

    userData.users.push(newUser);

    check saveUsersToFile(userData);

    log:printInfo("New user registered: " + request.username + " (" + request.email + ")");

    return {
        success: true,
        message: "Account created successfully",
        data: sanitizeUser(newUser)
    };
}

public isolated function authenticateUser(LoginRequest request) returns Response|error {
    if request.email.trim().length() == 0 {
        return {
            success: false,
            message: "Email is required"
        };
    }

    if request.password.length() == 0 {
        return {
            success: false,
            message: "Password is required"
        };
    }

    UserData userData = check readUsersFromFile();

    string loginIdentifier = request.email.toLowerAscii();

    foreach User user in userData.users {
        boolean emailMatch = user.email.toLowerAscii() == loginIdentifier;
        boolean usernameMatch = user.username.toLowerAscii() == loginIdentifier;

        if (emailMatch || usernameMatch) {
            if user.password == request.password {
                log:printInfo("User logged in: " + user.username);
                return {
                    success: true,
                    message: "Login successful",
                    data: sanitizeUser(user)
                };
            } else {
                log:printInfo("Password mismatch for user: " + user.username);
                log:printInfo("Stored password: " + user.password);
                log:printInfo("Provided password: " + request.password);
                return {
                    success: false,
                    message: "Invalid password"
                };
            }
        }
    }

    return {
        success: false,
        message: "User not found"
    };
}

public isolated function checkUsernameAvailability(string username) returns Response|error {
    if username.trim().length() == 0 {
        return {
            success: false,
            message: "Username cannot be empty"
        };
    }

    UserData userData = check readUsersFromFile();

    foreach User user in userData.users {
        if user.username.toLowerAscii() == username.toLowerAscii() {
            return {
                success: false,
                message: "Username already taken"
            };
        }
    }

    return {
        success: true,
        message: "Username available"
    };
}

public isolated function checkEmailAvailability(string email) returns Response|error {
    if !isValidEmail(email) {
        return {
            success: false,
            message: "Invalid email format"
        };
    }

    UserData userData = check readUsersFromFile();

    foreach User user in userData.users {
        if user.email.toLowerAscii() == email.toLowerAscii() {
            return {
                success: false,
                message: "Email already registered"
            };
        }
    }

    return {
        success: true,
        message: "Email available"
    };
}

public isolated function getAllUsers() returns Response|error {
    UserData userData = check readUsersFromFile();

    json[] allUsers = [];
    foreach User user in userData.users {
        allUsers.push({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
            createdAt: user.createdAt
        });
    }

    return {
        success: true,
        message: "Users retrieved successfully",
        data: allUsers
    };
}

public isolated function healthCheck() returns Response {
    return {
        success: true,
        message: "Service is running",
        data: {
            timestamp: time:utcToString(time:utcNow()),
            version: "1.0.0",
            "service": "Auth Service"
        }
    };
}

isolated function validateSignupRequest(SignupRequest request) returns Response? {
    if request.username.trim().length() == 0 {
        return {
            success: false,
            message: "Username is required"
        };
    }

    if request.username.length() < 3 {
        return {
            success: false,
            message: "Username must be at least 3 characters"
        };
    }

    if request.email.trim().length() == 0 {
        return {
            success: false,
            message: "Email is required"
        };
    }

    if !isValidEmail(request.email) {
        return {
            success: false,
            message: "Invalid email format"
        };
    }

    if request.password.length() < 6 {
        return {
            success: false,
            message: "Password must be at least 6 characters"
        };
    }

    if request.password != request.confirmPassword {
        return {
            success: false,
            message: "Passwords do not match"
        };
    }

    return ();
}

isolated function isValidEmail(string email) returns boolean {
    return regex:matches(email, EMAIL_REGEX);
}

isolated function readUsersFromFile() returns UserData|error {
    json jsonData = check io:fileReadJson(USERS_FILE_PATH);
    UserData userData = check jsonData.cloneWithType(UserData);
    return userData;
}

isolated function saveUsersToFile(UserData userData) returns error? {
    check io:fileWriteJson(USERS_FILE_PATH, <json>userData);
}

isolated function sanitizeUser(User user) returns json {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };
}
