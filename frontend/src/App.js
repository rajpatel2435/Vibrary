import React from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ShowFiles from './components/ShowFiles';
import UpdateMov from './components/UpdateMov';
import Login from './components/Login';
import Signup from './components/Signup';
import History from './components/History';
import FileUpload from './components/FileUpload';
import Forgot from './components/Forgot';
import AllUsers from './components/AllUsers';
import SearchMov from './components/SearchMov';
import ShowBooksu from './components/ShowBooksu';
import MyBooks from './components/MyBooks';

export default function App() {
    return (
       
             



        <BrowserRouter>
        <Box sx={{marginTop:'40px'}}/>
        <Navbar />
        
        <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
    
            <Route path='/FileUpload' element={<FileUpload/>} />
            <Route path='/Forgot' element={<Forgot/>}/>
            <Route path='/users' element={<AllUsers/>}/>
            <Route path='/showFiles' element={<ShowFiles/>}/>
            <Route path='/updateMovies' element={<UpdateMov/>}/>
            <Route path='/showBooksU' element={<ShowBooksu/>}/>
            <Route path='/myBooks' element={<MyBooks/>}/>
            {/* <Route path='/CPass' element={<CPass/>}/> */}
      
        


      
            <Route path='/searchMovies' element={<SearchMov/>} />
            {/* <Route path="*" element={<h2>404 Page Not Found</h2>} /> */}
        </Routes>
        <Box sx={{ marginBottom: '7em' }} />

    </BrowserRouter >
    );
}