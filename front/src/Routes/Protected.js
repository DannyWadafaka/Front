import React, {Outlet, Navigate} from "react-router-dom"
import { useAuth } from "../Auth/AuthProvider.tsx"

export default function Protected(){
    const auth = useAuth()
    return(
       auth.isAuthenticated ? <Outlet/> : <Navigate to="/"/>
    )
}
