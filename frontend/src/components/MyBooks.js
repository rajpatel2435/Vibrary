import React, { useEffect, useState } from 'react'
import { Grid,Button,Box,IconButton, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Container, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useNavigate } from 'react-router-dom'



const MyBooks= () => {

    const [products, setProducts] = useState([])
    const [show, setShow] = useState()
    const [isHovered, setIsHovered] = useState(false);
 
    const navigate = useNavigate()
    const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

 
    useEffect(() => {
      getProducts();
    }, []);
    const getProducts = async () => {
        let data = await fetch("http://127.0.0.1:6969/getFile", {
          method: "GET",
          headers: {
            Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
    
        let result = await data.json();
    
        if (result.result) {
          setShow(false);
        } else {
          setShow(true);
    
          setProducts(result);
          console.log("result" + result);
          console.log(result[0].userId);
        }
      };



    const deleteItem = async (pid) => {
        let data = await fetch('http://127.0.0.1:6969/getFile/' + pid, {
            method: "DELETE",
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        let result = await data.json()
        if (result.deletedCount) {
            getProducts();
     alert('Deleted');
      
        } else {
            alert('Error deleting')
        }
    }
    let auth = localStorage.getItem('user');
    let userCid=JSON.parse(auth)._id;

    return (
        <Container>
            {
                 
            
                show ? <>
                    < Typography variant={'h5'} sx={{ marginTop: '5em' }}> Available Movies</Typography >
                    <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{width:'100px'}}>Name of Books</TableCell>
                                    <TableCell>Images</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                      
                                //    console.log({(JSON.parse(auth).name)});
                                    
                                    // console.log("auth Id"+ auth._id);
                                    // console.log(userId);
                             
                                products.map(e => {
                                 
                          
                                       
                                    return (
                                        <TableRow key={e._id}>
                                            <TableCell>{e.name}</TableCell>
                                            <TableCell>
                                             
                                            {e.file.contentType=='image/jpeg' || e.file.contentType=="image/png" ? <Box
        component="img"
        sx={{
          height: 200,
          width: 200,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt={e.filename}
       
        src= {e.file.contentType=='image/jpeg'  ||e.file.contentType=='image/png' ? require(`../Images/${e.filename}`): ('')}
      />:  
      <>
       <div
      className="listItem"
    //   style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    


   
     </div>
     </>
    }          

                                            </TableCell>
                                            <TableCell>{e.type}</TableCell>
                                            <TableCell>{e.quantity}</TableCell>
                                            <TableCell>{e.description}</TableCell>
                                            <TableCell width={50} onClick={console.log("f")}>
                                              <Button>Issue Book</Button></TableCell>
                                              <TableCell width={50} onClick={console.log("f")}>
                                              <Button>Add to Favorite</Button></TableCell>
                                        </TableRow>
                                    )
                                    
                                    }
                                
                                    )}
                                  
                            </TableBody>
                        </Table>
                    </TableContainer>
                </> : <Typography variant={'h5'} sx={{ marginTop: '5em' }}>No Products Available</Typography>
            }
        </Container >)
}

export default MyBooks