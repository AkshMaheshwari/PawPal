# 🐾 PawPal - Pet Adoption Platform

A full-stack web application that connects animal shelters with potential pet adopters, making pet adoption simple, safe, and successful.

![PawPal Banner](https://img.shields.io/badge/PawPal-Pet%20Adoption-yellow?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTguMzUgMyBDNi45MyAzIDUuNzYgNC4wOSA1LjUzIDUuNSBMNC41IDE0IEw2IDE0IEw3LjA1IDUuNSBDNy4xNCA1LjA4IDcuNSA0Ljc1IDcuOTUgNC43NSBDOC40IDQuNzUgOC43NiA1LjA4IDguODUgNS41IEw5LjkgMTQgTDExLjQgMTQgTDEwLjM3IDUuNSBDMTAuMTQgNC4wOSA4Ljk3IDMgNy41NSAzIEg3LjU1IEM3LjQ4IDMgNy40MSAzIDcuMzUgMyBINy4zNSBDNy4yOSAzIDcuMjIgMyA3LjE1IDMgSDguMzUgTTEyIDE0IEwxMy41IDE0IEwxNC41NSA1LjUgQzE0LjY0IDUuMDggMTUgNC43NSAxNS40NSA0Ljc1IEMxNS45IDQuNzUgMTYuMjYgNS4wOCAxNi4zNSA1LjUgTDE3LjQgMTQgTDE4LjkgMTQgTDE3Ljg3IDUuNSBDMTcuNjQgNC4wOSAxNi40NyAzIDE1LjA1IDMgQzEzLjYzIDMgMTIuNDYgNC4wOSAxMi4yMyA1LjUgTDEyIDE0IE0xMiAyMCBMMTggMjAgQzE5LjEgMjAgMjAgMTkuMSAyMCAxOCBWMTQgTDE4IDE0IFYxOCBMMTIgMTggTDYgMTggTDYgMTQgTDQgMTQgVjE4IEM0IDE5LjEgNC45IDIwIDYgMjAgTDEyIDIwIFoiLz48L3N2Zz4=)

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About

PawPal is a comprehensive pet adoption platform designed to bridge the gap between animal shelters and people looking to adopt pets. The platform provides a secure, user-friendly interface for browsing available pets, submitting adoption requests, and managing shelter operations.

### Mission
Making pet adoption simple, safe, and successful for everyone involved while ensuring every pet finds their forever home.

## ✨ Features

### For Users
- 🔍 **Advanced Search & Filters** - Find pets by type, location, age, and health status
- 📋 **Detailed Pet Profiles** - View comprehensive information including photos, age, temperament, and health records
- 📝 **Easy Adoption Requests** - Submit adoption applications directly through the platform
- 🔐 **Secure Authentication** - Protected user accounts with JWT authentication
- 💖 **Interactive UI** - Beautiful, responsive design with smooth animations

### For Shelter Admins
- 🏠 **Shelter Dashboard** - Comprehensive admin panel for managing pets and requests
- ➕ **Pet Management** - Add, edit, and remove pet listings with detailed information
- 📊 **Analytics & Insights** - View statistics on adoptions, pet types, and health metrics
- ✅ **Request Management** - Review and approve/reject adoption applications
- 📈 **Visual Reports** - Charts and graphs for better decision-making

### General Features
- 💳 **Donation Integration** - Razorpay payment gateway for donations
- 📧 **Contact System** - Users can reach out to shelters directly
- 🌐 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and Framer Motion animations
- 🔒 **Protected Routes** - Role-based access control for users and admins

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18+) - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Toastify** - Notification system
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **Joi** - Input validation
- **CORS** - Cross-origin resource sharing

### Payment Integration
- **Razorpay** - Payment gateway for donations

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cluster)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pawpal.git
   cd pawpal
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `Backend` directory:

```env
# Server Configuration
PORT=3000

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Shelter Admin Credentials
SHELTER_EMAIL=admin@pawpal.com
SHELTER_PASSWORD=your_admin_password

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### Frontend (.env)
Create a `.env` file in the `Frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### Running the Application

#### Development Mode

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Application will open at `http://localhost:5173`

#### Production Build

1. **Build Frontend**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Start Backend in Production**
   ```bash
   cd Backend
   NODE_ENV=production npm start
   ```

## 📁 Project Structure

```
pawpal/
├── Backend/
│   ├── Controllers/
│   │   ├── AdoptionRequestController.js
│   │   └── AuthController.js
│   ├── Middlewares/
│   │   ├── Auth.js
│   │   ├── AuthValidation.js
│   │   └── ValidateAdoptionRequest.js
│   ├── Models/
│   │   ├── AdoptionRequests.js
│   │   ├── Contact.js
│   │   ├── Donations.js
│   │   ├── Pet.js
│   │   ├── User.js
│   │   └── db.js
│   ├── Routes/
│   │   ├── AdoptionRequestRouter.js
│   │   ├── AuthRouter.js
│   │   ├── ContactRouter.js
│   │   ├── DonateRouter.js
│   │   └── PetRouter.js
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Adoption.jsx
│   │   │   ├── PetForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TeamCard.jsx
│   │   │   └── ValueCard.jsx
│   │   ├── Pages/
│   │   │   ├── About.jsx
│   │   │   ├── AdoptionRequest.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Donate.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ShelterDashboard.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Welcome.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 📡 API Documentation

### Authentication Endpoints

#### POST /Auth/signup
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /Auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Pet Endpoints

#### GET /api/pets
Get all pets

#### GET /api/pets/:id
Get pet by ID

#### POST /api/pets/add
Add new pet (Protected - Admin only)
```json
{
  "name": "Buddy",
  "type": "Dog",
  "ageMonths": 24,
  "location": "Mumbai",
  "img": "https://example.com/image.jpg",
  "isVaccinated": true,
  "isHealthy": true,
  "isPlayful": true,
  "tags": ["friendly", "trained"]
}
```

#### PUT /api/pets/:id
Update pet (Protected - Admin only)

#### DELETE /api/pets/:id
Delete pet (Protected - Admin only)

### Adoption Request Endpoints

#### POST /api/requests
Submit adoption request (Protected)
```json
{
  "pet": "pet_id",
  "adopterDetails": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "experienceWithPets": "I've had dogs for 10 years",
    "reasonForAdoption": "Looking for a companion"
  }
}
```

#### GET /api/requests
Get all requests (Protected - Admin only)

#### GET /api/requests/:id
Get request by ID (Protected)

#### PUT /api/requests/:id/status
Update request status (Protected - Admin only)
```json
{
  "status": "approved"
}
```

### Contact Endpoint

#### POST /contact
Send contact message
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I have a question..."
}
```

### Donation Endpoints

#### POST /api/donate/create-order
Create donation order
```json
{
  "amount": 500,
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### POST /api/donate/verify-payment
Verify payment
```json
{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature"
}
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License.

## 👥 Contact

**Project Maintainer:** PawPal Team

- Website: [pawpal](https://pawpal-psi.vercel.app)
- Email: support@pawpal.org
- GitHub: [@pawpal](https://github.com/akshmaheshwari/pawpal)

## 🙏 Acknowledgments

- All the shelters and volunteers who inspired this project
- The pet adoption community for their feedback
- Open-source contributors who made this possible



---

<div align="center">
  <strong>Made with ❤️ for animals in need</strong>
  <br>
  <sub>© 2025 PawPal. All rights reserved.</sub>
</div>
