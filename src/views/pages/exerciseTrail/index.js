

import React, { memo } from "react";


import { createTheme, ThemeProvider,Container,CssBaseline, Typography, Box, TextField } from '@mui/material';
import UsersController from "../../../controller/userController";
import { DropResult } from 'react-beautiful-dnd';



const theme = createTheme();




class ExerciseTrail extends React.Component{
    
    constructor(props){
        super(props);
        console.log(props)

        const data= UsersController.getSession(); 
        this.state={
            session:{
                ...data
            }

        }
        
        
    }
    
   
    
    render() {

        // const { studentId } = useParams();

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <br/><br/><br/><br/>
                NewExerciseTrail
            </Container>
            </ThemeProvider>      
        );
    }
}

export default ExerciseTrail;
