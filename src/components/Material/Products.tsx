import { useEffect, useState } from "react"
import axios from "axios"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import { Button, ButtonGroup, CardContent, Typography } from "@mui/material"
interface Rating{
    
    rate:number,
    count:number
}

interface Product{
    id: number,
    title: string,
    price:number,
    description:string,
    category: string,
    image: string,
    rating:Rating
}

export default function Products()
{
    const [product,setproduct]=useState<Product[]>([])
    const getproducts=async()=>{
        let result=await axios.get("https://fakestoreapi.com/products/")
        setproduct(result.data)
    }


  
    const handlefilter=(e:any)=>{
        if(e.target.value==="all")
        {
            setproduct([...product])
        }
        else{

            const data=product.filter((product)=>product.category===e.target.value)
            setproduct(data)
        }
    }
    useEffect(()=>{
        getproducts();
    },[])


    return(
        <>
        <br />
        <ButtonGroup>
            <Button variant="outlined" value={"all"} onClick={handlefilter}>All</Button>
            <Button variant="outlined" value={"men's clothing"} onClick={handlefilter} >Mens Clothing</Button>
            <Button variant="outlined" value={"jewelery"} onClick={handlefilter}>Jwelery</Button>
            <Button variant="outlined" value={"electronics"} onClick={handlefilter}>Electronics</Button>
            <Button variant="outlined" value={"women's clothing"} onClick={handlefilter}>Womens Clothing</Button>
        </ButtonGroup>
<br /><br />
     <Grid container spacing={3}>
        {
            product.map((product)=>{
                return(
                    <Grid item xs={3}  key={product.id}>
                        <Card sx={{maxWidth:"300px"}}>
                        <CardMedia
                        sx={{ height: 200 }}
                        image={product.image}
                        title={product.title}
                         />
                         <CardContent>
                            <Typography variant="h5" component="div" style={{textOverflow:"ellipsis",overflow:"hidden",width:"100%",whiteSpace:"nowrap"}}>{product.title}</Typography>
                            <Typography variant="h6" component="div" style={{textOverflow:"ellipsis",overflow:"hidden",width:"100%",whiteSpace:"nowrap"}}>{product.category}</Typography>
                            <Typography variant="body2" component="div" style={{textOverflow:"ellipsis",overflow:"hidden",width:"100%",whiteSpace:"nowrap"}}>{product.description}</Typography>
                            <br/>                           
                            <Button variant="contained">View Product</Button>
                         </CardContent>
                        </Card>
                    </Grid>
                )
            })
        }
        
     </Grid>
        </>
    )
}