import React, { useEffect, useState } from "react";
import { AppBar,Toolbar,Typography,Button,Box,Grid, Card,Rating, CardMedia} from "@mui/material"; 
import AddHomeIcon from '@mui/icons-material/AddHomeRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from '@mui/icons-material/Movie';
import {useNavigate} from 'react-router-dom';
import logoImg from '../assets/logo.png'
import {db} from '../firebase'
import {collection,getDocs} from 'firebase/firestore'
 

export default function Reviews(){
    const navigate=useNavigate()
    const[allUsersInfo,setAllUsersInfo]=useState([])
    const[isContentExapand,setIsContentExpand]=useState(false)
    
    useEffect(() => {
        const getAllUsers = async () => {
          const cRef=collection(db,'myreviews')
          const data = await getDocs(cRef);
          setAllUsersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getAllUsers();
        }, []);

        function toggleContent(){
            setIsContentExpand(!isContentExapand)

        }
        

    return(
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" style={{borderBottom:'1px solid black',backgroundColor:'white'}}>
                <Toolbar>
                <img onClick={()=>navigate('/home')} src={logoImg} alt="" height={50} width={50} />
                    <Typography onClick={()=>navigate('/home')} variant="h4" color={"black"} component="div" sx={{ flexGrow: 1 }}>
                       <i>CinemaElk</i>
                    </Typography>
                    <Button variant="contained" bgcolor="primary" onClick={()=>navigate('/')}>LogOut</Button>
                </Toolbar>
            </AppBar>
            </Box>
            <div
        style={{
          
          textAlign: "center",
          marginTop: "1rem",
          fontSize: "2rem",
        }}
      >
        Reviews By All CinemaElk Users
      </div>
            <Grid container>
                <Grid item xs={1} display='grid' mt={4} height='50vh'>
                   <AddHomeIcon onClick={()=>navigate('/home')} color="primary"  sx={{ fontSize: 40 }} />
                   <MovieIcon color="warning" onClick={()=>navigate('/reviews')} sx={{ fontSize: 40 }}/>
                   <AccountCircleIcon color="primary" onClick={()=>navigate('/myreviews/:id')}  sx={{ fontSize: 40 }}/>
                
                
                </Grid>
                <Grid item xs={11}>
                    <div className="reviews">
                        {allUsersInfo.map((doc)=>{
                            return(
                                <div>
                               <Card style={{margin:"0.5rem", padding:'1rem', border:'1.5px solid gray',width:'29rem',height:'auto'}}>
                                    <Grid container>
                                        <Grid item xs={9}>
                                            
                                            
                                            <Typography gutterBottom variant="h5" style={{borderBottom:'2px solid gray'}}>{doc.userEmail.split('@')[0]}</Typography>
                                            <Rating value={doc.ratingValue}/>
                                          {isContentExapand?(
                                            <Typography variant="body2" marginBottom='1rem'>{doc.review}</Typography>
                                          ):(
                                            <Typography variant="body2" marginBottom='1rem'>{doc.review.slice(1,100)}..</Typography>
                                          )}  
                                          { isContentExapand ?(
                                             <Button onClick={toggleContent} color="primary"  variant="contained" size="small">Readless.</Button> 
                                          ):(
                                            <Button onClick={toggleContent} color="primary"  variant="contained" size="small">Readmore.</Button>
                                          )}
                                            
                                          
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CardMedia component='img' src={`https://image.tmdb.org/t/p/w500${doc.img}`} height={150} width={8}/>

                                        </Grid>
                                    </Grid>
                               
                                </Card>
                                </div>
                            )
                        })

                        }

                    </div>
                    

                </Grid>
            </Grid>
            
        </div>
    )
}

