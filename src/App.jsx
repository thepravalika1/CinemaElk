
import React, { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Movie from './components/Movie'
import Myreviews from './components/Myreviews'
import SingleMovie from './components/Singlemovie'
import Reviews from './components/Reviews'



function App() {

 return(
    
    <div>
     
      <Routes>
      
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/home' element={<Movie/>}/>
        <Route path='/movie/:id' element={<SingleMovie />} />
        <Route path='/reviews' element={<Reviews />}/>
        <Route path='/myreviews/:id' element={<Myreviews />}/>
        
        
      
        
      </Routes>

    </div>
  )
}

export default App
