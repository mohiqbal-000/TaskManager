# ✅ Task Manager App

A full-stack task management application built with **Spring Boot** (backend) and **React** (frontend). It features user authentication with **JWT**, task creation, editing, filtering, and prioritization.

---

## 🚀 Features

- 🔐 User authentication (JWT-based login/register)
- 📝 Create, read, update, delete tasks (CRUD)
- 🏷️ Set task priority (High/Medium/Low)
- 🔍 Search and filter tasks
- 📆 Support for recurring tasks (optional)
- 🔒 Protected routes for authenticated users
- 🎨 Clean and responsive UI (React + CSS)

---

## 🛠️ Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | React, React Router |
| Backend     | Spring Boot, REST API |
| Security    | Spring Security, JWT |
| Database    | MySQL / PostgreSQL (or H2 for dev) |
| Tools       | Maven, IntelliJ / VSCode |
| Deployment  | Docker *(optional)* |

---

## 📷 Screenshots


<img width="1388" height="775" alt="logi (2)" src="https://github.com/user-attachments/assets/728d29de-a8e0-4230-b6b2-6564dbd99053" />
<br/>

<img width="1400" height="768" alt="tasklist (2)" src="https://github.com/user-attachments/assets/1b06832a-7252-4c5b-b21f-2b0359f2c5be" />
<br/>

<img width="1379" height="728" alt="addtask (2)" src="https://github.com/user-attachments/assets/a10afebc-4fc8-4c3f-ae63-55bb646a6591" />



---

## 📂 Project Structure
TaskManager/
├── backend/ # Spring Boot application
│ ├── src/
│ └── pom.xml
├── frontend/ # React application
│ ├── src/
│ └── package.json
└── README.md






---

## 🧪 Getting Started

### 📦 Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL (or H2 for development)

### 🔧 Backend Setup

```bash
cd backend
./mvnw spring-boot:run
App will be running at: http://localhost:3000

🔐 API Endpoints
Auth (/api/auth)
POST /login

POST /register

Tasks (/api/tasks)
GET /all

POST /create

PUT /update/{id}

DELETE /delete/{id}

All task routes require JWT token in Authorization header.

🧰 Future Enhancements
⏰ Add due date & reminders

📱 Mobile responsive UI

📨 Email notifications

☁️ Docker + Microservices (AuthService & TaskService split)

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open a pull request or create an issue.

👨‍💻 Author
Mohammed Iqbal
