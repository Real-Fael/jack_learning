

import React, { memo } from "react";
import "../exercise/index.css"
import palette from "../../../data/blocklyPalette.json"
import BlocklyExecControll from "../../../components/blocklyExecControll";
import { createTheme, ThemeProvider,Container,CssBaseline, Typography, Box, TextField, Fab, FormControl, Divider } from '@mui/material';
import UsersController from "../../../controller/userController";
// import {  } from "@material-ui/core";
// import {AddIcon,NavigationIcon,FavoriteIcon, EditIcon  }  from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigationIcon from '@mui/icons-material/Navigation';
import ExerciseController from "../../../controller/ExerciseController";
import { useParams } from "react-router";

const theme = createTheme();
function NewExercise(props){
    const {param} = useParams()
    const regex = new RegExp('^([0-9]*-(edit)?(copy)?)?$');
    let params =param? param.split("-"):null
    if (param!=null &&(!regex.test(param) || params.length>2)){
        window.location.href = "/exercise"
    }
    let exerciseId = params?params[0]:null
    let mode = params? params[1]:null
    console.log(exerciseId)
    console.log("exercise")
    let editExerciseAux =null
    let session = UsersController.getSession()
    if (exerciseId){
        editExerciseAux = ExerciseController.getExercise(parseInt(exerciseId))
    }
    console.log(editExerciseAux)
    if(editExerciseAux===null){
        editExerciseAux ={"IOlist":[{"input": "", "output": ""}]}
        
    }
    const [sessionData, setSessionData] = React.useState({...session});
    const [editExercise, setEditExercise] = React.useState({...editExerciseAux});
    const [functionsNewExercise, setFunctionsNewExercise] = React.useState({    executeXML:()=>{alert("none")},
                                                                                setInput:()=>{alert("none")},
                                                                                getOutput:()=>{alert("none")},
                                                                                getXML:()=>{alert("none")}}
                                                                           );
    //const [exerciseIOexamples, setEditIOexamples] = React.useState((editExercise!==null && editExercise.hasOwnProperty("IOlist"))?(editExercise.IOlist):[]);
    console.log("editExercise")
    console.log(editExercise)

    
    

    let refForm = React.useRef(null);
    let refIO = React.useRef(null);
    if (sessionData.id ===-1){
        window.location.href = "/login"
        return <></>
    }
    if (!sessionData.isteacher){
        window.location.href = "/exercisetrail"
        return <></>
    }
    
    // state={
    //     // session:{
    //     // ...data
    //     // },
    //     // exercise:{
    //     // //   title:"",
    //     // //   description:"",
    //     //     IOexamples:[]
    //     // },
        
    //     executeXML:()=>{alert("none")},
    //     setInput:()=>{alert("none")},
    //     getOutput:()=>{alert("none")},
    //     getXML:()=>{alert("none")}
    // }
    
    // console.log(data)
    // console.log(state)
        // IODelete()
        // console.log(state)
      
    
    const updateActions = ({executeXML, setInput, getOutput, getXML})=> {
        setFunctionsNewExercise({
          executeXML: (executeXML || function(){alert("none")}),
          setInput: setInput || function(){alert("none")},
          getOutput: getOutput || function(){alert("none")},
          getXML: getXML ||function(){alert("none")}
        })
    }
    
    const IOtester = () =>{
        
        let IOData = {
            id: (exerciseId)?exerciseId:null,
            title:refForm.current.title.value,
            description:refForm.current.description.value,
            creatorExercise:sessionData
        }
        // console.log(IOData.title)
        // console.log(IOData.description)
        // console.log(refIO)
        let IOLen = refIO.current.children.length;

        if (!IOData.title || !IOData.description){
            alert("todos os campos devem ser preenchidos")
            return
        }

        if (IOLen <= 5){
            alert("deve conter ao menos 5 instâncias de entrada e saida")
            return
        }

        console.log(IOLen)
        IOData["IOlist"]=[]
        IOData["xml"] = functionsNewExercise.getXML()

        if (!IOData["xml"] || IOData["xml"] ===`<xml xmlns="https://developers.google.com/blockly/xml"></xml>`){
            alert("não é permitido algoritmos em branco, por favor, elabore um algoritmo para validação ")
            return
        }

        for(let i=0;i<IOLen;i++){
            // console.log(`input-${i}`)
            // console.log(refForm.current[`input-${i}`].value)
            let IOobject = {"input":refForm.current[`input-${i}`].value,
                            "output":refForm.current[`output-${i}`].value}
            functionsNewExercise.setInput(IOobject["input"])
            functionsNewExercise.executeXML()

            if (functionsNewExercise.getOutput() !== IOobject["output"]){
                alert(`A saida-${i+1} esperada não corresponde com o resultado da saida do algoritmo`)
                return
            }

            // console.log(`output-${i}`)
            // console.log(refForm.current[`output-${i}`].value)
            IOData["IOlist"].push(IOobject)
        }
        if (mode==="edit"){
            //*****SALVAR NO MEU BANCO *******/
            ExerciseController.editExerciseCheck(IOData)
    
            window.location.href = "/"
            return
        }
        //*****SALVAR NO MEU BANCO *******/
        ExerciseController.cadExerciseCheck(IOData)

        window.location.href = "/"
        // console.log(state.exercise.IOexamples)
        // console.log(state.exercise.IOexamples[0].props.children[0].type)
        
        // state.executeXML()
        // alert(state.getOutput())
        // alert(state.getXML())
    }

    // const changeFormValue = (event) =>{
    //     // console.log(event.target.id)
    //     let newstate = {}; 
    //     newstate[event.target.id] = event.target.value; 
        
    //     setEditExercise(newstate) 
    // }

    // const changeIOValues = (event) =>{
    //     // console.log(event.target.id)
    //     let newstate = editExercise.IOlist; 
    //     let iotype = event.target.id.split("-")[0]
    //     let pos = event.target.id.split("-")[1]

    //     newstate[pos][iotype] = event.target.value; 
    //     let editExerciseAux = {...editExercise}
    //     editExerciseAux.IOlist = newstate
    //     setEditExercise(editExerciseAux) 
    // }
    

    const IODelete = () => {
        editExercise.IOlist.pop()
        setEditExercise({...editExercise})
    }

    const IOCreate = () => {
        editExercise.IOlist.push({"input": "", "output": ""})
        setEditExercise({...editExercise})
    }
    const IOBox = (item, pos, IOlist) => {
        let io = <>
             {/* <Divider variant="middle" /> */}
            
        
            <div key={String(pos)}>                           
                <Typography
                sx={{ mt: 0.5, ml: 2,mb:1 }}
                color="text.secondary"
                display="block"
                variant="caption"
                textAlign="center"
                
                >
                {`instancia ${pos+1}`}
                <Divider component="div" />
                </Typography>
                <TextField
                id={"input-"+String(pos)}
                label={`Entrada ${String(pos+1)}:`}
                multiline
                maxRows={5}
                variant="filled"
                defaultValue={item.input}
                // onChange={changeIOValues}
                />
                <TextField
                id={"output-"+String(pos)}
                
                label={`Saída ${String(pos+1)}:`}
                multiline
                maxRows={5}
                defaultValue={item.output}
                variant="filled"
                // onChange={changeIOValues}
                
                />
            </div>
        </>
        return io
        // setEditExercise(editExercise.IOlist.concat(io))
        // render()
    }


    
   
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
        <div className="exercise" >
            
            
                <div className="column describe">
                    
                    <Box
                    ref={refForm}
                    // onSubmit={handleSubmit}
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
                                defaultValue={editExercise.hasOwnProperty("title")?editExercise.title:""}
                                // value={state.exercise.title}
                                // onChange={changeFormValue}
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
                                    defaultValue={editExercise.hasOwnProperty("description")?editExercise.description:""}
                                    // value={state.exercise.description}
                                    // onChange={changeFormValue}
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
                        <Box ref={refIO}
                        component="div"
                        id="IOControll"
                        sx={{
                            '& .MuiTextField-root': { m: 0.2, width: '47%' },
                            
                        }}
                        noValidate
                        autoComplete="off"
                        >

                            {editExercise.IOlist.map((item, pos, IOlist) => {
                                return IOBox(item, pos, IOlist)
                            })}
                            
                        
                        </Box>
                        <Box sx={{ '& > :not(style)': { m: 1 },
                                    "display": "flex",
                                    // "flexDirection": "row",
                                    "justifyContent": "right",
                                    // "alignItems": "right" 
                                }}>

                            <Fab color="primary" size="small" aria-label="add" onClick={IOCreate}>
                                <AddIcon />
                            </Fab>
                            <Fab color="secondary" size="small" aria-label="edit" onClick={IODelete}>
                                <RemoveIcon />
                            </Fab>
                            <Fab variant="extended" size="small" onClick={IOtester} >
                                <NavigationIcon sx={{ mr: 1 }} />
                        
                                {(mode==="edit")?"Validar/Editar":(mode==="copy"?"Validar/Copiar":"Validar/Publicar")}
                            </Fab>
                            
                        </Box>

                    </Box>
                    


                </div>
                <div  className="workSpace">
                    <BlocklyExecControll toolBox={palette} updateActions={updateActions} initialXML={editExercise.xml} />

                </div>
            
            
        </div>
        </Container>
        </ThemeProvider>      
    );
    
}

export default NewExercise;
