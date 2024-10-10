# **Hospital Management System - Frontend**

### 🏥 **Overview**

This is the frontend application for the **Hospital Management System (HMS)**. Built using **React** and **Vite**, this application manages hospital departments, rooms, staff schedules, patient records, and more. The frontend interacts with a **Laravel** backend via APIs to provide a smooth and efficient user experience.

---

## 🛠️ **Technologies**

- **React**: Frontend library
- **Vite**: Build tool for fast development and bundling
- **React Router**: For handling frontend routing
- **Redux**: State management
- **MUI**: For UI components
- **Axios**: For API requests

---

## 🚀 **Features**

- Manage hospital departments, rooms, and staff schedules
- Patient records and medical history management
- Role-based access control
- Interactive UI with **MUI**
- Fast, modern development with **Vite**
- **Redux** for centralized state management

---

## 🛠️ **Installation and Setup**

To get started with the project, follow these steps:

### **1. Clone the repository**

```bash
git clone git@github.com:Ahmad-Abboud/hospital-management-frontend.git
cd hospital-management-frontend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Setup environment variables**

Create a `.env` file in the root directory of the project and configure the environment variables.

Example `.env` file:

```
VITE_API_BASE_URL=https://api.hospital-management-system.com
```

### **4. Start the development server**

```bash
npm run dev
```

This will start the Vite development server. You can access the app at `http://localhost:3000`.

---

## 🌐 **Usage**

### **Available Scripts**

- `npm run dev` – Start the development server
- `npm run build` – Build the app for production
- `npm run preview` – Preview the production build locally

### **API Interaction**

The app interacts with the backend through a series of API calls. Axios is used to handle these requests, and the base URL for the API is configured via the `.env` file.

Make sure the backend server (Laravel API) is up and running before using the app.

---

## 🎨 **UI Components**

This project uses **MUI** (Material-UI) for building UI components. Components like buttons, tables, forms, and modals are built using MUI to ensure a consistent and responsive design.

---

## 🗂️ **Redux State Management**

**Redux** is used to manage global state across the app. This includes data related to patients, staff schedules, departments, rooms, and more. Redux slices are located in the `src/redux/` directory.

---

## 📚 **Documentation**

For more details on each feature and API interaction, refer to the **Wiki** or the **API Documentation** for the backend.

---

## 🤝 **Contributing**

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

---

## 🧑‍💻 **Maintainers**

- **Ahmad Abboud** - Frontend Developer
