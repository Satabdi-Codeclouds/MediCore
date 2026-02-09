# MediCore — Premium Hospital Admin Dashboard

MediCore is a feature-rich, high-performance Hospital Administration Dashboard built with **React**, **Tailwind CSS**, and **Framer Motion**. It provides a comprehensive solution for managing patients, doctors, appointments, staff, and feedback, all wrapped in a sleek, mobile-responsive dark theme with premium glassmorphism aesthetics.

![Screenshot Placeholder](https://api.dicebear.com/7.x/identicon/svg?seed=medicore) 

## 🚀 Key Features

### 🔐 Authentication & Security
- **Role-Based Access**: Specialized interfaces for Administrators and Doctors.
- **Protected Routing**: Secure internal views using React Router guards.
- **Persistent Sessions**: Automated state persistence via `AuthContext` and LocalStorage.

### 📊 Real-Time Management
- **Patients Module**: Full CRUD operations with status tracking (`Pending`, `Recovered`, etc.).
- **Doctors Directory**: Manage medical staff profiles, ratings, and specializations.
- **Appointment System**: Live booking, confirmation, and cancellation workflows.
- **Staff Management**: Employee directory with role assignment and status toggles.
- **Moderated Reviews**: Patient feedback system with approval/rejection logic.

### 🎨 Visual Excellence
- **Premium Aesthetics**: Dark mode optimized with HSL tailored neon accents.
- **Interactivity**: Dynamic charts using `ApexCharts` and micro-animations via `Framer Motion`.
- **Glassmorphism**: Advanced `backdrop-filter` effects and elevation-based shadows.
- **Fully Responsive**: Optimized for Desktop, Tablet, and Mobile with a custom slide-out navigation system.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS, Vanilla CSS
- **Routing**: React Router DOM v6
- **Charts**: ApexCharts, React-ApexCharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State**: Context API, LocalStorage (Mock Database)

## ⚙️ Installation & Usage

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/medicore-dashboard.git
   cd medicore-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🔑 Login Credentials

Use the following dummy credentials to explore all features:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@medicore.com` | `admin123` |
| **Doctor** | `doctor@medicore.com` | `doctor123` |

## 📁 Project Structure

```text
src/
├── components/   # Reusable UI components (Sidebar, Header, Modals, etc.)
├── context/      # Auth and Data state management
├── data/         # Initial mock datasets
├── layouts/      # Main application layout wrappers
├── pages/        # Main module views (Dashboard, Patients, etc.)
└── utils/        # Utility functions (cn merging)
```

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
Designed with ❤️ by [Your Name/Team]
