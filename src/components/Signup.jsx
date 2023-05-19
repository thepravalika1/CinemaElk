import { Grid, Input,Button,Link, Typography} from '@mui/material'
import React, { useState } from 'react'
import logoImg from '../assets/logo.png'
//import Img from '../assets/mv.jpg'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom'


export default function SignUp(){
    const navigate=useNavigate()
    const[email,setEmail]=useState('pravalika123@gmail.com')
    const[password,setPassword]=useState('1234567890')

    function  handleLogin(){
        createUserWithEmailAndPassword(auth,email,password).then((userCred)=>{
            setPassword('')
            setEmail('')
            console.log(userCred)
            navigate('/')
            
            
        })

    }
    


    return(
         <div  style={{backgroundColor:' rgb(224, 14, 14)' ,height:'100vh',width:'100vw'}}>
        {/* <div  style={{backgroundColor:' #f15a25' ,height:'100vh',width:'100vw'}}> */}
            <Grid container spacing={3} style={{display:'flex' ,justifyContent:'center',alignItems:'center'}}>              
                <Grid item xs={6}>
                   {/* <img  src={logoImg} height={500} width={500}/> */}
                     <img  src={logoImg} backgroundColor="#f15a25" height={500} width={500}/> 
                </Grid>
                <Grid item xs={6}>
                    <div> 
                        <h1 style={{color:'white',fontSize:'3.5rem'}}><i>Cinema Elk</i></h1>
                        <Input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} placeholder='Enter Email' type='email' style={{background:'white',borderRadius:'5px' ,padding:'0.3rem'}} />
                        <Input value={password} onChange={(e)=>setPassword(e.currentTarget.value)} placeholder='Enter Password' type='password' style={{marginLeft:'0.5em' ,background:'white',borderRadius:'5px' ,padding:'0.3rem'}} />
                    </div>
                    <Input placeholder='Enter UserName' type='text'style={{background:'white',width:'72%',marginLeft:'0.1rem',borderRadius:'5px',marginTop:'1.75rem',padding:'0.3rem'}} />
                    <div style = {{display:'grid' ,justifyContent:'start',alignItems:'center',marginLeft:'8rem',color:'white'}}>
                    <Button onClick={handleLogin}  style={{color:'white',border:'2px solid white',width:'188%',marginLeft:'-7.9rem',marginTop:'1.75rem'}}>Join The Club</Button>
                    <Typography marginTop='1rem' variant='body1'>Already a Member? <Link href='/'underline='white' style={{color:"white"}}>Click Here </Link></Typography>
                    </div>
                </Grid>
                
            </Grid>
        </div>
    )
}