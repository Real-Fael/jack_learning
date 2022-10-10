import * as React from 'react';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import Navbar from "./components/navbar";
import Exercise from "./views/pages/exercise";
import ExerciseTrail from './views/pages/exerciseTrail';
import Home from "./views/pages/home";


//import BadRoute from "./views/pages/badRoute"



import Login from "./views/pages/login"
import Logout from './views/pages/logout';
import NewExercise from "./views/pages/newExercise";
import NewExerciseTrail from './views/pages/newExerciseTrail';
import Register from "./views/pages/register";

class MyRoutes extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            
            alertMessage:<></>
            // redirect:''
        }
    }

    changeAlert = (alertComponent) => {
        this.setState({alertMessage:alertComponent})
    }
    closeAlert= (event) =>{
        this.setState({alertMessage:<></>})
    }
    alertControll = {"changeAlert":this.changeAlert,"closeAlert":this.closeAlert}
 render () {
    return(
    <>
        <BrowserRouter> 
        <Navbar></Navbar>
        {this.state.alertMessage}
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route  path='/register' element={<Register alertControll={this.alertControll}/>} />
                <Route  path='/login' element={<Login alertControll={this.alertControll}/>}  />
                <Route  path='/Exercise' element={<Exercise/>} />
                <Route  path='/Exercise/:param' element={<Exercise/>} />
                <Route  path='/NewExercise' element={<NewExercise/>} />
                <Route  path='/NewExerciseTrail' element={<NewExerciseTrail/>} />
                <Route  path='/ExerciseTrail' element={<ExerciseTrail/>} />
                <Route  path='/ExerciseTrail/:param' element={<ExerciseTrail/>} />
                
                <Route  path='/logout' element={<Logout/>} />
            </Routes>
        </BrowserRouter>
    </>
    )
 }
}
 
 export default MyRoutes;