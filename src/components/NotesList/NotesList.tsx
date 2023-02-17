import {  useEffect, useState } from "react"
import axios from "axios"
import {Notes} from "../Addnotes/NotesModel"

export default function NotesList()
{

    const [notes,setnotes]=useState<Notes[]>([])
    const [id,setid]=useState<string>("")

    // const getnotes=async()=>{
    //     const result=await axios.get("http://localhost:3000/notes")
    //     setnotes(result.data)
    // }

    const getnotes=async()=>{
        const result= await axios.get("http://localhost:3000/notes")
        setnotes(result.data)
    }

    const handledelete=async(id:string)=>{
        setid(id)
    await axios.delete("http://localhost:3000/notes/"+id)
    }

    useEffect(()=>{
      
            getnotes()

   
    },[id])

    return(
        <>
        <div className="container-fluid p-5">
            <h1>Notes</h1>
            <div className="row">
                {
notes.map((item,i)=>{
    return(
        <div className="col-12 col-md-4 p-3" key={i}>
            <div className="card" style={{backgroundColor:item.note_color}}>
                
  <div className="card-body p-3">
    <h5 className="card-title">{item.note_title}</h5>
    <p className="card-text">{item.note_description}</p>
    <p className="card-text">Date: {item.note_date.slice(4,16)}</p>
    <p className="card-text">Time: {item.note_date.slice(16,25)}</p>
    <button className="btn btn-danger" onClick={()=>handledelete(item.id)}>🗑️</button>
  </div>
</div>
            </div>  
    )
})
                }
          
            </div>
        </div>
        </>
    )
}