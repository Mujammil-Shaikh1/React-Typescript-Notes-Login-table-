import { useEffect, useState } from "react"
import axios from "axios"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import { Button,InputLabel,Select,MenuItem ,ButtonGroup, CardContent, FormControl, Typography, Skeleton } from "@mui/material"
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
    const [filterproduct,setfilterproduct]=useState<Product[]>([])
    const [category,setcategory]=useState<string>("")
    const [filtercategory,setfiltercategory]=useState<Product[]>([])
    const [price,setprice]=useState(700)
    const getproducts=async()=>{
        let result=await axios.get("https://fakestoreapi.com/products/")
        setproduct(result.data)
        setfilterproduct(result.data)
    }

    useEffect(()=>{
        console.log("running")
        getproducts();
    },[])

  
    const handlefilter=(e:any)=>{
        setcategory(e.target.value)
        if(e.target.value==="all")
        {
            setfilterproduct([...product])
            setfiltercategory([...product])
        }
        else {
            const data=product.filter((product)=>product.category===e.target.value)
            setfilterproduct(data)
            setfiltercategory(data)
        }

        }
    const handleprice=(e:any)=>{
        setprice(e.target.value)

            var data=filtercategory.filter((product)=>product.price<price)
            console.log(data,price)
            setfilterproduct(data)
        
       
    }





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
        <FormControl style={{width:"150px"}}>
  <InputLabel id="demo-simple-select-label">Price</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={price}
    label="price"
    onChange={handleprice}
  >
    <MenuItem value={50}>50</MenuItem>
    <MenuItem value={100}>100</MenuItem>
    <MenuItem value={200}>200</MenuItem>
    <MenuItem value={700}>700</MenuItem>
  </Select>
</FormControl>
<br /><br />
     <Grid container spacing={3}>
        {
            filterproduct.length===0?
            Array.from(new Array(6)).map((item,i)=>{
                return(
                    <Grid item xs={3} key={i}>
                        <Card >
                         <Skeleton variant="rectangular" width={210} height={200} style={{borderRadius:"20px"}} />
                         <br />
                         <Skeleton variant="rectangular" width={190} height={20} style={{borderRadius:"20px"}} />
                         <br />

                         <Skeleton variant="rectangular" width={170} height={20} style={{borderRadius:"20px"}} />
                         <br />

                         <Skeleton variant="rectangular" width={150} height={30} style={{borderRadius:"20px"}} />
                         </Card>
                    </Grid>
                )
            }) 
            
            :

            filterproduct.map((product)=>{
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
                            <Typography variant="body2" component="div" style={{textOverflow:"ellipsis",overflow:"hidden",width:"100%",whiteSpace:"nowrap"}}>{product.price}</Typography>
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