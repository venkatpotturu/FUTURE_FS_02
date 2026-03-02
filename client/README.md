# 🚀 FUTURE_FS_02 – Client Lead Management System (Mini CRM)

This project is a **Mini CRM (Customer Relationship Management System)** built as part of the **Future Interns Full Stack Web Development – Task 2**.

It simulates how businesses collect, track, and manage potential client leads from website contact forms.

---

## 🎯 Project Objective

To build a simple full-stack system that allows businesses to:

- Store incoming leads
- Track lead status
- Add follow-up notes
- Monitor conversion progress

This mirrors real-world agency and startup workflows.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- HTML / CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

---

## ✨ Features

✔ Lead storage (Name, Email, Source)  
✔ Lead status tracking (New → Contacted → Converted)  
✔ Follow-up notes system  
✔ Admin dashboard to manage leads  
✔ Analytics (Total / Contacted / Converted)

---

## 📊 CRM Workflow

Contact Form → Backend API → MongoDB → Admin Dashboard
FUTURE_FS_02
│
├── client/ # React Admin Dashboard
├── server/ # Node.js Backend
└── README.md


---

## 🔑 Key Functionalities

### 1️⃣ Lead Management
- View all leads
- Update status
- Track progress

### 2️⃣ Follow-Up Notes
- Add notes per lead
- Maintain communication history

### 3️⃣ Analytics Dashboard
Displays:
- Total Leads
- Contacted Leads
- Converted Leads

---

## 📡 API Endpoints

| Method | Endpoint        | Description       |
|--------|-----------------|-------------------|
| POST   | /leads/add      | Add new lead      |
| GET    | /leads          | View all leads    |
| PUT    | /leads/:id      | Update lead       |

---

## ⚙️ Setup Instructions

### Backend
cd server
npm install
node server.js


---

### Frontend
cd client
npm install
npm start


---

## 🌐 Database

MongoDB Atlas is used for cloud-based lead storage.

---

## 🎯 Real-World Use Case

This system can be used by:

- Freelancers
- Agencies
- Startups

to manage potential clients effectively.

---

## 📌 Purpose

This project demonstrates:

- CRUD operations
- Full-stack integration
- Data flow from frontend → backend → database

---

## 🧠 Learning Outcomes

Through this project, I learned:

- API creation with Express
- MongoDB integration
- React dashboard development
- Lead tracking workflows

---

## 🚀 Future Enhancements

- Secure Admin Login
- Search & Filter Leads
- Email Notifications
- Lead Conversion Rate Analytics

---

## 👨‍💻 Author

**Venkat Potturu**

---

## 📂 Project Structure
