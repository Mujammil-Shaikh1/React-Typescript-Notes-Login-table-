import { useEffect, useState } from "react"
import axios from "axios"
interface Posts{
userId:number,
id:number,
title:string,
body:string
}

const Pagination:React.FC=()=>{
    const [posts,setposts]=useState<Posts[]>([])
    const [currentPage,setcurrentPage]=useState<number>(1);
    const [totalPages,setTotalPages]=useState<number>(0)
    const [search,setsearch]=useState<string>("")

    const URL="https://jsonplaceholder.typicode.com/posts"

    const getposts=async()=>{
        const result=await axios.get(URL)
       setposts(result.data)
       setTotalPages(Math.ceil(result.data.length/10))
    }
    
    useEffect(()=>{
        getposts()
    },[])

    //currentpages function 

    const handlechange=(newpage:number)=>{
        setcurrentPage(newpage)
    }

    const nextpageclick=()=>{
        if(currentPage<totalPages)
        {
            setcurrentPage(currentPage+1)
        }
    }

    const prevpageclick=()=>{
        if(currentPage > 1)
        {
            setcurrentPage(currentPage-1)
        }
    }

    const prevdisabled=currentPage===1;
    const nextdisabled=currentPage===totalPages;
    const itemsperpage=10;
    const startindex=(currentPage-1)* itemsperpage
    const endindex=startindex+itemsperpage
    const itemstodisplay=posts.slice(startindex,endindex)
    return(
        <div className="container-fluid mb-5">
            <div className="row mb-5">
                <div className="col-12 col-md-10 mx-auto mt-5 mb-5">
                <input type="text" className="form-control" value={search} placeholder="Please enter Some post title..." onChange={(e)=>setsearch(e.target.value)} />

                </div>
    {
       itemstodisplay && itemstodisplay.length>0 || search!==""?
       itemstodisplay.filter((post)=>post.title.toLocaleLowerCase().includes(search)).map((post)=>{
            return(
                <div className="col-12 col-md-3 mt-3 " key={post.id}>
                 <div className="card shadow">
                    <div className="card-body">
                    <span className="badge bg-danger p-2 fs-5">{post.id}</span>
                        <h3 className="card-title" style={{textOverflow:"ellipsis",width:"100%",overflow:"hidden",whiteSpace:"nowrap"}}>{post.title}</h3>
                        <p className="card-description">{post.body}</p>
                    </div>
                 </div>
                </div>
            )
        })
        :null
    }
    <div className="col-12 col-md-7 mx-auto sticky-bottom mt-5">

   
    <div className="btn btn-group w-100 mt-5">

        <button className="btn btn-primary" onClick={prevpageclick} disabled={prevdisabled}>Prev</button>
        {
            Array.from({length:totalPages},(_,i)=>{
                return(
                    <button className="btn btn-primary" key={i} onClick={()=>handlechange(i+1)} disabled={i+1===currentPage}>
                        {i+1}
                    </button>
                )
            })
        }
        <button className="btn btn-primary" onClick={nextpageclick} disabled={nextdisabled}>Next</button>
    </div>
    </div>
            </div>

        </div>
    )
}


export default Pagination