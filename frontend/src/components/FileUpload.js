import React, { useState, useEffect } from "react";
import { Button, Container, Grid, TextField, Typography,Hidden} from "@mui/material";
import {  useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Box } from "@mui/system";
const FileUpload = () => {

  // use usestas to set the value after some process
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState("");
  const [type,setType]=useState("")
  
  const [typeErr,setTypeErr]=useState(false)
  

  const [nameErr, setNameErr] = useState(false);
  const [fileErr, setFileErr] = useState(false);
  const [quantityErr,setQuantityErr]=useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);

  useEffect(() => {}, []);

  const navigate = useNavigate();

  const sty = () => {
    return {
      margin: "0.5em",
      width: "50%",
    };
  };

  const handleSubmit = async (req,res) => {

// console.log("requested body ------"+req.body.file);
//     console.log("file req "+file)

    if (req.file.filename && req.file) {
        let data = await fetch('http://127.0.0.1:6969/upload', {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify( req.file.filename, req.file),
            headers: {
              "Content-type": "application/json",
                  "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        console.log("data new"+ data.json())
        let final = await data.json()
        if (final.fieldName) {
            navigate('/')
        } else {
            alert('Error occured while adding product')
        }
    }
}

let userId = JSON.parse(localStorage.getItem('user'))._id
console.log(userId);
  return (
    <Container style={{marginTop:'100px'}}>
      <form action="http://127.0.0.1:6969/upload/" method="post"  enctype="multipart/form-data" sx={{ width: "50%" }}>

        <Typography variant="h3" sx={{ padding: "0.5em" }}>
          Upload Books
        </Typography>
        <Grid container direction={"column"}>
          <Grid item>
            <TextField
            name="name"
              variant="outlined"
              error={nameErr}
              helperText={nameErr ? "Enter a valid Name" : null}
              type={"text"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value === "" || e.target.value === null) {
                  setNameErr(true);
                } else {
                  setNameErr(false);
                }
              }}
              label="Name"
              sx={sty}
              required
            />
          </Grid>

            <input
            name="userId"
  
              type={"hidden"}
              value={userId}
   
     

           
            />
    
          <Grid item>
            <TextField
name="file"
              error={fileErr}
              helperText={fileErr ? "Enter a valid File" : ""}
              type={"file"}
              value={file}
              onChange={(e) => {
                setFile(e.target.value);
                if (e.target.value === "" || e.target.value === null) {
                  setFileErr(true);
                } else {
                  setFileErr(false);
                }
              }}
          
              sx={sty}
              required
            />
          </Grid>
          <Grid item>
            <TextField
name="quantity"
              error={quantityErr}
              helperText={quantityErr ? "Enter a valid number" : ""}
              type={"number"}
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                if (e.target.value === "" || e.target.value === null) {
                  setQuantityErr(true);
                } else {
                  setQuantityErr(false);
                }
              }}
          label="Number of Books"
              sx={sty}
              required
            />
          </Grid>
          <Grid item>
            <TextField
            name="description"
              variant="outlined"
              error={descriptionErr}
              helperText={descriptionErr ? "Enter a valid Name" : null}
              type={"text"}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (e.target.value === "" || e.target.value === null) {
                  setDescriptionErr(true);
                } else {
                  setDescriptionErr(false);
                }
              }}
              label="Description"
              sx={sty}
              required
            />
          </Grid>
          <Grid item>
          <Box sx={{ minWidth: 80 }}>
      <FormControl sx={sty}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
        name="type"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={(e) => {
            setType(e.target.value);
            console.log("gennnnnn"+e.target.value)
            if (e.target.value === "" || e.target.value === null) {
              setTypeErr(true);
            } else {
              setTypeErr(false);
            }
          }}
          error={typeErr}
          helperText={typeErr ? "Enter a valid type" : null}
          required
        
        >
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Comedy">Comedy</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </Grid>
          <Grid item>
            {/* <Button
              size="large"
              variant="contained"
              onClick={handleSubmit}
              sx={{ margin: "1em" }}
            >
              Submit File
            </Button>  */}
        <input type="submit" name="submit" style={{padding:'10px',width:'80px',marginLeft:'10px',backgroundColor:'black',color:'white'}} value="submit"/>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FileUpload;
