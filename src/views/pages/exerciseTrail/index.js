

import React from "react";


// import {makeStyles} from "@mui/styles"
import UsersController from "../../../controller/userController";
import { DropResult } from 'react-beautiful-dnd';
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Container, createTheme, CssBaseline, Grid, IconButton, ImageList, Pagination, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import TrailController from "../../../controller/trailController";
import { stringAvatar } from "../../../controller/utilsController";
import {getWindowDimensions} from "../../../services/windowDimensions";
import trailFeatures from "../../../data/trailFeatures.json"
import { ComboBox } from "../../../components/comboBox";
import { ErrorAlert } from "../../../components/alerts";
import { useParams } from "react-router";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { CircularProgressWithIcon } from "../../../components/circularProgress";

const theme = createTheme();



const pageSize=10
let difficultyLevels  = [...trailFeatures.levels]
difficultyLevels.push({"label":"Todos os Níveis","level":5})

const ShowTrailExercises = (props) =>{
    const {param} = useParams()
    console.log(param)
    console.log("exercise")
    let SelectedTrail = TrailController.getTrail(param)
    let userData = UsersController.getUserData(props.state.session.email)
    // if(props.state.selectedExercises.lenght===0) props.setSelectedExercises([...trail.exercisesTrail])
    let state = props.state
    // console.log(userData)
    // console.log(props.state.session.email)
    let paginationClick= props.paginationClick
    
    // console.log(SelectedTrail)
    if (!SelectedTrail){
        // window.location.href = "/notfound"
        return <>ERRO TRILHA NAO ENCONTRADA</>
    }
    // props.trailRef(trail);

    const enableCardsVerify=(index)=>{
        // console.log(`${props.index}===${index}`)
        if (!userData.hasOwnProperty("trailSolved") ){
            return -2
        }
        
        
        
        console.log("userData.trailSolved") 
        console.log(userData.trailSolved) 
        console.log(SelectedTrail) 
        console.log(index) 
        let find=-2
        userData.trailSolved.forEach((element,elementIndex) => {
            if ((element.trail_id===SelectedTrail.id) && index<=element.qtdSolved ) find = element.qtdSolved
        });

        // userData.trailSolved

        return find
    }
    
    const EnableCards=(props)=>{
        let qtdSolved = enableCardsVerify(props.index)
        if ( qtdSolved !==-2  || props.index===0 )
            return(<>
            
            <CardActionArea href={`/exercise/${SelectedTrail.id}-${props.index}-${props.exercise.id}`}  sx={{ width: "100%",
                    height: "100%" }}   key={`${(props.exercise.id+1)}`} >
                        {/* <CardMedia
                            component="img"
                            alt="Contemplative Reptrail"
                            height="160"
                            image={"" + trail.img}
                            title="Contemplative Reptrail"
                            
                        /> disabled={true} */}
                        {/* <IconButton sx={{ p: 0,alignContent:"center" }}> */}
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            // style={{ minHeight: '100vh' }}
                            >
                            <Grid item xs={3}>
                                <Avatar {...stringAvatar(SelectedTrail.creatorTrail.firstName +' '+ SelectedTrail.creatorTrail.lastName)} src="/static/images/avatar/5.jpg" />
                            </Grid>
                        </Grid>
                        {/* </IconButton> */}
                        <CardContent>
                        <Typography gutterBottom variant="title" component="h2" >
                            {props.exercise.title}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="h3" >
                            {props.exercise.description}
                        </Typography>
                        {/* <Typography gutterBottom variant="body2" component="h4" align="right" >
                            {trail.difficultyLevel}
                        </Typography> */}
                        </CardContent>
                         
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="flex-end"
                            justify="center"
                            height={"100%"}
                            
                            // style={{ minHeight: '100vh' }}
                            >
                            <Grid item xs={3}>
                                {((props.index <qtdSolved))?<TaskAltIcon color="success"  />:<RadioButtonUncheckedIcon color="warning"></RadioButtonUncheckedIcon>}
                            </Grid>
                        </Grid>
                    </CardActionArea>
                    </>)

        return(<CardActionArea href={`/exercise/${SelectedTrail.id}-${props.index}-${props.exercise.id}`}  sx={{ width: "100%",
                height: "100%",background:"rgb(235,235,235)" }} disabled={true}  key={`${(props.exercise.id+1)}`} >
                    {/* <CardMedia
                        component="img"
                        alt="Contemplative Reptrail"
                        height="160"
                        image={"" + trail.img}
                        title="Contemplative Reptrail"
                        
                    /> disabled={true} */}
                    {/* <IconButton sx={{ p: 0,alignContent:"center" }}> */}
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        // style={{ minHeight: '100vh' }}
                        >
                        <Grid item xs={3}>
                            <Avatar {...stringAvatar(SelectedTrail.creatorTrail.firstName +' '+ SelectedTrail.creatorTrail.lastName)} src="/static/images/avatar/5.jpg" />
                        </Grid>
                    </Grid>
                    {/* </IconButton> */}
                    <CardContent>
                    <Typography gutterBottom variant="title" component="h2" >
                        {props.exercise.title}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="h3" >
                        {props.exercise.description}
                    </Typography>
                    {/* <Typography gutterBottom variant="body2" component="h4" align="right" >
                        {trail.difficultyLevel}
                    </Typography> */}
                    </CardContent>
                </CardActionArea>)
        // userData.trailSolved

        
    }
    let qtdSolved = (enableCardsVerify(-1)<0)?0:enableCardsVerify(-1)
    let totalSolved=parseInt((qtdSolved/SelectedTrail.exercisesTrail.length)*100)
    if (totalSolved===100)
        alert("PARABENS voce concluiu a trilha")
        
    return (<>
    <CircularProgressWithIcon value={totalSolved}/>
    <Grid container justifyContent="center" sx={{width:400,marginTop: 2}} >
        <Typography component="h1" variant="h5">
            {SelectedTrail.trailName}
        </Typography>
    </Grid>
    <Grid container justifyContent="flex-start" sx={{width:400,marginTop: 2}} >
        <Typography component="h2" variant="body2">
            {SelectedTrail.trailDescription}
        </Typography>
    </Grid>
    <Grid container justifyContent="flex-end" sx={{width:400,marginTop: 2}} >
        <Typography component="h4" variant="body2">
            {SelectedTrail.difficultyLevel}
        </Typography>
    </Grid>
   
                          
                                
    <Box
        // sm={12}
        sx={{
            position: 'absolute',
            marginTop: 0,
            left: 10,
            right: 10,
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
        }}
        >
        <ImageList sx={{ width: "100%",
                height: "auto",
            }} spacing={1} cols={Math.trunc((state.dimensionPage.width/400))} >
            {SelectedTrail.exercisesTrail.map((exercise,index) => {if ((index>=((state.pagination-1)*pageSize)) && (index<(state.pagination*pageSize))) return(
                // <></>
            <Card key={`key-${(exercise.id+1)}`} sx={{
                maxWidth: 500,
                height: "100%"
            }}  >
                <EnableCards exercise={exercise} index ={index}></EnableCards>
            </Card>
            )
            return (null)
            })}
        </ImageList>
        <Grid
            container
            spacing={0}
            marginBottom={15}
            direction="column"
            alignItems="center"
            justify="center"
            // style={{ minHeight: '100vh' }}
            >
            <Grid item xs={3}>
                <Stack spacing={2}  >
                    <Pagination count={10} variant="outlined" color="secondary" align="center" onClick={paginationClick} />
                </Stack>
            </Grid>
        </Grid>
    </Box>
</>)
}

class ExerciseTrail extends React.Component{
    
    constructor(props){
        super(props);
        // console.log(props)
        
        const data= UsersController.getSession(); 
        const initialSize=getWindowDimensions()
        

        console.log("alertControll")
        console.log(props.alertControll)
        this.difficultyLevels =difficultyLevels
        this.alertControll = props.alertControll
        

        this.state={
            session:{
                ...data
            },
            selectedExercises:[],
            dimensionPage:initialSize,
            pagination: 1
        }

        
        window.addEventListener('resize', this.resizePage);
        
    }

    
    setSelectedExercises(exercises){
        this.setState({selectedExercises :exercises }) 
    }


    resizePage=()=>{
        const windowSize=getWindowDimensions()
        this.setState({dimensionPage :windowSize }) 
    }
    paginationClick =(event)=>{
        console.log(this.state.selectedExercises)
        console.log(event.target.innerText)
        if (event.target.getAttribute("data-testid")==="NavigateNextIcon"){
            this.setState({pagination : (this.setState.pagination +1)})
            // return
        }
        console.log(this.state.selectedExercises)
        if (event.target.getAttribute("data-testid")==="NavigateBeforeIcon"){
            this.setState({pagination : (this.setState.pagination -1)})
            // return
        }
        console.log(this.state.selectedExercises)
        if (Math.trunc(event.target.innerText)){
            this.setState({pagination : Math.trunc(event.target.innerText)})
            // return
        }
        console.log(this.state.selectedExercises)
        
    }
   
    
    render() {

        // const { studentId } = useParams();

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                
                <ShowTrailExercises  state={this.state} paginationClick={this.paginationClick} resizePage={this.resizePage} setSelectedExercises={this.setSelectedExercises}></ShowTrailExercises>
                </Container>
            </ThemeProvider>      
        );
    }
}

export default ExerciseTrail;
