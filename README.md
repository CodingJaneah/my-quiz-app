# 🎯 Web Development Quiz App

A comprehensive quiz application designed to help users learn and test their knowledge in **HTML**, **CSS**, and **JavaScript**. Built with modern web technologies, this app offers interactive quizzes with multiple difficulty levels and educational lessons.

---

## 📖 About

The Web Development Quiz App is an educational platform that allows users to:
- Take quizzes on HTML, CSS, and JavaScript topics
- Choose from three difficulty levels: Easy, Medium, and Hard
- Learn through dedicated lesson pages for each topic
- Track their quiz performance with instant feedback
- Access an admin dashboard for managing users and quizzes

---

## 🛠️ Technologies Used

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.6 | React framework with App Router |
| **React** | 19.2.0 | UI component library |
| **TypeScript** | ^5 | Type-safe JavaScript |
| **Tailwind CSS** | ^4 | Utility-first CSS framework |
| **Font Awesome** | ^7.1.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js API Routes** | - | Backend API endpoints |
| **MySQL2** | ^3.16.0 | Database connectivity |
| **bcrypt** | ^6.0.0 | Password hashing |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **PostCSS** | CSS processing |

---

## 📁 Project Structure

```
my-quiz-app/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin section
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── login/                # Admin login
│   │   ├── quizzes/              # Quiz management
│   │   └── users/                # User management
│   ├── api/                      # API routes
│   │   ├── admin/                # Admin APIs (login, stats, users)
│   │   ├── auth/                 # Authentication (login, register)
│   │   ├── quiz/                 # Quiz APIs
│   │   └── test-db/              # Database test endpoint
│   ├── login/                    # User login page
│   ├── register/                 # User registration page
│   ├── quiz/                     # Quiz section
│   │   ├── html_quizzes/         # HTML quizzes (easy, medium, hard)
│   │   ├── css_quizzes/          # CSS quizzes (easy, medium, hard)
│   │   └── js_quizzes/           # JavaScript quizzes (easy, medium, hard)
│   └── topics/                   # Learning section
│       ├── html_lessons/         # HTML lessons
│       ├── css_lessons/          # CSS lessons
│       └── js_lessons/           # JavaScript lessons
├── backend/                      # Backend logic
│   ├── controllers/              # Request handlers
│   ├── models/                   # Data models
│   ├── routes/                   # Route definitions
│   ├── services/                 # Business logic
│   └── utils/                    # Utility functions (db connection)
├── frontend/                     # Frontend components
│   ├── components/               # Reusable components (Header, Footer)
│   ├── context/                  # React context (AuthContext)
│   └── styles/                   # Custom styles
└── public/                       # Static assets
```

---

## ✨ Features

### 🎓 For Users
- **User Authentication** - Register and login functionality
- **Interactive Quizzes** - Multiple choice questions with instant feedback
- **Three Topics** - HTML, CSS, and JavaScript quizzes
- **Difficulty Levels** - Easy, Medium, and Hard for each topic
- **Progress Tracking** - See your score and performance after each quiz
- **Learning Resources** - Lesson pages for each topic to study before quizzes

### 👨‍💼 For Admins
- **Admin Dashboard** - Overview of app statistics
- **User Management** - View and manage registered users
- **Quiz Management** - Manage quiz questions and content

### 🎨 UI/UX
- **Responsive Design** - Works on desktop and mobile devices
- **Modern Interface** - Clean and intuitive design with Tailwind CSS
- **Navigation Dots** - Easy question navigation during quizzes
- **Progress Bar** - Visual progress indicator during quizzes
- **Result Feedback** - Celebratory or encouraging messages based on performance

---

## 📄 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page |
| Login | `/login` | User login |
| Register | `/register` | User registration |
| Topics | `/topics` | Learning topics overview |
| HTML Lessons | `/topics/html_lessons` | HTML learning content |
| CSS Lessons | `/topics/css_lessons` | CSS learning content |
| JS Lessons | `/topics/js_lessons` | JavaScript learning content |
| Quiz Selection | `/quiz` | Choose quiz type |
| HTML Quizzes | `/quiz/html_quizzes` | HTML quiz difficulty selection |
| CSS Quizzes | `/quiz/css_quizzes` | CSS quiz difficulty selection |
| JS Quizzes | `/quiz/js_quizzes` | JavaScript quiz difficulty selection |
| Admin Login | `/admin/login` | Admin authentication |
| Admin Dashboard | `/admin/dashboard` | Admin overview |
| Admin Users | `/admin/users` | User management |
| Admin Quizzes | `/admin/quizzes` | Quiz management |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your database credentials:
   ```env
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database_name
   ```

   > ⚠️ **Important:** All environment variables are required. The application will not start without them.

4. **Set up the database**
   Run the SQL scripts to create the necessary tables (users, quizzes, questions)

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

---

## ☁️ Aiven Database Setup

This application uses **Aiven MySQL** as a cloud-hosted database service. Follow these steps to configure your Aiven database:

### Step 1: Create an Aiven Account
1. Go to [Aiven.io](https://aiven.io/) and sign up for an account
2. Verify your email and log in to the Aiven Console

### Step 2: Create a MySQL Service
1. In the Aiven Console, click **Create Service**
2. Select **MySQL** as the service type
3. Choose your preferred cloud provider (AWS, Google Cloud, Azure, etc.)
4. Select a region close to your users for better performance
5. Choose a plan (Free tier available for development)
6. Name your service and click **Create Service**

### Step 3: Get Connection Details
Once your service is running, navigate to the **Overview** tab to find:

| Parameter | Description | Example |
|-----------|-------------|---------|
| **Host** | Service hostname | `mysql-xxxxx-username-xxxx.i.aivencloud.com` |
| **Port** | Connection port | `12165` |
| **User** | Database username | `avnadmin` |
| **Password** | Database password | (shown in console) |
| **Database** | Default database name | `defaultdb` |

### Step 4: Configure Environment Variables
Create a `.env.local` file in your project root with your Aiven credentials:

```env
# Aiven MySQL Configuration
DB_HOST=mysql-xxxxx-username-xxxx.i.aivencloud.com
DB_PORT=12165
DB_USER=avnadmin
DB_PASSWORD=your_aiven_password
DB_DATABASE=defaultdb
```

### Step 5: Create the Database Schema
1. Connect to your Aiven MySQL using a client (MySQL Workbench, DBeaver, or CLI)
2. Run the SQL scripts to create the required tables

### Required Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DB_HOST` | ✅ Yes | Aiven MySQL hostname |
| `DB_PORT` | ✅ Yes | Aiven MySQL port |
| `DB_USER` | ✅ Yes | Database username (default: `avnadmin`) |
| `DB_PASSWORD` | ✅ Yes | Database password from Aiven console |
| `DB_DATABASE` | ✅ Yes | Database name (default: `defaultdb`) |

### Troubleshooting

**Error: Missing required environment variables**
- Ensure all five environment variables are set in `.env.local`
- Restart the development server after adding/changing environment variables

**Error: No database selected**
- Verify `DB_DATABASE` is set correctly (not `DB_NAME`)
- Check that the database exists in your Aiven service

**Error: Connection refused**
- Verify the host and port are correct
- Check if your IP is whitelisted in Aiven (Service Settings > Allowed IP Addresses)
- Ensure the Aiven service is running

**SSL Connection Issues**
- The application is configured to use SSL by default for Aiven connections
- SSL is required for Aiven MySQL connections

---

## 📝 Database Schema

### Users Table
- `id` - Primary key
- `username` - User's username
- `email` - User's email
- `password` - Hashed password
- `created_at` - Registration timestamp

### Quizzes Table
- `id` - Primary key
- `quiz_type` - Topic (html, css, javascript)
- `difficulty` - Level (easy, medium, hard)

### Questions Table
- `id` - Primary key
- `quiz_id` - Foreign key to quizzes
- `question` - Question text
- `option_a` - First option
- `option_b` - Second option
- `option_c` - Third option
- `option_d` - Fourth option
- `correct_answer` - Correct option (A, B, C, or D)

---

## 👩‍💻 Author

Developed as a web development project.
