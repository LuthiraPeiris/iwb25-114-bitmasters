# iwb25-114-bitmasters

# DeviceCare

DeviceCare is a simple and efficient tech-support application designed for students, technicians, and anyone who uses laptops, phones, or tablets. The app provides AI-powered troubleshooting and a community forum for sharing solutions, making device support fast, easy, and reliable.

---

# Running the Application
## 1. Prerequisites
      ### Get an OpenAI API Key
      1. Sign in at https://platform.openai.com/
      
      2. Create an API key.
      
      3. Keep it safe — you’ll add it to the backend config.

      4. Create or edit `backend/Config.toml` and add your key.


## 2. Start the Backend (Ballerina Server)

      cd backend

      ballerina run <your_ballerina_file>.bal

## 3. Start the Frontend (ReactJS App)

      cd frontend

      npm install   

      npm start  

---

## Features
- **AI Chatbot:** Provides instant guidance using the OpenAI API.
- **Community Forum:** Allows users to post problems and receive verified solutions.
- **Knowledge Base:** Stores solved issues for future reference.
- **Lightweight & Simple:** No complex databases; uses JSON files for storage.
- **Local Deployment:** Runs directly on the Ballerina server without extra services.

---

**Flowchart:**

```mermaid
---
config:
      theme: redux
---

flowchart TD
    A["User (Students / Technicians)"]

    A --> B["Frontend (ReactJS)"]
    B --> C["Backend (Ballerina Server)"]

    C --> D["Chatbot Integration (OpenAI API)"]
    C --> E["Data Storage (JSON Files)"]

    C --> F["Community Forum"]

    C --> G["Local Deployment (Ballerina Server)"]

