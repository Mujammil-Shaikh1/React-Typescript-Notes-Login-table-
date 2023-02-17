import Grid from "@mui/material/Grid";
import {useState,useEffect} from "react"
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from "@mui/material/TextField";


interface Category{

        id: number,
        name: string,
        image: string,
        creationAt:string,
        updatedAt:string
}

interface Products{
    id: string,
    title:string,
    price: number,
    description: string,
    images:string[],
    creationAt: string,
    updatedAt:string,
    category:Category   
}

const columns:GridColDef[]=[
    {
        field:"id",
        headerName:"ID",
        width:100
    },
    {
        field:"title",
        headerName:"Title",
        width:150
    },
    {
        field:"price",
        headerName:"Price",
        width:150
    },{
        field:"description",
        headerName:"Description",
        width:300
    },{
        field:"creationAt",
        headerName:"Created At",
        width:150
    },
    {
        field:"updatedAt",
        headerName:"Updated At",
        width:150
    },
    {
        field:"category",
        headerName:"Category Name",
        width:150
    },
]



export default function ProductTable()
{
    const [products,setproducts]=useState<Products[]>([])
const [search,setSearch]=useState<string>("")


    const getproducts=async()=>{
        const result=await axios.get("https://api.escuelajs.co/api/v1/products")
        setproducts(result.data)
    }
    console.log(products)

    useEffect(()=>{
        getproducts()
    },[])


    const rows=products.filter((product)=>product.title.toLocaleLowerCase().includes(search)).map((item,i)=>{
        return{
            id:i+1,
            title:item.title,
            price:item.price,
            description:item.description,
            creationAt:item.creationAt,
            updatedAt:item.updatedAt,
            category:item.category.name

        }
    })
    const skeleton=[1,2,3,4,5,6,7,8]

console.log(rows)
    return(
        <Grid container >
            <div className="container-fluid">
            <div className="row">
            <div className="col-12 col-md-6 mx-auto mb-4">
                <TextField variant="outlined" className="w-100" label="Please enter product title to search...."  value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
                
            </div>
            </div>
      {
        products.length===0?
        <Grid item xs={12} style={{paddingLeft:"30px",paddingRight:"30px"}}>
      
        {  skeleton.map((item)=>{
                        return(
                            <Grid container key={item}>
                                <Grid item xs={12}>
                                <Skeleton height={70} width={"100%"}/>
        
                                </Grid>
                            </Grid>
                        )
                    })
   
        }
        
        </Grid>:
          <Grid item xs={12}>
         
          <DataGrid style={{height:"530px",width:"100%"}}
                  columns={columns}
                   rows={rows}
                   pageSize={8}
                   rowsPerPageOptions={[10]}
                   checkboxSelection            />
      </Grid>
     
      }
           
      
        </Grid>
    )
}