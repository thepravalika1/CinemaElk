import React, { useEffect,useState } from "react";
import { AppBar, Box, Card, Divider, Grid,CardMedia,Toolbar,Typography,Button,Rating, Input, MenuItem } from "@mui/material"; 
import AddHomeIcon from '@mui/icons-material/AddHomeRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from '@mui/icons-material/Movie';
import logoImg from '../assets/logo.png'

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import '../App.css'
import {db} from '../firebase'
import {collection,getDocs,addDoc, query,where} from 'firebase/firestore'
import Popup from "reactjs-popup";
import { getAuth } from "firebase/auth";
const IMAGE_API='https://image.tmdb.org/t/p/w500';
const auth=getAuth()




export default function SingleMovie(){
    const[showPopup,setShowPopup]=useState(false)
    const [similarMovies,setSimilarMovies]=useState([])
    const[credits,setCredits]=useState([])
    const[inputValue,setInputValue]=useState('')
   
    const[ratingValue,setRatingValue]=useState()
    const[allUsersInfo,setAllUsersInfo]=useState([])
    
    const location=useLocation()
    const navigate=useNavigate()
    const {title,poster_path,overview,id}=location.state


   
    const allMyReviews=async()=>{
        const colRef= await addDoc(collection(db,'myreviews'),{
           userEmail:auth.currentUser.email,
           movieName:title,
            review:inputValue,
            ratingValue:ratingValue,
            img:poster_path,
            
           
        })
        console.log("Document written with ID: ", colRef.id);
    }
    
    useEffect(() => {
        async function getReviews() {
          const q = query(
            collection(db, "myreviews"),
            where("movieName", "==", title)
          );
    
          const querySnapshot = await getDocs(q);
        
        const prevReviews = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllUsersInfo(prevReviews);
        }
        getReviews();
      }, []);



    function handleOpenPopup(){
       setShowPopup(true)
    }

    function handleClosePopup(){
        setShowPopup(false)
        
    }

   


    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=c7061ec042afaea1d22209cdb5360294&language=en-US&page=1`).then(res=>{
            setSimilarMovies(res.data.results.slice(4,16))
          
        })

    },[])
    

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c7061ec042afaea1d22209cdb5360294&language=en-US&page=1`).then(res=>{
            setCredits(res.data.cast.slice(1,7))
            
        })
    },[])
    
    return(
        <div>

            <AppBar position="sticky" style={{borderBottom:'1px solid gray',backgroundColor:'white'}}>
                <Toolbar>
                <img onClick={()=>navigate('/home')} src={logoImg} backgroundColor="#f15a25" alt="" height={50} width={50} />
                    <Typography onClick={()=>navigate('/home')} variant="h4" color={"black"} component="div" sx={{ flexGrow: 1 }}>
                       <i>CinemaElk</i>
                    </Typography>
                    <Button variant="contained" bgcolor="primary" onClick={()=>navigate('/')}>LogOut</Button>
                </Toolbar>
            </AppBar>
            <Grid container style={{display:"flex"}}>
                <Grid item xs={1} display='grid' mt={4} height='50vh' position='static'>
                   <AddHomeIcon onClick={()=>navigate('/home')} color="warning"  sx={{ fontSize: 40 }} />
                   <MovieIcon color="primary" onClick={()=>navigate('/reviews')} sx={{ fontSize: 40 }}/>
                   <AccountCircleIcon onClick={()=>navigate(`/myreviews/:id`)} color="primary" sx={{ fontSize: 40 }}/>
                </Grid>
                <Grid style={{display:'flex',borderLeft:'1.5px solid gray'}} xs={11} >
                    <Grid item xs={6} padding={1} style={{borderRight:"1.5px solid gray"}}>
                        <Box>
                        <img src={IMAGE_API+poster_path} alt=""  height={300} width={300} style={{alignItems:'center',justifyContent:'center'}} />
                        </Box>
                        
                        <Typography  variant="h5">{title}</Typography>
                        <Typography variant="h6">Movie overview:-</Typography>
                        <Typography variant="body1">{overview}</Typography>
                        <Button onClick={handleOpenPopup} variant="contained" style={{margin:'1rem'}} color="warning">Post review</Button>
                        <Popup open={showPopup} onClose={handleClosePopup}>
                            <Card style={{backgroundColor:'wheat',color:'white',width:'15rem',height:'10rem',padding:'1rem'}} >
                                <Typography variant="h5" color='black'>Enter Your review</Typography>
                                <Input
                                   value={inputValue}
                                   onChange={(e)=>setInputValue(e.currentTarget.value)} 
                                />
                                <Typography variant="body2" color='black'>Rating 
                                    <Input type="number"  
                                    value={ratingValue} 
                                    onChange={(e) => {setRatingValue(e.target.value)}}  style={{width:'2rem',paddingLeft:'0.2rem'}}/>
                                out of 5</Typography>
                                <Button onClick={()=>{
                                    handleClosePopup()
                                    //addNewReview(inputValue)
                                    setRatingValue('')
                                    setInputValue('')
                                    allMyReviews()
                                   // allreviews()
                                    }} style={{marginTop:'1rem'}} variant="contained" color="primary">submit</Button>
                            </Card>

                        </Popup>
                        <Typography variant="h5"> Cast && Crew</Typography>
                        <Box style={{display:"flex"}}>
                            
                            
                            {
                            credits.map(person=>{
                                return(
                                    <div style={{margin:'0.7rem'}}>
                                        <img 
                                                component='img' 
                                                src={IMAGE_API+person.profile_path}
                                                height={50}
                                                width={50}
                                                
                                            />
                                            <Typography variant="body2">{person.name.split(' ')[0]}</Typography>
                                        
                                    </div>
                                )
                            })}
                            
                        </Box>
                        <Typography variant="h5">Similar Movies</Typography>
                        <div className="similarMovies">
                        
                            {
                                similarMovies.map((similarMovie)=>{
                                    return(
                                        <div>
                                            <Card onClick={()=>navigate(`/movie/${similarMovie.id}`,{state:similarMovie})} style={{margin:'0.4rem',width:'6.1rem'}}>
                                                <CardMedia 
                                                    component='img'
                                                    src={IMAGE_API+similarMovie.poster_path} 
                                                    width={500}
                                                    height={130}
                                                />
                                                <Typography variant="body1">{similarMovie.title.split(' ')[0]}</Typography>
                                            </Card>
                                        </div>

                                    )
                                })
                            }
                              
                        </div>
                        
                    </Grid>
                    <Grid item xs={6} marginTop={2}>
                        <Typography variant="h5" paddingLeft={1}>Reviews By CinemaElk Users</Typography>

                    <div>
                        {allUsersInfo.map((doc)=>{
                            return(
                                <Card style={{margin:'1rem',padding:'0.8rem',height:'auto',width:"27rem"}}>
                                
                                  <Typography variant="body1">{doc.review}</Typography>
                                  <div style={{display:'flex',justifyContent:'space-between',paddingTop:'0.5rem'}}>
                                    <Typography variant="body2">{doc.userEmail.split('@')[0]}</Typography>
                                    <Rating value={doc.ratingValue}/>
                                  </div>
                                </Card>
                               
                            )
                        })}
                        </div>
                    
                        
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}