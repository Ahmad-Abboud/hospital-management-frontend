// src/AppRoutes.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage"; // Your login component
import HomePage from "./pages/HomePage"; // Your home component
import NotFoundPage from "./pages/NotFoundPage"; // Your 404 component

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Default route that directs to LoginPage */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Home page route (after successful login) */}
        <Route path="/home" element={<HomePage />} />

        {/* 404 Page for all other routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
