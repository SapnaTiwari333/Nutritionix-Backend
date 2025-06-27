# **Calorie Counter**

**Calorie Counter** is a **web application** that allows users to register, log in, and manage their calorie intake by analyzing images of food. The application uses:

- **Node.js** and **Express** for the backend  
- **MongoDB** for database storage  
- **Google Gemini** for AI-powered image analysis  
- **JWT** for secure authentication  

---

## **Technology Stack**

| Component         | Technology                |
|------------------|---------------------------|
| Backend          | Node.js, Express          |
| Database         | MongoDB                   |
| Authentication   | JWT (JSON Web Tokens)     |
| Image Analysis   | Google Gemini API         |               |
| Containerization | Docker                    |
| Version Control  | Git and GitHub            |

---

## **Features**

### **1. User Authentication**
- **User registration** with username, email, and password  
- **User login** with email and password  
- **Password reset** functionality via email  
- **Secure authentication** using JWT tokens  

---

### **2. Image Analysis**
- **Upload food images** for calorie estimation  
- **AI-powered analysis** using Google Gemini  
- **Calorie content estimation** from food images  
- **Multipart form data** support for image uploads  

---

### **3. Security & Validation**
- **Password hashing** for secure storage  
- **Input validation** and sanitization  
- **Error handling** with proper HTTP status codes  
- **Token-based authentication** for API endpoints  

---

## **Prerequisites**

- **Node.js** (v14 or higher)  
- **MongoDB** database  
- **Google Cloud account** for Gemini API access  

---

## **Setup Instructions**

### **1. Project Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Calorie_Counter.git
   cd Calorie_Counter
   ```
   ---
2. **Install dependencies:**
   ```bash
   
   npm install
   ```
   ---

