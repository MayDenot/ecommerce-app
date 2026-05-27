import type { JSX } from "react";
import { Navigate } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.ts";

interface Props {
    children: JSX.Element
}

const PrivateRoute = ({children} : Props) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/login"} replace/>
    }

    return children;
}

export default PrivateRoute;