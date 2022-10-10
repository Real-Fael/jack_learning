

import React, { memo } from "react";

import "./index.css"
import test from "../../../data/blocklyPalette.json"
import BlocklyExecControll from "../../../components/blocklyExecControll";
import { createTheme, ThemeProvider,Container,CssBaseline, Typography, Box, TextField } from '@mui/material';
import UsersController from "../../../controller/userController";
import { useParams } from "react-router-dom";
import ExerciseController from "../../../controller/ExerciseController";



const theme = createTheme();


const Infotemplate = (props) =>{
    const {param} = useParams()
    console.log(param)
    console.log("exercise")
    let exercise = ExerciseController.getExercise(param)
    
    console.log(exercise)
    if (!exercise){
        // window.location.href = "/notfound"
        return <>ERRO EXERCICIO NAO ENCONTRADO</>
    }
    // props.exerciseRef(exercise);

    return <Box sx={{ width: '100%', maxWidth: 500 }}  ref={props.exerciseRef} >
        <Typography sx={{ "textAlign": 'center', "fontWeight": "bold"}} variant="h5" gutterBottom component="div" id="title" >
            {exercise.title}
        </Typography>
        <Typography sx={{ "textAlign": 'center'}} variant="caption" display="block" gutterBottom id="id_exercise">
        n°:{exercise.id}
        </Typography>


        <Typography variant="body1" id="description" gutterBottom>
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
        component="div" 
        id="io_box"
        sx={{
            '& .MuiTextField-root': { m: 0.2, width: '48%' },
            
        }}
        noValidate
        autoComplete="off"
        >
            {exercise.IOlist.map((element,pos,list) => {
                return <div key={`io-${pos}`} id={`io-${pos}`}>
                        
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
            },
            executeXML:()=>{alert("none")},
            setInput:()=>{alert("none")},
            getOutput:()=>{alert("none")},
            getXML:()=>{alert("none")}
            // exerciseData: {}
        }
        this.exerciseRef = React.createRef();
        // this.exerciseData = {};
        // console.log(data)
        // this.alertControll = props.alertControll;
        
    }
    
    updateExerciseData = (exerciseData) =>{

        console.log("update exercise Data")
        this.exerciseData = exerciseData
        console.log(this.exerciseData)
        // this.setState({
        //     exerciseData:exerciseData
        //   })
    }
    sendSolution = () =>{
        
        const IOlist =[].slice.call(this.exerciseRef.current.children.io_box.children).map((element,pos,list) => {
            let input= element.children[0].children[1].children[`input-${pos}`].textContent
            let output = element.children[1].children[1].children[`output-${pos}`].textContent
            return {input,output}
        })

        let IOData = {
            title:this.exerciseRef.current.children.title.textContent,
            id: this.exerciseRef.current.children.id_exercise.textContent.split(":")[1],
            description:this.exerciseRef.current.children.title.textContent,
            //ajustar
            IOlist
        }
        // console.log(IOData.title)
        // console.log(IOData.description)
        // console.log(this.refIO)
        let IOLen = IOData.IOlist.length;

        console.log(IOLen)
        IOData["xml"] = this.state.getXML()

        if (!IOData["xml"] || IOData["xml"] ===`<xml xmlns="https://developers.google.com/blockly/xml"></xml>`){
            alert("não é permitido algoritmos em branco, por favor, elabore um algoritmo para validação ")
            return
        }

        for(let i=0;i<IOLen;i++){
            // console.log(`input-${i}`)
            // console.log(this.refForm.current[`input-${i}`].value)
            let IOobject = IOData.IOlist[i]
            this.state.setInput(IOobject["input"])
            this.state.executeXML()

            if (this.state.getOutput() !== IOobject["output"]){
                alert(`A saida-${i+1} esperada não corresponde com o resultado da saida do algoritmo`)
                return
            }

            // console.log(`output-${i}`)
            // console.log(this.refForm.current[`output-${i}`].value)
            // IOData["IOlist"].push(IOobject)
        }

        alert(`PARABENS O ALGORITMO FUNCIONOU PARA TODOS OS CASOS`)

    }
    updateActions = ({executeXML, setInput, getOutput, getXML})=> {
        this.setState({
          executeXML: (executeXML || function(){alert("none")}),
          setInput: setInput || function(){alert("none")},
          getOutput: getOutput || function(){alert("none")},
          getXML: getXML ||function(){alert("none")}
        })
    }
    
    render() {

        // const { studentId } = useParams();

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
            <div className="exercise" >
               
               
                    <div className="column describe">
                       
                        <Infotemplate exerciseRef={this.exerciseRef} ></Infotemplate>

                    </div>
                    <div  className="workSpace">
                        <BlocklyExecControll toolBox={test}  exerciseData= {this.exerciseRef} sendSolution={this.sendSolution}
                        updateActions={this.updateActions}/>

                    </div>
                
                
            </div>
            </Container>
            </ThemeProvider>      
        );
    }
}

export default Exercise;
