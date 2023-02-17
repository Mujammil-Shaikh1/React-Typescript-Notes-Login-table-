import {Link} from "react-router-dom"


export default function Navbar()
{
  const islogin=localStorage.getItem("Userauth")

  const handlelogout=()=>{
    localStorage.removeItem("Userauth")
    alert("Logged out successfully")
    window.location.reload()
  }
    return(
        <div className="Navbar">
            <ul>
           {
            !islogin?
            <>
             <Link to="/">  <li >Home</li></Link>
<Link to="/login"><li >Login</li></Link>
</>:
<>
<Link to="/">  <li >Home</li></Link>
 <Link to="/notes"><li >Noteslist</li></Link>
 <Link to="/pagination"><li >Pagination</li></Link>
 <Link to="/paginationsample"><li >paginationsample</li></Link>
 <Link to="/table"><li >Table</li></Link>
 <Link to="/products"><li >Product Table</li></Link>
 <Link to="/productfilter"><li >Products Filter</li></Link>
 <li onClick={handlelogout}>Logout</li>
 </>
    }
 </ul>

        </div>
    )
}