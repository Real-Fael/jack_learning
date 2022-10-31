import React, { memo } from "react";
import { createTheme, ThemeProvider,Container,CssBaseline, Typography, Box, TextField, Avatar, Grid, FormControlLabel, Checkbox, Button, Link, Autocomplete } from '@mui/material';
import UsersController from "../../../controller/userController";

import ListAltIcon from '@mui/icons-material/ListAlt';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import { DropResult } from 'react-beautiful-dnd';
import DraggableList from '../../../components/draggableList/DraggableList';
// import pick from '@cahil/utils/accessors/pick';
// import faker from 'faker';

import trailFeatures from "../../../data/trailFeatures.json"
import TransferList from "../../../components/draggableList/TransferList";
import ExerciseController from "../../../controller/ExerciseController";
import { Label } from "recharts";
import { ErrorAlert, SuccessAlert } from "../../../components/alerts";
import TrailController from "../../../controller/trailController";
import { ComboBox } from "../../../components/comboBox";
import { useParams } from "react-router";
import _ from "lodash"

const theme = createTheme();
// a little function to help us with reordering the result
export const reorder =(
    list,
    startIndex,
    endIndex
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  export const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `Item ${k + 1}`,
      primary: `nome ${k+1}`,
      secondary: `frase ${k+1}`//faker.company.catchPhrase()
    }));
  


function not(a, b) {
    console.log(b)
    return a.filter((value) => {
        let check = true
         b.forEach((valueB)=>{
            
            if (_.isEqual(value, valueB)) check= false
         })
       return check
    });
}


function NewExerciseTrail(props){
    
    const {param} = useParams()
    const regex = new RegExp('^([0-9]*-(edit)?(copy)?)?$');
    let params =param? param.split("-"):null
    if (param!=null &&(!regex.test(param) || params.length>2)){
        window.location.href = "/exerciseTrail"
    }
    let trailId = params?params[0]:null
    let mode = params? params[1]:null
    console.log(trailId)
    console.log("exercise")
    let editTrailAux =null
    let session = UsersController.getSession()
    if (trailId){
        editTrailAux = TrailController.getTrail(parseInt(trailId))
    }
    console.log(editTrailAux)

    const [sessionData, setSessionData] = React.useState(session);
    const [editTrail, setEditTrail] = React.useState(editTrailAux);

    const [choosedItems, setChoosedItems] = React.useState(mode==="copy"||(editTrailAux && editTrailAux.creatorTrail.id===session.id)?editTrailAux.exercisesTrail:[]);
    const [disponibleItems, setDisponibleItems] = React.useState(not(ExerciseController.getExerciseList(),choosedItems));
    //const [choosedItems, setChoosedItems]=React.useState()
    if (sessionData.id ===-1){
        window.location.href = "/login"
        return <></>
    }
    if (!sessionData.isteacher){
        window.location.href = "/exercisetrail"
        return <></>
    }
    if((editTrail && editTrail.hasOwnProperty("creatorTrail") && editTrail.creatorTrail.id!==session.id) && mode!=="copy"){
        window.location.href = "/exercisetrail"
        return <></>
    }
    

    
    let refForm= React.createRef();
    let alertControll = props.alertControll;
    // const classes = useStyles();
    // console.log(data)
        
    
    
    const onDragEnd = (onDragEndProps) => {
        // dropped outside the list
        // console.log(onDragEndProps)
        if (!onDragEndProps.destination) return;
    
        const newItems = reorder(choosedItems, onDragEndProps.source.index, onDragEndProps.destination.index);
    
        setChoosedItems(newItems)
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
    
        let trailData = {
            id: (trailId)?trailId:null,
            trailName: refForm.current.trailName.value,
            difficultyLevel: refForm.current.comboBoxLevels.value,
            exercisesTrail: choosedItems,
            creatorTrail: sessionData,
            trailDescription:refForm.current.description.value,
            congratulationsMessage:refForm.current.congratulationsMessage.value
            
        }
        
        
        // if(mode ==="copy"){
        //     alert("copy")
        //     return
        // }
        // if(mode ==="edit"){
        //     alert("edit")
        //     return
        // }

        alert("nova")
        console.log(trailData);
        try{
            TrailController.registerCheck(trailData, mode)

            alertControll.changeAlert(<SuccessAlert closeAlert= {alertControll.closeAlert} message="Trilha criada com sucesso" ></SuccessAlert>)

        }catch(e){
            // console.log(e)
            alertControll.changeAlert(<ErrorAlert closeAlert= {alertControll.closeAlert} message= {e}></ErrorAlert>)
            return
        }

        window.location.href = "/exercisetrail"
        return



      };

    const typing =(e)=>{
        // console.log(e.target.value)
        // console.log(e.target.id)
        let editTrailAux = {...editTrail}
        if (e.target.id ==="trailName")
            editTrailAux.trailName =e.target.value
        if (e.target.id ==="description")
            editTrailAux.trailDescription =e.target.value
        if (e.target.id ==="congratulationsMessage")
            editTrailAux.congratulationsMessage =e.target.value
        
        setEditTrail(editTrailAux)
        



    }
    

    

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sm={12}
                sx={{
                    marginTop: 8,
                    marginLeft: "-40%",
                    marginRight: "-40%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ListAltIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Nova Trilha de Aprendizagem
                    </Typography>
                    <Box component="form" ref={refForm}  onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        
                        
                        <Grid item xs={12} >
                            <TextField
                            required
                            fullWidth
                            name="trailName"
                            label="Nome da trilha"
                            id="trailName"
                            // autoComplete="given-name"
                            value={(editTrail)?editTrail.trailName: ""}
                            onChange={typing}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                            multiline
                            maxRows={5}
                            required
                            fullWidth
                            name="description"
                            label="Descrição"
                            id="description"
                            value={(editTrail)?editTrail.trailDescription: ""}
                            onChange={typing}
                            // autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                            multiline
                            maxRows={5}
                            required
                            fullWidth
                            name="congratulationsMessage"
                            label="Mensagem de parabenização"
                            id="congratulationsMessage"
                            value={(editTrail)?editTrail.congratulationsMessage: ""}
                            onChange={typing}
                            // autoComplete="given-name"
                            />
                        </Grid>
                        

                        <Grid item xs={12}>
                            <ComboBox trailFeatures={trailFeatures.levels}  defaultValue={(editTrail && editTrail.hasOwnProperty("difficultyLevel"))?trailFeatures.levels.map(e => e.label).indexOf(editTrail.difficultyLevel):0} ></ComboBox>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TransferList items={disponibleItems} choosedItems={choosedItems} setChoosedItems={setChoosedItems} onDragEnd={onDragEnd}></TransferList>
                        </Grid>
                        
                        {/* <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Nome"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <DraggableList items={state.choosedItems} onDragEnd={onDragEnd} />
                        </Grid> */}
                        
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                         {(mode==="edit")?"Editar Trilha":(mode==="copy"?"Criar uma Cópia":"Criar Nova Trilha")}
                        </Button>
                        
                    </Box>
                </Box>

                
                
                {/* <pre>
                        {JSON.stringify(
                            state.choosedItems.map(item => item, 'id', 'primary'),
                            null,
                            2
                        )}
                </pre> */}
                    {/* <Paper>
                        <DraggableList items={state.choosedItems} onDragEnd={onDragEnd} />
                    </Paper> */}
                    {/* <Paper >
                        <pre>
                        {JSON.stringify(
                            state.choosedItems.map(item => item, 'id', 'primary'),
                            null,
                            2
                        )}
                        </pre>
                    </Paper> */}
                
        </Container>
        </ThemeProvider>      
    );
}


export default NewExerciseTrail;
