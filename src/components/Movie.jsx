import {React,useState,useEffect} from "react";
 import logoImg from '../assets/logo.png'
//  import Img from '../assets/mv.jpg'
import { AppBar,Card,Grid,CardMedia,Toolbar,Typography,Button } from "@mui/material"; 
import AddHomeIcon from '@mui/icons-material/AddHomeRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from '@mui/icons-material/Movie';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
const MOVIE_API='https://api.themoviedb.org/3/movie/popular?api_key=c7061ec042afaea1d22209cdb5360294&language=en-US&page=1'
const IMAGE_API='https://image.tmdb.org/t/p/w500';
const N_PLY=`https://api.themoviedb.org/3/movie/now_playing?api_key=c7061ec042afaea1d22209cdb5360294&language=en-US&page=1`
const TR=`https://api.themoviedb.org/3/movie/top_rated?api_key=c7061ec042afaea1d22209cdb5360294&language=en-US&page=1`
const UM=`https://api.themoviedb.org/3/movie/upcoming?api_key=c7061ec042afaea1d22209cdb5360294&language=en-US&page=1`


export default function Movie(){
     
    const navigate=useNavigate()
    const [movies,setMovies]=useState([])
    const[pMovies,setPMovies]=useState([])
    const[tMovies,setTMovies]=useState([])
    const[uMovies,setUMovies]=useState([])
    
    // useEffect(()=>{
    //     if(!user){
    //         navigate('/')
    //     }
    // },[user,navigate])
  
    

    useEffect(()=>{
        axios.get(MOVIE_API).then((response)=>{
            setMovies(response.data.results)
        })
    },[])

    useEffect(()=>{
        axios.get(N_PLY).then((response)=>{
           setPMovies(response.data.results)
        })
    },[])
    useEffect(()=>{
        axios.get(TR).then((response)=>{
            setTMovies(response.data.results)
        })
    },[])
    useEffect(()=>{
        axios.get(UM).then((response)=>{
            setUMovies(response.data.results)
        })
    },[])
    
    
    return(
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
            <Grid container>
                <Grid item xs={1} display='grid' mt={4} height='50vh' >
                   <AddHomeIcon color="warning"  sx={{ fontSize: 40 }} />
                   <MovieIcon color="primary" onClick={()=>navigate('/reviews')} sx={{ fontSize: 40 }}/>
                   <AccountCircleIcon onClick={()=>navigate('/myreviews/:id')} color="primary" sx={{ fontSize: 40 }}/>
                </Grid>
                
                <Grid item xs={11} mt={2}>
                    <Typography variant="h5" gutterBottom>Now Playing</Typography>
                        <div className="cards">
                        {movies.map((movie)=>{
                            return(
                                <div key={movie.id}>
                                
                                    <Card onClick={()=>navigate(`/movie/${movie.id}`,{state:movie})} style={{margin:'0.5rem',width:'7rem',height:'11rem'}}>
                                    
                                        <CardMedia
                                            component='img'
                                            sx={{ height: 140 }}
                                            src={IMAGE_API+movie.poster_path}
                                            width={50}
                                            height={50}
                                            
                                        />
                                
                                        <Typography gutterBottom variant="body1">
                                            {movie.title.split(' ')[0]}
                                        </Typography>
                                    </Card>
                                </div>
                            )
                        })}
                        </div>
                            <Typography variant="h5" gutterBottom>Popular Playing</Typography>
                    <div className="cards">
                    {
                    pMovies.map((movie)=>{
                        return(
                            <div key={movie.id}>
                                <Card onClick={()=>navigate(`/movie/${movie.id}`,{state:movie})} style={{margin:'0.5rem',width:'7rem',height:'11rem'}}>
                                <CardMedia
                                    component='img'
                                    sx={{ height: 140 }}
                                    src={IMAGE_API+movie.poster_path}
                                    width={50}
                                    height={50}
                                   // title="green iguana"
                                />
                                
                                <Typography gutterBottom variant="body1">
                                {movie.title.split(' ')[0]}
                                </Typography>
                                </Card>
                            </div>
                        )
                        })}
                    </div>
                    <Typography variant="h5" gutterBottom>Top Rated</Typography>
                    <div className="cards">
                    {
                    tMovies.map((movie)=>{
                        return(
                            <div key={movie.id}>
                                
                                <Card onClick={()=>navigate(`/movie/${movie.id}`,{state:movie})} style={{margin:'0.5rem',width:'7rem',height:'11rem'}}>
                                    
                                <CardMedia
                                    component='img'
                                    sx={{ height: 140 }}
                                    src={IMAGE_API+movie.poster_path}
                                    width={50}
                                    height={50}
                                   // title="green iguana"
                                />
                                
                                <Typography gutterBottom variant="body1">
                                {movie.title.split(' ')[0]}
                                </Typography>
                                </Card>
                            </div>
                        )
                        })}
                    </div>
                    <Typography variant="h5" gutterBottom>Upcoming Movies</Typography>
                    <div className="cards">
                    {
                    uMovies.map((movie)=>{
                        return(
                            <div key={movie.id}>
                                
                                <Card onClick={()=>navigate(`/movie/${movie.id}`,{state:movie})} style={{margin:'0.5rem',width:'7rem',height:'11rem'}}>
                                    
                                <CardMedia
                                    component='img'
                                    sx={{ height: 140 }}
                                    src={IMAGE_API+movie.poster_path}
                                    width={50}
                                    height={50}
                                   // title="green iguana"
                                />
                                
                                <Typography gutterBottom variant="body1">
                                {movie.title.split(' ')[0]}
                                </Typography>
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

