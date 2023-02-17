import { useEffect, useState } from "react"
import axios from "axios"

interface Posts{
    postId:number,
    id:number,
    name:string,
    email:string,
    body:string

}

const PaginationSample:React.FC=()=>{

    const [posts,setposts]=useState<Posts[]>([])
    const [currentpage,setcurrentpage]=useState(1)
    const [totalpages,settotalpages]=useState(0)



    const getposts=async()=>{
        const result=await axios.get("https://jsonplaceholder.typicode.com/comments")
        setposts(result.data)
        settotalpages(Math.ceil(result.data.length/50))
    }

    const handlebutton=(page:number)=>{

        setcurrentpage(page)
    }

    const handlenext=()=>{
        if(currentpage<totalpages)
        {
            setcurrentpage(currentpage+1)
        }
    }

    const handleprev=()=>{
        if(currentpage>1)
        {
            setcurrentpage(currentpage-1)
        }
    }

    const prevdisable=currentpage===1
    const nextdisable=currentpage===totalpages
    const itemsperpage=50;
    const startindex=(currentpage-1)*itemsperpage
    const endindex=startindex+itemsperpage
    const itemstodisplay=posts.slice(startindex,endindex)
    console.log(itemstodisplay)
    useEffect(()=>{
        getposts()
    },[])

    return(
        <div className="container-fluid">
            <div className="row">
                {
                    itemstodisplay && itemstodisplay.length>0?itemstodisplay.map((post)=>{
                        return(
                            <div className="col-12 col-md-3 mt-4" key={post.id}>
                                <div className="card shadow">
                                   <div className="card-body">
                    <span className="badge bg-danger p-2 fs-5">{post.id}</span>
                        <h3 className="card-title" style={{textOverflow:"ellipsis",width:"100%",overflow:"hidden",whiteSpace:"nowrap"}}>{post.name}</h3>
                        <p className="card-description"  style={{textOverflow:"ellipsis",width:"100%",height:"100px",overflow:"hidden"}}>{post.body}</p>
                        <span className="badge bg-success p-2 "  >📧 {post.email}</span>
                    </div>
                    </div>
                            </div>
                        )
                    }):null
                }

<div className="btn btn-group col-12 col-md-8 mx-auto sticky-bottom">

<button className="btn btn-primary" onClick={handleprev} disabled={prevdisable}>Prev</button>
                {
                    Array.from({length:totalpages},(_,i)=>{
                        return(
                            <button key={i+1} className="btn btn-primary" onClick={()=>handlebutton(i+1)} disabled={currentpage===i+1}>{i+1}</button>
                        )
                    })
                }
                <button className="btn btn-primary" onClick={handlenext} disabled={nextdisable}>Next</button>
                </div>
            </div>
        </div>
    )
}


export default PaginationSample