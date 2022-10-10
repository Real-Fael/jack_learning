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
  
//   const useStyles = makeStyles({
//     flexPaper: {
//       flex: 1,
//       margin: 16,
//       minWidth: 350
//     },
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap'
//     }
//   });


function ComboBox(props) {
    return (
      <Autocomplete
        aria-required={true}
        defaultValue={props.trailFeatures[0]}
        disablePortal
        id="combo-box-demo"
        options={props.trailFeatures}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Nível" />}
      />
    );
  }

class NewExerciseTrail extends React.Component{
    
    constructor(props){
        super(props);
        console.log(props)
        let exerciseList= ExerciseController.getExerciseList()
        console.log("exerciseList")
        console.log(exerciseList)
        const data= UsersController.getSession(); 
        this.state={
            session:{
                ...data
            },
            disponibleItems: exerciseList,//getItems(10),
            choosedItems:[]//getItems(1)

        }
        // const classes = useStyles();
        // console.log(data)
        
    }
    setItems = (newItems) => {
        
        this.setState({choosedItems:newItems})
    }
    onDragEnd = (onDragEndProps) => {
        // dropped outside the list
        console.log(onDragEndProps)
        if (!onDragEndProps.destination) return;
    
        const newItems = reorder(this.state.choosedItems, onDragEndProps.source.index, onDragEndProps.destination.index);
    
        this.setItems(newItems);
      };
    
    render() {

        // const { studentId } = useParams();

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
                        <Box component="form" ref={this.refForm}  onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                            
                            
                            <Grid item xs={12} >
                                <TextField
                                required
                                fullWidth
                                name="trailName"
                                label="Nome da trilha"
                                id="trailName"
                                autoComplete="given-name"
                                />
                            </Grid>
                            

                            <Grid item xs={12}>
                                <ComboBox trailFeatures={trailFeatures.levels}></ComboBox>
                            </Grid>
                            
                            <Grid item xs={12}>
                             <TransferList items={this.state.disponibleItems} choosedItems={this.state.choosedItems} setChoosedItems={this.setItems} onDragEnd={this.onDragEnd}></TransferList>
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
                            <DraggableList items={this.state.choosedItems} onDragEnd={this.onDragEnd} />
                            </Grid> */}
                            
                            </Grid>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Criar Nova Trilha
                            </Button>
                            
                        </Box>
                    </Box>

                    
                    
                    {/* <pre>
                            {JSON.stringify(
                                this.state.choosedItems.map(item => item, 'id', 'primary'),
                                null,
                                2
                            )}
                    </pre> */}
                        {/* <Paper>
                            <DraggableList items={this.state.choosedItems} onDragEnd={this.onDragEnd} />
                        </Paper> */}
                        {/* <Paper >
                            <pre>
                            {JSON.stringify(
                                this.state.choosedItems.map(item => item, 'id', 'primary'),
                                null,
                                2
                            )}
                            </pre>
                        </Paper> */}
                    
            </Container>
            </ThemeProvider>      
        );
    }
}

export default NewExerciseTrail;
