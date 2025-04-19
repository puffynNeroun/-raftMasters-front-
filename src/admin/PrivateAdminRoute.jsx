// src/admin/PrivateAdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../services/adminService';

const PrivateAdminRoute = ({ children }) => {
    return isAdmin() ? children : <Navigate to="/admin/login" />;
};

export default PrivateAdminRoute;
