# Payment Website

A full-stack payment and transaction management web application.

## Project Structure

```text
Payment-Website/
├── Backend/             # Backend server, API routes, and database logic (In Progress)
├── Frontend/            # Frontend client application (Upcoming)
├── .env.example         # Template for environment variables
├── .gitignore           # Files and folders ignored by Git
├── package.json         # Backend dependencies and scripts
├── package-lock.json    # Locked dependency versions
└── README.md            # Project documentation
```

## Tech Stack (Current Setup)

* **Backend Runtime & Framework:** Node.js, Express.js
* **Database:** MySQL (`mysql2`)
* **Authentication & Security:** JSON Web Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`)
* **Environment Management:** `dotenv`

## Getting Started

Follow these steps to set up the project locally after cloning the repository.

### 1. Clone the Repository

```bash
git clone https://github.com
cd Payment-Website
```

### 2. Install Dependencies

Install all required Node.js packages listed in `package.json`:

```bash
npm install
```

### 3. Configure Environment Variables

1. Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your local MySQL credentials and JWT secret:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   JWT_SECRET=your_secret_key
   ```