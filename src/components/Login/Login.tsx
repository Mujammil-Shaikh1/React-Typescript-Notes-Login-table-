import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";



export default function Login()
{
    interface Login{
        username:string,
        password:string
    }

    const [login,setlogin]=useState<Login>({
        username:"",
        password:""
    })

    const handlechange=(e:any)=>{
        
        setlogin({...login,[e.target.name]:e.target.value})
    }

    const handlelogin=(e:any)=>{
        e.preventDefault();
        if(login.username ==="" || login.password==="")
        {
            alert("Please enter login credentials")
        }
        else{
            alert("login successfull")
            window.location.reload()
            localStorage.setItem("Userauth",JSON.stringify(login))
        }
    }
    return(
        <Grid container>
            <Grid item xs={4} mx={"auto"} boxShadow={10} padding={2} >
                <Typography variant="h5" textAlign={"center"}>Login Page</Typography>
                <br />
                <form onSubmit={handlelogin}>
                <TextField label="Please enter Username" name="username" value={login.username} onChange={handlechange} variant="outlined" fullWidth/>
                <br />
                <br />
                <TextField label="Please enter Password" name="password" value={login.password} onChange={handlechange} variant="outlined" fullWidth/>
                <br /><br />
                <Button variant="contained" color="error" type="submit">Login</Button>
                </form>
            </Grid>
        </Grid>
    )
}