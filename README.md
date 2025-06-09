# 🚀 Leave Management System

A comprehensive full-stack Leave Management System built with FastAPI backend and dual Next.js frontends for students and administrators.

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Project Structure](#-project-structure)
3. [Prerequisites](#-prerequisites)
4. [Installation & Setup](#-installation--setup)
5. [Running the Applications](#-running-the-applications)
6. [Additional Notes](#-additional-notes)
7. [License](#-license)

---

## 🎯 Project Overview

This repository contains a complete Leave Management System with:

- **Backend**: FastAPI server with RESTful APIs
- **Student Frontend**: Next.js application for student leave requests
- **Admin Frontend**: Next.js application for administrative management

---

## 🧱 Project Structure

```
📁 FastAPI-Server/          # Backend API built with FastAPI 🐍
📁 Student-Application/     # Next.js frontend for students 👨‍🎓
📁 Admin-Application/       # Next.js frontend for administrators 🧑‍💼
```

---

## ✅ Prerequisites

Before setting up the project, ensure you have the following installed:

- 🟢 **Node.js** (LTS version recommended)
- 📦 **Package Manager** (npm / yarn / pnpm / bun)
- 🐍 **Python 3.8+**
- 🔧 **pip** (Python package installer)
- 🛢️ **MySQL** (running locally)

---

## 🛠️ Installation & Setup

### 1. Backend Setup – FastAPI Server

Navigate to the backend directory and install Python dependencies:

```bash
cd FastAPI-Server
pip install -r requirements.txt
```

💡 **Tip**: If `requirements.txt` doesn't exist yet, generate it after installing your packages:

```bash
pip freeze > requirements.txt
```

### 2. Frontend Setup

#### 👨‍🎓 Student Application

```bash
cd Student-Application
npm install
# Alternative package managers:
# yarn install
# pnpm install
# bun install
```

#### 🧑‍💼 Admin Application

```bash
cd Admin-Application
npm install
# Alternative package managers:
# yarn install
# pnpm install
# bun install
```

---

## ▶️ Running the Applications

### 1. 🐍 Start the Backend Server

```bash
cd FastAPI-Server
uvicorn main:app --reload
```

📍 **Backend URL**: http://127.0.0.1:8000

### 2. 👨‍🎓 Start the Student Frontend

```bash
cd Student-Application
npm run dev
```

📍 **Student Portal URL**: http://localhost:3000

### 3. 🧑‍💼 Start the Admin Frontend

```bash
cd Admin-Application
npm run dev
```

📍 **Admin Portal URL**: http://localhost:3001 (usually)

---

## 📝 Additional Notes

### 🔐 Security Considerations

- Configure your database credentials securely
- **Never hardcode sensitive information** in your source code
- Add `config.py` or `.env` files to `.gitignore` to keep secrets safe

### 🛢️ Database Setup

- Ensure your **MySQL database is running** before launching the backend
- Configure database connection settings properly

### 📖 API Documentation

- FastAPI automatically generates interactive API documentation
- 🌐 **API Docs**: http://127.0.0.1:8000/docs
- 📊 **Alternative Docs**: http://127.0.0.1:8000/redoc

---

## 📄 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

```
MIT License

Copyright (c) 2025 SHASHIKIRAN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you encounter any issues or have questions, please open an issue in the repository.

---
