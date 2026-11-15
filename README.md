# Secure Internet Banking Web Application

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/PIYUSH1608-ai/Payment-Website.git)

A full-stack Internet Banking portal featuring two-step registration with OTP verification, JWT-based authentication, and ACID-compliant peer-to-peer money transfers.

---

**GitHub Project Link:** [https://github.com/PIYUSH1608-ai/Payment-Website](https://github.com/PIYUSH1608-ai/Payment-Website)

---

## 🚀 Key Features
- **Two-Step Registration:** Name & email verification via OTP, followed by account credential creation.
- **Security:** Passwords hashed with `bcrypt`, authenticated sessions managed via JWT.
- **ACID Database Transactions:** Row-level locking (`FOR UPDATE`) with automated rollbacks on failure to guarantee financial data integrity.
- **Responsive UI:** Modern, card-based interface built with clean CSS and dynamic DOM manipulation.

---

## 🛠️ Technology Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MySQL / PostgreSQL
- **Security:** `bcrypt`, `jsonwebtoken`

---

## 📋 Prerequisites
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)
- Git

---

## ⚙️ Installation & Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/PIYUSH1608-ai/Payment-Website.git
```

### 2. Configure the Database
1. Open MySQL Workbench or your terminal.
2. Import the schema file:
   ```sql
   SOURCE schema.sql;
   ```

### 3. Setup Backend Environment
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Configure your database connection in `.env`:
   ```javascript
   JWT_SECRET=<--super secret jwt key 12345-->
   PORT=<--port for hosting server default:5000-->
   # MySQL Configuration
   DB_HOST=<--SQL server host-->
   DB_PORT=<--SQL port-->
   DB_USER=<--SQL server username-->
   DB_PASSWORD=<--SQL password-->
   DB_NAME=<--database name-->
   # Email Configuration
   EMAIL_ID=<--email from which server will send verification OTP-->
   EMAIL_PASS=<--secret google security key-->
   ```

### 4. Run the Server
```bash
npm run dev
# or
node --watch --env-file=.env ./Backend/server.js
```
The server will start at: `http://localhost:<--port number-->`

### 5. Access the Web Application
Open your browser and navigate to:
```text
http://localhost:<--your preferred port default 5000-->/
```

---

## 🧪 Test Accounts for Demo
| Email | Password | Initial Balance |
| :--- | :--- | :--- |
| `piyushdas@bank.com` | `password123` | $1,000.00 |
| `navanilghosh@bank.com` | `password123` | $500.00 |
| `m_pavankumar@bank.com` | `password123` | $700.00 |
| `ankitgyen@bank.com` | `password123` | $1,000.00 |