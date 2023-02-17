import NotesList from "./components/NotesList/NotesList"
import Addnotes from "./components/Addnotes/Addnotes"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Pagination } from "@mui/material"
import PaginationSample from "./components/PaginationSample/PaginationSample"
import Table from "./components/Material/Table"
import {Link} from "react-router-dom"
import ProductTable from "./components/Material/ProductsTable"
import Products from "./components/Material/Products"
import ProtectedRoute from "./ProtectedRoute"
import Login from "./components/Login/Login"
import Navbar from "./components/Navbar/Navbar"

export default function App()
{

  return(
    <>
    <Router>    

   <Navbar/>
      <Routes>
     <Route path="/" element={<Addnotes/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/" element={<ProtectedRoute/>}>
        <Route path="/notes" element={<NotesList/>}/>
        <Route path="/pagination" element={<Pagination/>}/>
        <Route path="/paginationsample" element={<PaginationSample/>}/>
        <Route path="/table" element={<Table/>}/>
        <Route path="/products" element={<ProductTable/>}/>
        <Route path="/productfilter" element={<Products/>}/>
        </Route>  
      </Routes>
    </Router>

    </>
  )
}