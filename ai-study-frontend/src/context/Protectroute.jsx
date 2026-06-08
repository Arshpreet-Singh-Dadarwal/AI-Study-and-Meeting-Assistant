import { useAuth } from "./authcontext";
import { Navigate } from "react-router-dom";

export default function Protectroute({ children }) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
}