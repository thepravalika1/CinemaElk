import { Link, Typography } from '@mui/material'
import { Grid, Input,Button} from '@mui/material'
import {React,useEffect,useState} from 'react'
import logoImg from '../assets/logo.png'

import {auth} from '../firebase'
import '../App.css'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'




export default function Login(){
    const navigate=useNavigate()
    const[email,setEmail]=useState('pravalika123@gmail.com')
    const[password,setPassword]=useState('1234567890')

    
   

    function  handleLogin(){
        signInWithEmailAndPassword(auth,email,password).then((userCred)=>{
            alert('you are logged in!!')
           console.log(userCred)
           setEmail('')
            setPassword('')
          // setUser(true)
            navigate('/home')
        })
    }
    
    return(
         <div  style={{backgroundColor:' rgb(224, 14, 14)' ,height:'100vh',width:'100vw'}}>
           
            <Grid className='login' container spacing={3} style={{display: "flex" , justifyContent:'center',alignItems:'center'}}>              
                <Grid item xs={6}>
                   {/* <img  src={Img} height={500} width={500}/> */}
                     <img  src={logoImg} height={500} width={500}/> 
                </Grid>
                <Grid item xs={6}>
                    <div > 
                        <h1 style={{color:'white',fontSize:'3.5rem'}}><i>Cinema Elk</i></h1>            
              <Input value={email} placeholder='Enter Email' onChange={(e)=>setEmail(e.currentTarget.value)} type='email' style={{background:'white',borderRadius:'5px' ,padding:'0.3rem'}} />
              <Input value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.currentTarget.value)} type='password'style={{marginLeft:'0.5em' ,background:'white',borderRadius:'5px' ,padding:'0.3rem'}} />
              </div>
              <div style = {{display:'grid' ,justifyContent:'start',alignItems:'center',color:'white'}}>
              <Button onClick={handleLogin} style={{color:'white',border:'2px solid white',width:'240%',marginTop:'1.75rem'}}>Login Now <TrendingFlatIcon justifyContent='flexend'/></Button>
              <Typography marginTop='1rem' alignItems='center' variant='body1'>Join the club <Link href='/signup'underline='white' style={{color:"white"}}>Click Here </Link></Typography>
              </div>
                </Grid>
                
            </Grid>
        </div>
    )
}