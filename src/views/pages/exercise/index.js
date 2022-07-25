

import React, { memo } from "react";

import "./index.css"
import test from "../../../data/blocklyPalette.json"
import BlocklyExecControll from "../../../components/blocklyExecControll";
import { createTheme, ThemeProvider,Container,CssBaseline, Typography, Box, TextField } from '@mui/material';
import UsersController from "../../../controller/userController";
import { useParams } from "react-router-dom";
import ExerciseController from "../../../controller/ExerciseController";



const theme = createTheme();

const Infotemplate = () =>{
    const {param} = useParams()
    console.log(param)
    console.log("exercise")
    let exercise = ExerciseController.getExercise(param)
    console.log(exercise)
    if (!exercise){
        // window.location.href = "/notfound"
        return <>ERRO EXERCICIO NAO ENCONTRADO</>
    }
    

    return <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography sx={{ "textAlign": 'center', "fontWeight": "bold"}} variant="h5" gutterBottom component="div">
            {exercise.title}
        </Typography>
        <Typography sx={{ "textAlign": 'center'}} variant="caption" display="block" gutterBottom>
        n°:{exercise.id}
        </Typography>


        <Typography variant="body1" gutterBottom>
            {exercise.description}
        </Typography>
        <Typography variant="button" display="block" gutterBottom sx={{
            "marginTop":"16px",
            "fontWeight": "bold"
        }}>
                Exemplos:
            </Typography>
        {/* <Typography variant="button" display="block" gutterBottom>
            Input:
        </Typography> */}
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 0.2, width: '48%' },
            
        }}
        noValidate
        autoComplete="off"
        >
            {exercise.IOlist.map((element,pos,list) => {
                return <div key={`io-${pos}`} >
                        
                        <TextField
                        id={`input-${pos}`}
                        label={`Entrada-${pos+1}`}
                        multiline
                        rows={5}
                        defaultValue={element.input}
                        variant="filled"
                        InputProps={{
                            readOnly: true,
                        }}

                        />
                        <TextField
                        id={`output-${pos}`}
                        label={`Saida-${pos+1}`}
                        multiline
                        rows={5}    
                        defaultValue={element.output}
                        variant="filled"
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    </div>
            })}
            
        
        </Box>
    </Box>  
}

class Exercise extends React.Component{
    
    constructor(props){
        super(props);
        console.log(props)
        // this.handleReservation = this.handleReservation.bind(this)
        console.log(this.props.match)
        
        // this.refForm= React.createRef();
        const data= UsersController.getSession(); 
        this.state={
            session:{
                ...data
            }
        }
        // console.log(data)
        // this.alertControll = props.alertControll;
    }
    
    
    render() {

        // const { studentId } = useParams();

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
            <div className="exercise" >
               
               
                    <div className="column describe">
                       
                        <Infotemplate></Infotemplate>
                        
                        




                    </div>
                    <div  className="workSpace">
                        <BlocklyExecControll toolBox={test} />

                    </div>
                
                
            </div>
            </Container>
            </ThemeProvider>      
        );
    }
}

export default Exercise;
