# 🚀 Scalable REST API with Authentication & Role-Based Access

## 📌 Project Overview

This project is a full-stack implementation of a **secure, modular, and scalable REST API** with **JWT authentication** and **role-based access control (RBAC)**, along with a **basic frontend UI** to interact with the APIs.

The system supports:

* User registration & login
* Role-based access (Admin vs User)
* CRUD operations on tasks
* Protected routes using JWT
* Frontend dashboard for interaction

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* JWT (Authentication)
* bcrypt (Password hashing)

### Frontend

* React.js
* Axios
* Basic CSS

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* Password hashing using bcrypt
* JWT-based authentication

### 👥 Role-Based Access Control

* **User**

  * Can access only their own data
* **Admin**

  * Can access all users' data
  * Can manage all tasks

### 📦 CRUD Operations (Tasks)

* Create task
* Read tasks
* Update task
* Delete task

### 🧾 API Features

* RESTful API design
* Proper status codes
* Error handling
* Input validation

### 💻 Frontend

* Register/Login UI
* Protected dashboard
* Perform CRUD operations
* Display API responses (success/error)

---

## 📂 Project Structure

Backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── server.js

Frontend/
├── src/
├── components/
├── pages/
└── App.js

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=3000
```

Run backend:

```bash
npm run dev
```

---

### 💻 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🌐 Base URL

```
http://localhost:3000/api
```

---

## 🔑 API Endpoints

### Auth

* POST /api/auth/register → Register user
* POST /api/auth/login → Login & get JWT

### Tasks (Protected)

* GET /api/tasks → Get tasks (User: own, Admin: all)
* POST /api/tasks → Create task
* PUT /api/tasks/:id → Update task
* DELETE /api/tasks/:id → Delete task

---

## 🔐 Authorization

All task routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📬 API Documentation

Import the Postman collection:

* `/Postman/postman_collection.json`

Steps:

1. Run Login API (token auto-saved)
2. Test all task APIs

---

## 🔒 Security Practices

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes using middleware
* Input validation & error handling

---

## 📈 Scalability Considerations

This project is designed with scalability in mind:

* **Modular Architecture**

  * Separation of controllers, routes, and middleware

* **Stateless Authentication**

  * JWT enables horizontal scaling

* **Future Improvements**

  * Microservices architecture
  * Redis caching
  * Load balancing
  * Database indexing

---


## 📌 Future Improvements

* Pagination & filtering
* Logging system
* Rate limiting
* Docker containerization

---

## 👨‍💻 Author

Harsh Singh
