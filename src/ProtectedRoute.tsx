import {Navigate,Outlet} from "react-router-dom"



export default function ProtectedRoute({component:component,...rest}:any)
{
   var token=localStorage.getItem("Userauth")
    return token? <Outlet/>:<Navigate to="/login"/>
    
}