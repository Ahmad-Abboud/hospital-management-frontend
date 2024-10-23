import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import DepartmentPage from "./pages/DepartmentPage";
import DoctorPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";
import PatientDetails from "./pages/PatientDetails";
import InventoryPage from "./pages/InventoryPage";
import Layout from "./components/Layout";
import RoomsPage from "./pages/RoomsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/department" element={<DepartmentPage />} />
          <Route path="/doctors" element={<DoctorPage />} />
          <Route path="/room" element={<RoomsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
        </Route>

        {/* 404 Page for all other routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
