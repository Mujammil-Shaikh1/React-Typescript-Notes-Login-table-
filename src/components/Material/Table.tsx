import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Notes} from "../Addnotes/NotesModel"
import {useState,useEffect} from "react"
import axios from 'axios';
import TextField from '@mui/material/TextField';


export default function Table()
{

    
    const [notes,setnotes]=useState<Notes[]>([])
    const [search,setsearch]=useState("")

    const getnotes=async()=>{
        const result =await axios.get("http://localhost:3000/notes")
        setnotes(result.data)
    }

    console.log(search)


    useEffect(()=>{
        getnotes()
    },[])

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'description', headerName: 'Description', width: 950 },

  ];

  const result=notes.filter((item)=>item.note_title.toLowerCase().includes(search)).map((item,i)=>{

    return({
        id:i+1,
        title:item.note_title,
        description:item.note_description
    })
  })

  
  const rows =result

    return(
        <div className='container-fluid'>
        <div className='mb-3 mx-auto'> 
            <TextField id="outlined-basic" value={search} onChange={(e)=>setsearch(e.target.value)} label="Please enter data to search" variant="outlined" style={{width:"30%",margin:"auto"}} />
            </div>
        <div style={{ height: 530, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
    </div>
    )
}