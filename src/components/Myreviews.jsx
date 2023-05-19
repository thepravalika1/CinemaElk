import React, { useState,useEffect } from "react";
import logoImg from '../assets/logo.png'
//import Img from '../assets/mv.jpg'
import { AppBar,Toolbar,Typography,Button,Grid,Box,Card,Rating,CardMedia, Input } from "@mui/material";
import AddHomeIcon from '@mui/icons-material/AddHomeRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from '@mui/icons-material/Movie';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from "../firebase";
import Popup from "reactjs-popup";
// import { auth } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useNavigate } from "react-router-dom";
import {collection,deleteDoc,getDocs,doc,setDoc,query,where} from 'firebase/firestore'
import '../App.css'
const auth=getAuth()
const IMAGE_API='https://image.tmdb.org/t/p/w500';



export default function Myreviews(){
   
    
    const navigate=useNavigate()
    const usersCollectionRef=collection(db, "myreviews");
    const[showPopup,setShowPopup]=useState(false)
    const[myreview,setMyReview]=useState([])
    const[user,setUser]=useState()
    const[newReview,setNewReview]=useState()
    const[newRating,setNewRating]=useState()
    const[isContentExapand,setIsContentExpand]=useState(false)

    
    


    useEffect(() => {
        
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setMyReview(data.docs.map((doc) => ({  id: doc.id, ...doc.data() })));
        };
        getUsers()
    }, []);

    async function CurrentUser() {
        const collectionRef = collection(db, "myreviews");
        if(user && user.email){
            const q = query(
                collectionRef,
                where("userEmail", "==",auth.currentUser.email)
              );
        
            const querySnapshot = await getDocs(q);
            const reviews = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMyReview(reviews);
          }
        
          
    
        }
        CurrentUser();
        

    const deleteReview = async (id) => {
    const userDoc = doc(db, "myreviews", id);
    await deleteDoc(userDoc);
    };

  const updateUser = async (id) => {
    const userDoc = doc(db, "myreviews", id);
    const data = {
        review:newReview,
        ratingValue:newRating
        

      };
      setDoc(userDoc,data)
.then(userDoc => {
    console.log("Entire Document has been updated successfully",userDoc);
})
      
    
  };
  
    useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        console.log(user)
        setUser(user)
    })
   },[])


    function toggleContent(){
        setIsContentExpand(!isContentExapand)

    }

    function handleOpenPopup(){
        setShowPopup(true)
    }
 
     function handleClosePopup(){
         setShowPopup(false)
         
    }


 


    return(
        <>
        
        <div>
            <AppBar position="sticky" style={{borderBottom:'1px solid black',backgroundColor:'white'}}>
                <Toolbar>
                    <img onClick={()=>navigate('/home')} src={logoImg} alt="" height={50} width={50} />
                    <Typography onClick={()=>navigate('/home')} variant="h4" color={"black"} component="div" sx={{ flexGrow: 1 }}>
                       <i>CinemaElk</i>
                    </Typography>
                    <Button variant="contained" bgcolor="primary" onClick={()=>navigate('/')}>Logout</Button>
                </Toolbar>
            </AppBar>
            <div
        style={{
          
          textAlign: "center",
          marginTop: "1rem",
          fontSize: "2rem",
        }}
      >
        {/* Reviews By {user.email.split("@")[0]} */}
        My Reviews
      </div>

            <Grid container>
                <Grid item xs={1} display='grid' mt={4} style={{height:'50vh'}}>
                   <AddHomeIcon onClick={()=>navigate('/home')} color="primary"  sx={{ fontSize: 40}} />
                   <MovieIcon color="primary" onClick={()=>navigate('/reviews')} sx={{ fontSize: 40 }}/>
                   <AccountCircleIcon color="warning" sx={{ fontSize:40}}/>
                
                
                </Grid>
                <Grid item xs={11}>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    {myreview.map((review,index)=>{
                        return(
                        <Card key={index} style={{margin:"0.5rem", padding:'1rem', border:'1.5px solid gray',width:'29rem',height:'auto'}}>
                                    <Grid container>
                                        <Grid item xs={8}>

                                            <Typography gutterBottom variant="h5" style={{borderBottom:'2px solid gray'}}>{user.email.split('@')[0]}</Typography>
                                            <Rating value={review.ratingValue} />
                                            
                                            {isContentExapand?(
                                            <Typography variant="body2"  marginBottom='1rem'>{review.review}</Typography>
                                          ):(
                                            <Typography variant="body2" marginBottom='1rem'>{review.review.slice(0,50)}..</Typography>
                                          )}  
                                          

                                          <div style={{gap:'1rem'}}>
                                            { isContentExapand ?(
                                             <Button onClick={toggleContent} color="primary"  variant="contained" size="small">Readless.</Button> 
                                          ):(
                                            <Button onClick={toggleContent} color="primary"  variant="contained" size="small">Readmore.</Button>
                                          )}
                                            <EditIcon onClick={()=>{
                                                handleOpenPopup()
                                            
                                                }}/>
                                            <Popup open={showPopup}>
                                                
                                                <Card border='1px solid gray'>
                                                    <Input onChange={(e)=>setNewReview(e.target.value)} value={review.review} />
                                                    <Rating onChange={(e)=>setNewRating(e.target.value)} value={review.ratingValue}/>
                                                    <Button color="primary" onClick={()=>{
                                                        handleClosePopup()
                                                        updateUser(review.id)
                                                     }}>submit</Button>
                                                     
                                                </Card>
                                            </Popup>
                                            <DeleteIcon  color="warning"  onClick={() => {
                                                deleteReview(review.id);
                                                }}/>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CardMedia component='img' src={`https://image.tmdb.org/t/p/w500${review.img}`}  height={150} width={15}/>

                                        </Grid>
                                    </Grid>
                               
                                </Card>
                            )
                        })}
     

                        </div>

                </Grid>
            </Grid>
        </div>
        </>
    )
}

