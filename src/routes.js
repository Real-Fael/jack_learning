import {React} from "react";
import { BrowserRouter, Route,Routes, Link } from 'react-router-dom';
import Exercise from "./views/pages/exercise";
import Home from "./views/pages/home";


//import BadRoute from "./views/pages/badRoute"



import Login from "./views/pages/login"
import NewExercise from "./views/pages/newExercise";
import Register from "./views/pages/register";



const MyRoutes = () => {
    return(
    <BrowserRouter> 
    <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route  path='/register' element={<Register/>} />
        <Route  path='/login' element={<Login/>} />
        <Route  path='/Exercise' element={<Exercise/>} />
        <Route  path='/NewExercise' element={<NewExercise/>} />
    </Routes>
        
      
    </BrowserRouter>
    )
 }
 
 export default MyRoutes;