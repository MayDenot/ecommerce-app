import {useAuth} from "../hooks/useAuth.ts";
import {Navigate} from "react-router-dom";

interface Props {
    children: React.ReactNode;
    roles?: string[];
}

const ProtectedRoute = ({
                            children,
                            roles = []
                        }: Props) => {
    const { token, user, isLoading } = useAuth();

    if (isLoading) return null;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (
        roles.length > 0 &&
        !roles.includes(user?.role ?? "")
    ) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;