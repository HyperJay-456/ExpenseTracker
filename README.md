<div align="center">

# 💰 Expense Tracker
### Modern Full-Stack Financial Ledger & Expense Analytics Platform

A production-grade financial management application engineered with the **MERN Stack** (MongoDB, Express.js, React 19, Node.js). Track income, monitor expenditures, visualize category distributions, and export transaction data with zero friction.

<br/>

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646C99?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT_Bearer-black?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Overview

**Expense Tracker** is designed to give users complete control over their personal finances. With an intuitive and responsive dashboard, users can track cash flow in real-time, analyze spending behaviors by category, evaluate their monthly savings rate, and export financial records directly to Microsoft Excel spreadsheets.

The project follows a decoupled client-server architecture:
- **Backend**: Express & Node.js REST API with Mongoose schema modeling, bcrypt password hashing, and stateless JWT authentication.
- **Frontend**: High-performance React 19 single-page application powered by Vite, Tailwind CSS v4, Framer Motion, and Lucide icons.

---

## ✨ Key Features

### 1. 📊 Interactive Dashboard & Financial Telemetry
- **Key Metrics Overview**: Real-time cards displaying **Total Balance**, **Monthly Income**, **Monthly Expenses**, and **Savings Rate %**.
- **Savings Health Indicator**: Dynamic badge assessing your financial health (*Excellent*, *Good*, or *Needs Improvement*).
- **Spending by Category**: Instant aggregation and visualization of expenses (Food, Housing, Transport, Shopping, Healthcare, Entertainment, Utilities, etc.).
- **Recent Transactions Stream**: Chronologically sorted transaction feed with category-specific icon badges and date stamps.

### 2. 💸 Income & Expense Management
- **Full CRUD Capabilities**: Add, inspect, update, and delete individual income and expense entries.
- **Granular Details**: Record amounts, transaction titles/descriptions, customizable categories, and specific timestamps.
- **Flexible Timeframe Filtering**: Filter transaction queries across **Daily**, **Weekly**, **Monthly**, and **Yearly** intervals.

### 3. 📑 One-Click Excel Data Export
- Export comprehensive income and expense ledgers into cleanly formatted **`.xlsx` spreadsheets** on-demand using SheetJS (`xlsx`).
- Ideal for offline auditing, tax prep, and financial record-keeping.

### 4. 🔐 Security & Identity Management
- **Stateless JWT Authentication**: Protected REST endpoints enforced by custom Express middleware (`Bearer <token>`).
- **Encrypted Credentials**: Passwords salted and hashed with `bcryptjs` (cost factor 10).
- **Profile & Security Controls**: In-app password updating and profile metadata synchronization.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Frontend** | React 19 | Declarative, component-driven UI architecture |
| **Build Tool** | Vite 8 | Ultra-fast HMR and optimized production bundling |
| **Styling** | Tailwind CSS v4 | Utility-first, responsive modern styling system |
| **Icons & Motion** | Lucide React & Framer Motion | Crisp vector icons and smooth UI micro-animations |
| **Client Routing** | React Router DOM v7 | Client-side declarative routing and layouts |
| **HTTP Client** | Axios | Promise-based HTTP client for API interaction |
| **Backend** | Node.js & Express 5 | High-throughput asynchronous REST API server |
| **Database** | MongoDB & Mongoose 9 | Document-oriented database with strict schema validation |
| **Authentication** | JSON Web Tokens & bcryptjs | Secure token-based session handling and credential hashing |
| **Spreadsheet Engine** | SheetJS (`xlsx`) | Server-side generation and streaming of `.xlsx` files |

---

## 📁 Project Architecture

```plaintext
Expense_Tracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── dashboardController.js # Analytics & overview calculations
│   │   ├── expenseController.js   # Expense CRUD & Excel export
│   │   ├── incomeController.js    # Income CRUD & Excel export
│   │   └── userController.js      # Auth, profile & password management
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   ├── models/
│   │   ├── expenseModel.js       # Expense Mongoose schema
│   │   ├── incomeModel.js        # Income Mongoose schema
│   │   └── userModel.js          # User Mongoose schema
│   ├── routes/
│   │   ├── dashboardRouter.js    # /api/dashboard routes
│   │   ├── expenseRoute.js       # /api/expense routes
│   │   ├── incomeRoute.js        # /api/income routes
│   │   └── userRoute.js          # /api/user routes
│   ├── utils/
│   │   └── dateFilter.js         # Date range helper (daily/weekly/monthly/yearly)
│   ├── .env.example              # Backend environment template
│   ├── package.json
│   └── server.js                 # Express application entrypoint
│
├── frontend/
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── assets/               # Branding, SVG icons, dummy styles
│   │   ├── components/
│   │   │   ├── Layout.jsx        # Main dashboard shell & transactions list
│   │   │   ├── Navbar.jsx        # Top header & quick actions
│   │   │   └── Sidebar.jsx       # Navigation sidebar with collapsible state
│   │   ├── pages/
│   │   │   └── Dashboard.jsx     # Dashboard view
│   │   ├── App.jsx               # Root application router
│   │   ├── main.jsx              # DOM entrypoint
│   │   └── index.css             # Tailwind base and custom utilities
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore                    # Global repository gitignore
└── README.md                     # Project documentation
```

---

## 🔌 API Reference

All protected endpoints require an `Authorization` header formatted as:  
`Authorization: Bearer <your_jwt_token>`

### 👤 Authentication & User Routes (`/api/user`)
| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `POST` | `/api/user/register` | Public | Register a new user account |
| `POST` | `/api/user/login` | Public | Authenticate credentials and receive JWT |
| `GET` | `/api/user/me` | Protected | Fetch current authenticated user details |
| `PUT` | `/api/user/update-profile`| Protected | Update name and email address |
| `PUT` | `/api/user/update-password`| Protected | Change current password |

### 📈 Dashboard Routes (`/api/dashboard`)
| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `GET` | `/api/dashboard/overview` | Protected | Aggregated monthly income, expenses, savings rate, and category distribution |

### 💵 Income Routes (`/api/income`)
| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `POST` | `/api/income/add` | Protected | Create a new income record |
| `GET` | `/api/income/get` | Protected | Retrieve all income records for user |
| `PUT` | `/api/income/update/:id` | Protected | Update an existing income record |
| `DELETE`| `/api/income/delete/:id` | Protected | Delete an income record |
| `GET` | `/api/income/overview` | Protected | Timeframe-filtered income summary |
| `GET` | `/api/income/download-excel`| Protected | Generate and download income data as `.xlsx` |

### 💳 Expense Routes (`/api/expense`)
| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `POST` | `/api/expense/add` | Protected | Create a new expense record |
| `GET` | `/api/expense/get` | Protected | Retrieve all expense records for user |
| `PUT` | `/api/expense/update/:id` | Protected | Update an existing expense record |
| `DELETE`| `/api/expense/delete/:id` | Protected | Delete an expense record |
| `GET` | `/api/expense/overview` | Protected | Timeframe-filtered expense summary |
| `GET` | `/api/expense/download-excel`| Protected | Generate and download expense data as `.xlsx` |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster URI or a local MongoDB instance

---

### 1. Clone the Repository
```bash
git clone https://github.com/HyperJay-456/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Configure Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory based on `.env.example`:
```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/Expense?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
```

Launch the backend API server:
```bash
npm start
```
> The server will start on `http://localhost:4000` with hot-reloading via nodemon.

---

### 3. Configure Frontend
Open a new terminal tab and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
> The Vite development server will start on `http://localhost:5173`. Open this URL in your browser.

---

## 🔒 Security Best Practices
- Sensitive configuration (database connection string and JWT signing secret) are stored in `.env` and strictly excluded from version control via `.gitignore`.
- Password hashes use a cryptographic work factor with `bcryptjs`.
- Cross-Origin Resource Sharing (`cors`) is configured on all API routes.

---

## 👨‍💻 Author

**Jay Thakur**
- GitHub: [@HyperJay-456](https://github.com/HyperJay-456)
- Email: [jayt0667@gmail.com](mailto:jayt0667@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
