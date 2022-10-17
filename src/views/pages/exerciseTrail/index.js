

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
import { SuccessAlert } from "../../../components/alerts";
import { useParams } from "react-router";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { CircularProgressWithIcon } from "../../../components/circularProgress";
import { Crib } from "@mui/icons-material";
import SucessAlertDialogSlide from "../../../components/userDialogue";

const theme = createTheme();



const pageSize=10
let difficultyLevels  = [...trailFeatures.levels]
difficultyLevels.push({"label":"Todos os Níveis","level":5})

function ExerciseTrail(props){
    const {param} = useParams()
    console.log(param)
    console.log("exercise")
    const [sessionData, setSessionData] = React.useState(UsersController.getSession());
    
    const [selectedTrail,setSelectedTrail]=React.useState(TrailController.getTrail(param))

    
    const [dimensionPage,setDimensionPage]=React.useState(getWindowDimensions())
    
    const [pagination, setPagination] = React.useState(1);
    console.log("selectedTrail")
    console.log(selectedTrail)
    

    if (sessionData.id ===-1){
        window.location.href = "/login"
        return <></>
    }
    
    if (!selectedTrail){
        window.location.href = "/exercisetrail"
        return <></>
    }

    let userData = UsersController.getUserData(sessionData.email)
    // let difficultyLevels = difficultyLevels
    let alertControll = props.alertControll
    
    var doit;
    window.onresize = function(){
        clearTimeout(doit);
        doit = setTimeout(resizePage, 200);
    };

    // window.addEventListener('resize', resizePage);

    let qtdSolved = (enableCardsVerify(-1)<0)?0:enableCardsVerify(-1)
    let totalSolved=parseInt((qtdSolved/selectedTrail.exercisesTrail.length)*100)
    let exercisePoints = parseInt(100/(selectedTrail.exercisesTrail.length))

    if (totalSolved===100){
        alertControll.changeAlert(<SuccessAlert  message= "PARABENS voce concluiu esta trilha" ></SuccessAlert>)    
    }
        // alert("PARABENS voce concluiu a trilha")

    function resizePage(){
        const windowSize=getWindowDimensions()
        setDimensionPage(windowSize) 
    }
    function paginationClick (event){
        
        console.log(event.target.innerText)
        if (event.target.getAttribute("data-testid")==="NavigateNextIcon"){
            setPagination( pagination +1)
            return
        }
        
        if (event.target.getAttribute("data-testid")==="NavigateBeforeIcon"){
            setPagination( pagination -1)
            return
        }
        
        if (Math.trunc(event.target.innerText)){
            setPagination(Math.trunc(event.target.innerText))
            return
        }
    }

    function enableCardsVerify(index){
        // console.log(`${props.index}===${index}`)
        if (!userData.hasOwnProperty("trailSolved") ){
            return -2
        }
        
        
        
        console.log("userData.trailSolved") 
        console.log(userData.trailSolved) 
        console.log(selectedTrail) 
        console.log(index) 
        let find=-2
        userData.trailSolved.forEach((element,elementIndex) => {
            if ((element.trail_id===selectedTrail.id) && index<=element.qtdSolved ) find = element.qtdSolved
        });

        // userData.trailSolved

        return find
    }
    
    const EnableCards=(props)=>{
        let qtdSolved = enableCardsVerify(props.index)
        if ( qtdSolved !==-2  || props.index===0 )
            return(<>
            
            <CardActionArea href={`/exercise/${selectedTrail.id}-${props.index}-${props.exercise.id}`}  sx={{ width: "100%",
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
                            <Avatar sx={{bgcolor: 'primary.main'}} children={`${(props.index+1)}`}  src="/static/images/avatar/5.jpg" />
                            </Grid>
                        </Grid>
                        {/* </IconButton> */}
                        <CardContent>
                        <Typography gutterBottom variant="title" component="h2" >
                            {`${props.exercise.title}`}
                        </Typography>
                        {/* <Typography gutterBottom variant="body2" component="h3" >
                            {props.exercise.description}
                        </Typography> */}
                        {/* <Typography gutterBottom variant="body2" component="h4" align="right" >
                            {trail.difficultyLevel}
                        </Typography> */}
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
                                <Avatar sx={{bgcolor: "rgb(240,201,100)", width: 56, height: 56 }} children={`+${exercisePoints}p`}  src="/static/images/avatar/5.jpg" />
                            </Grid>
                        </Grid>
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

        return(<CardActionArea href={`/exercise/${selectedTrail.id}-${props.index}-${props.exercise.id}`}  sx={{ width: "100%",
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
                        <Avatar sx={{bgcolor: 'secondary.main'}} children={`${(props.index+1)}`}  src="/static/images/avatar/5.jpg" />
                        </Grid>
                    </Grid>
                    {/* </IconButton> */}
                    <CardContent>
                    <Typography gutterBottom variant="title" component="h2" >
                        {`${props.exercise.title}`}
                    </Typography>
                    {/* <Typography gutterBottom variant="body2" component="h3" >
                        {props.exercise.description}
                    </Typography> */}
                    {/* <Typography gutterBottom variant="body2" component="h4" align="right" >
                        {trail.difficultyLevel}
                    </Typography> */}
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
                            <Avatar sx={{bgcolor: "rgb(240,201,100)", width: 56, height: 56 }} children={`+${exercisePoints}p`}  src="/static/images/avatar/5.jpg" />
                        </Grid>
                    </Grid>
                        
                    </CardContent>
                </CardActionArea>)
        // userData.trailSolved

        
    }
    
    const ShowTrailExercises = (props) =>{
        let selectedTrail = props.selectedTrail
        let sessionData= props.sessionData
        let pagination= props.pagination
        let dimensionPage= props.dimensionPage
        let paginationClick= props.paginationClick
        
        // if(props.selectedExercises.lenght===0) props.setSelectedExercises([...trail.exercisesTrail])
        // console.log(userData)
        // console.log(props.sessionData.email)
        
        // console.log(selectedTrail)
        if (!selectedTrail){
            // window.location.href = "/notfound"
            return <>ERRO TRILHA NAO ENCONTRADA</>
        }
        // props.trailRef(trail);

            
        return (<>
        <CircularProgressWithIcon value={props.totalSolved}/>
        <Grid container justifyContent="center" sx={{width:400,marginTop: 2}} >
            <Typography component="h1" variant="h5">
                {selectedTrail.trailName}
            </Typography>
        </Grid>
        <Grid container justifyContent="flex-start" sx={{width:400,marginTop: 2}} >
            <Typography component="h2" variant="body2">
                {selectedTrail.trailDescription}
            </Typography>
        </Grid>
        <Grid container justifyContent="flex-end" sx={{width:400,marginTop: 2}} >
            <Typography component="h4" variant="body2">
                {selectedTrail.difficultyLevel}
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
                }} spacing={1} cols={Math.trunc((dimensionPage.width/400))} >
                {selectedTrail.exercisesTrail.map((exercise,index) => {if ((index>=((pagination-1)*pageSize)) && (index<(pagination*pageSize))) return(
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

    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            {totalSolved===100?<SucessAlertDialogSlide enable={true} title={"Parabens!!!"} message={selectedTrail.congratulationsMessage}/>:<></>}
            <ShowTrailExercises  totalSolved={totalSolved} selectedTrail={selectedTrail} sessionData={sessionData} pagination={pagination}   dimensionPage={dimensionPage} paginationClick={paginationClick} resizePage={resizePage} ></ShowTrailExercises>
            </Container>
        </ThemeProvider>      
    );
    
}

export default ExerciseTrail;
