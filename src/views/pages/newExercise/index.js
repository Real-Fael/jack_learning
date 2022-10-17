

import React, { memo } from "react";
import "../exercise/index.css"
import palette from "../../../data/blocklyPalette.json"
import BlocklyExecControll from "../../../components/blocklyExecControll";
import { createTheme, ThemeProvider,Container,CssBaseline, Typography, Box, TextField, Fab, FormControl } from '@mui/material';
import UsersController from "../../../controller/userController";
// import {  } from "@material-ui/core";
// import {AddIcon,NavigationIcon,FavoriteIcon, EditIcon  }  from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigationIcon from '@mui/icons-material/Navigation';
import ExerciseController from "../../../controller/ExerciseController";

const theme = createTheme();
class NewExercise extends React.Component{
    constructor(props){
        super(props);
        this.refForm= React.createRef();
        this.refIO= React.createRef();
        const data= UsersController.getSession(); 
        this.state={
          session:{
            ...data
          },
          exercise:{
            //   title:"",
            //   description:"",
              IOexamples:[]
          },
          
          executeXML:()=>{alert("none")},
          setInput:()=>{alert("none")},
          getOutput:()=>{alert("none")},
          getXML:()=>{alert("none")}
        }
        
        // console.log(data)
        console.log(this.state)
        // this.IODelete()
        // console.log(this.state)
      }
    
    updateActions = ({executeXML, setInput, getOutput, getXML})=> {
        this.setState({
          executeXML: (executeXML || function(){alert("none")}),
          setInput: setInput || function(){alert("none")},
          getOutput: getOutput || function(){alert("none")},
          getXML: getXML ||function(){alert("none")}
        })
    }
    
    IOtester = () =>{
        
        let IOData = {
            title:this.refForm.current.title.value,
            description:this.refForm.current.description.value,
        }
        // console.log(IOData.title)
        // console.log(IOData.description)
        // console.log(this.refIO)
        let IOLen = this.refIO.current.children.length;

        if (!IOData.title || !IOData.description){
            alert("todos os campos devem ser preenchidos")
            return
        }

        if (IOLen === 0){
            alert("deve conter ao menos uma entrada e saida")
            return
        }

        console.log(IOLen)
        IOData["IOlist"]=[]
        IOData["xml"] = this.state.getXML()

        if (!IOData["xml"] || IOData["xml"] ===`<xml xmlns="https://developers.google.com/blockly/xml"></xml>`){
            alert("não é permitido algoritmos em branco, por favor, elabore um algoritmo para validação ")
            return
        }

        for(let i=0;i<IOLen;i++){
            // console.log(`input-${i}`)
            // console.log(this.refForm.current[`input-${i}`].value)
            let IOobject = {"input":this.refForm.current[`input-${i}`].value,
                            "output":this.refForm.current[`output-${i}`].value}
            this.state.setInput(IOobject["input"])
            this.state.executeXML()

            if (this.state.getOutput() !== IOobject["output"]){
                alert(`A saida-${i+1} esperada não corresponde com o resultado da saida do algoritmo`)
                return
            }

            // console.log(`output-${i}`)
            // console.log(this.refForm.current[`output-${i}`].value)
            IOData["IOlist"].push(IOobject)
        }
        //*****SALVAR NO MEU BANCO *******/
        ExerciseController.cadExerciseCheck(IOData)

        window.location.href = "/"
        // console.log(this.state.exercise.IOexamples)
        // console.log(this.state.exercise.IOexamples[0].props.children[0].type)
        
        // this.state.executeXML()
        // alert(this.state.getOutput())
        // alert(this.state.getXML())
    }

    changeFormValue = (event) =>{
        // console.log(event.target.id)
        let newstate = {}; 
        newstate[event.target.id] = event.target.value; 
        
        this.setState({exercise:newstate}) 
    }

    changeIOValues = (event) =>{
        // console.log(event.target.id)
        let newstate = this.state.exercise.IOexamples; 
        let iotype = event.target.id.split("-")[0]
        let pos = event.target.id.split("-")[1]

        newstate[pos][iotype] = event.target.value; 
        
        this.setState({exercise:{IOexamples:newstate}}) 
    }
    

    IODelete = () => {
        this.state.exercise.IOexamples.pop()
        this.setState({exercise:{IOexamples: this.state.exercise.IOexamples}})
    }

    IOCreate = () => {
        let io = <div key={String(this.state.exercise.IOexamples.length)}>                           
            <TextField
            id={"input-"+String(this.state.exercise.IOexamples.length)}
            label={`Entrada-${String(this.state.exercise.IOexamples.length+1)}`}
            multiline
            maxRows={5}
            variant="filled"
            // onChange={this.changeIOValues}
            />
            <TextField
            id={"output-"+String(this.state.exercise.IOexamples.length)}
            
            label={`Saída-${String(this.state.exercise.IOexamples.length+1)}`}
            multiline
            maxRows={5}
            
            variant="filled"
            // onChange={this.changeIOValues}
            
            />
        </div>
        this.setState({exercise:{IOexamples: this.state.exercise.IOexamples.concat(io)}})
        // this.render()
    }


    render() {
        if (this.state.session.id ===-1){
            window.location.href = "/login"
            return <></>
        }
        if (!this.state.session.isteacher){
            window.location.href = "/exercisetrail"
            return <></>
        }
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
            <div className="exercise" >
               
               
                    <div className="column describe">
                       
                        <Box
                        ref={this.refForm}
                        // onSubmit={this.handleSubmit}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1,  },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            <div style={{
                                        "display": "flex",
                                        // "flexDirection": "row",
                                        "justifyContent": "center",
                                        "alignItems": "center"
                                        }}>
                                
                                <TextField
                                    sx={{  "marginTop": "16px"}}
                                    id="title"
                                    label="Título do exercício"
                                    multiline
                                    maxRows={4}
                                    // value={this.state.exercise.title}
                                    // onChange={this.changeFormValue}
                                />

                            </div>
                            <div >
                           
                                <TextField
                                        sx={{  "marginTop": "16px",
                                        "width": '98%',}}
                                        id="description"
                                        label="Descrição do exercício"
                                        multiline
                                        rows={8}
                                        fullWidth
                                        // value={this.state.exercise.description}
                                        // onChange={this.changeFormValue}
                                />

                            

                            </div>
                            
                            <Typography variant="button" display="block" gutterBottom sx={{
                                "marginTop":"16px",
                                "fontWeight": "bold"
                            }}>
                                    Exemplos:
                                </Typography>
                            {/* <Typography variant="button" display="block" gutterBottom>
                                Input:
                            </Typography> */}
                            <Box ref={this.refIO}
                            component="div"
                            id="IOControll"
                            sx={{
                                '& .MuiTextField-root': { m: 0.2, width: '47%' },
                                
                            }}
                            noValidate
                            autoComplete="off"
                            >

                                {this.state.exercise.IOexamples}
                                
                            
                            </Box>
                            <Box sx={{ '& > :not(style)': { m: 1 },
                                        "display": "flex",
                                        // "flexDirection": "row",
                                        "justifyContent": "right",
                                        // "alignItems": "right" 
                                    }}>

                                <Fab color="primary" size="small" aria-label="add" onClick={this.IOCreate}>
                                    <AddIcon />
                                </Fab>
                                <Fab color="secondary" size="small" aria-label="edit" onClick={this.IODelete}>
                                    <RemoveIcon />
                                </Fab>
                                <Fab variant="extended" size="small" onClick={this.IOtester} >
                                    <NavigationIcon sx={{ mr: 1 }} />
                                    Validar e publicar
                                </Fab>
                                
                            </Box>

                        </Box>
                        


                    </div>
                    <div  className="workSpace">
                        <BlocklyExecControll toolBox={palette} updateActions={this.updateActions} />

                    </div>
                
                
            </div>
            </Container>
            </ThemeProvider>      
        );
    }
}

export default NewExercise;
