import axios from "axios";
import {  useState } from "react";
import { Notes } from "./NotesModel";

const Addnotes: React.FC = () => {
  const [notes, setnotes] = useState<Notes>({
    id:"",
    note_title: "",
    note_description: "",
    note_date: "",
    note_color:"#d1fff0"
  });


  const [error,seterror]=useState("")


  const handlechange = async(e: any) => {
    e.preventDefault()

    setnotes({...notes,[e.target.name]:e.target.value,note_date:Date()})
  
  };



  const handlesubmit = async(e: any) => {
    e.preventDefault();
    if(notes.note_title==="" || notes.note_description==="")
    {
      seterror("All Fields Are Mandatory")

    }
    else{

     await axios.post("http://localhost:3000/notes",notes)
      seterror("")
    }
    setTimeout(() => {
      seterror("")
    }, 3000);
  };


  
  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-12 col-md-6 mx-auto border border-1 p-4 rounded-3">
              <h3 className="text-center mt-3">Please Add Some Notes</h3>
              <br />
                {error!==""?
               <div className="alert alert-danger alert-dismissible fade show" role="alert">
               {error}
             </div>
                
                :null}
              <label>Enter Note Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Please enter notes title"
                name="note_title"
                defaultValue={notes.note_title}
                onChange={handlechange}
              />
              <br />
              <label>Enter Note Description</label>
              <textarea
                name="note_description"
                className="form-control"
                defaultValue={notes.note_description}
                onChange={handlechange}
                rows={3}
                placeholder="Please enter notes description"
              ></textarea>
              <label>Please pick up the note color</label>
              <br />
              <input type="color" name="note_color"  value={notes.note_color} onChange={handlechange} />
              <br />
              <br />
              <button className="btn btn-primary" type="submit">📝 Add Note</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default Addnotes;
