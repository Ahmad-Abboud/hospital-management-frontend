import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage"; // Your login component
import HomePage from "./pages/HomePage"; // Your home component
import NotFoundPage from "./pages/NotFoundPage"; // Your 404 component
import DepartmentPage from "./pages/DepartmentPage";
import DoctorPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";
import PatientDetails from "./pages/PatientDetails";
import InventoryPage from "./pages/InventoryPage";

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
        <Route path="/department" element={<DepartmentPage />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />

        {/* Patient details route */}
        <Route path="/patients/:id" element={<PatientDetails />} />
        {/* 404 Page for all other routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
