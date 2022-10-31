

import React from "react";


// import {makeStyles} from "@mui/styles"
import UsersController from "../../../controller/userController";
import { DropResult } from 'react-beautiful-dnd';
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, createTheme, CssBaseline, Grid, IconButton, ImageList, Pagination, Stack, ThemeProvider, Typography } from "@mui/material";
import TrailController from "../../../controller/trailController";
import { stringAvatar } from "../../../controller/utilsController";
import {getWindowDimensions} from "../../../services/windowDimensions";
import trailFeatures from "../../../data/trailFeatures.json"
import { ComboBox } from "../../../components/comboBox";
import { ErrorAlert } from "../../../components/alerts";
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import _ from "lodash"

const theme = createTheme();

// const useStyles = makeStyles((theme) => ({
//     root: {
//       "& > *": {
//         margin: theme.spacing(1),
//         width: "25ch"
//       }
//     },
//     gridList: {
//       width: "100%",
//       height: "auto"
//     },
//     card: {
//       maxWidth: 350,
//       height: "100%"
//     }
//   }));

const pageSize=10
let difficultyLevels  = [...trailFeatures.levels]
difficultyLevels.push({"label":"Todos os Níveis","level":5})

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

class ListExerciseTrail extends React.Component{
    
    constructor(props){
        super(props);
        // console.log(props)
        this.listTrails = TrailController.getTrailList()
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
            selectedTrails:this.listTrails,
            dimensionPage:initialSize,
            pagination: 1,
            selectedLevel:null
        }

        
        window.addEventListener('resize', this.resizePage);
        
    }

    filterByLevel=(level)=>{
        if(!level) return
        if (level === "Todos os Níveis"){
            this.setState({selectedTrails:this.listTrails})
            return
        }
        
        let filtred = this.listTrails.filter((element)=>{
            console.log(element.difficultyLevel)
            console.log(`${element.difficultyLevel} === ${level}`)
            console.log(element.difficultyLevel === level)
            if (element.difficultyLevel === level)
                return true
            return false
        })
        
        if (filtred.length ===0)
            this.alertControll.changeAlert(<ErrorAlert closeAlert= {this.alertControll.closeAlert} message= "Não foi encontrado trilhas com este nível de dificuldade" ></ErrorAlert>)    
        //window.alert("Não foi encontrado trilhas com este nível de dificuldade")
        
        this.setState({selectedTrails:filtred})
        

    }
    selectLevel = (event)=>{
        console.log(event.target.value)
        this.filterByLevel(event.target.value)
    }


    resizePage=()=>{
        const windowSize=getWindowDimensions()
        this.setState({dimensionPage :windowSize }) 
    }
    paginationClick =(event)=>{
        console.log(this.state.selectedTrails)
        console.log(event.target.innerText)
        if (event.target.getAttribute("data-testid")==="NavigateNextIcon"){
            this.setState({pagination : (this.setState.pagination +1)})
            // return
        }
        console.log(this.state.selectedTrails)
        if (event.target.getAttribute("data-testid")==="NavigateBeforeIcon"){
            this.setState({pagination : (this.setState.pagination -1)})
            // return
        }
        console.log(this.state.selectedTrails)
        if (Math.trunc(event.target.innerText)){
            this.setState({pagination : Math.trunc(event.target.innerText)})
            // return
        }
        console.log(this.state.selectedTrails)
        
    }
    deleteTrail=(e)=>{
        console.log(e.currentTarget.id)
        if (!window.confirm("Tem certeza que deseja apagar? \nEsta Ação nao pode ser desfeita!")) 
            return
        
        let delString = e.currentTarget.id.split("-")[0]
        let delId = parseInt( e.currentTarget.id.split("-")[1])
        if (delString!=="delete")
            return
        let trailToBeDeleted = TrailController.getTrail(delId)

        if (trailToBeDeleted.creatorTrail.id!== this.state.session.id)
            return
        TrailController.removeTrail(delId)
        // console.log(trailToBeDeleted)
        // console.log(this.state.selectedTrails)
        // console.log(not(this.state.selectedTrails,[trailToBeDeleted]))
        this.setState({selectedTrails:not(this.state.selectedTrails,[trailToBeDeleted])})

        // if (trailToBeDeleted)

    }
    BottonsModifyTrail(trail){

        if (this.state.session.isteacher){

            if (this.state.session.id === trail.creatorTrail.id){
                return (
                <Stack spacing={2} direction="row"  justifyContent="flex-end" >
                    <IconButton aria-label="visualize" color="inherit" href={`/exercisetrail/${trail.id}`}>
                        <VisibilityIcon  />
                    </IconButton>
                    <IconButton aria-label="edit" color="secondary" href={`/newExerciseTrail/${trail.id}-edit`}>
                        <EditIcon  />
                    </IconButton>
                    <IconButton aria-label="copy" color="info" href={`/newExerciseTrail/${trail.id}-copy`}>
                        <FileCopyIcon  />
                    </IconButton>
                    
                    <IconButton aria-label="delete" color="error" id={`delete-${trail.id}`} onClick={this.deleteTrail} >
                        <DeleteIcon  />
                    </IconButton>
                </Stack>)
            }else{
                return (
                    <Stack spacing={2} direction="row"  justifyContent="flex-end">
                        <IconButton aria-label="visualize" color="inherit" href={`/exercisetrail/${trail.id}`}>
                            <VisibilityIcon  />
                        </IconButton>
                        <IconButton aria-label="copy" color="info" href={`/newExerciseTrail/${trail.id}-copy`}>
                            <FileCopyIcon  />
                        </IconButton>

                    </Stack>)
            }
            }
        return null
            
    }
    
    MyCardContent(trail){
        return(
            <>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    // style={{ minHeight: '100vh' }}
                    >
                    <Grid item xs={3}>
                        <Avatar {...stringAvatar(trail.creatorTrail.firstName +' '+ trail.creatorTrail.lastName)} src="/static/images/avatar/5.jpg" />
                    </Grid>
                </Grid>
                
                <CardContent>
                <Typography gutterBottom variant="title" component="h2" align="center"  >
                    {trail.trailName}
                </Typography>
                <Typography gutterBottom variant="body2" component="h3" noWrap>
                    {`Nível: ${trail.difficultyLevel}`}
                </Typography>
                <Typography gutterBottom variant="body2" component="h3" noWrap>
                    {`Criador: ${trail.creatorTrail.firstName} ${trail.creatorTrail.lastName}`}
                </Typography>
                <Typography gutterBottom variant="body2" component="h3" >
                    {trail.trailDescription}
                </Typography>
                <Typography gutterBottom variant="body2" component="h4" align="right" >
                    {`${trail.exercisesTrail.length} exercícios`}
                </Typography>
                </CardContent>
                {this.BottonsModifyTrail(trail)}
            </>
        )
    }
    
    render() {
        
        // const { studentId } = useParams();

        if (this.state.session.id ===-1){
            window.location.href = "/login"
            return <></>
        }
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography gutterBottom variant="title" component="h1" align="center" sx={{width:400,marginTop: 2}} >
                    Trilhas de exercício
                </Typography>
                <Grid container justifyContent="flex-end" sx={{width:400,marginTop: 2}} >
                    <ComboBox trailFeatures={this.difficultyLevels} onSelect={this.selectLevel} defaultValue={this.difficultyLevels.length-1} ></ComboBox>
                </Grid>
                {this.state.session.isteacher?<>
                    <Stack spacing={2} direction="row"  justifyContent="flex-end" sx={{width:400,marginTop: 1}}>
                        <Button variant="outlined" href="/newExerciseTrail">Criar Nova Trilha</Button>
                    </Stack>
                 </>:null}
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
                    }} spacing={1} cols={Math.trunc((this.state.dimensionPage.width/400))} >
                    {this.state.selectedTrails.map((trail,index) => {if ((index>=((this.state.pagination-1)*pageSize)) && (index<(this.state.pagination*pageSize))) return(
                        // <></>
                    <Card key={`key-${(trail.id+1)}`} sx={{
                        maxWidth: 500,
                        height: "100%"
                      }}>
                        {
                            this.state.session.isteacher?
                        <CardContent  href={this.state.session.isteacher?null:`/exercisetrail/${trail.id}`}  sx={{ width: "100%",
                        height: "100%"}} key={`${(trail.id+1)}`}>
                            {/* <CardMedia
                                component="img"
                                alt="Contemplative Reptrail"
                                height="160"
                                image={"" + trail.img}
                                title="Contemplative Reptrail"
                                
                            /> */}
                            {/* <IconButton sx={{ p: 0,alignContent:"center" }}> */}
                        
                            {this.MyCardContent(trail)}
                        </CardContent>
                        :
                        <CardActionArea  href={this.state.session.isteacher?null:`/exercisetrail/${trail.id}`}  sx={{ width: "100%",
                        height: "100%"}} key={`${(trail.id+1)}`}>
                            {/* <CardMedia
                                component="img"
                                alt="Contemplative Reptrail"
                                height="160"
                                image={"" + trail.img}
                                title="Contemplative Reptrail"
                                
                            /> */}
                            {/* <IconButton sx={{ p: 0,alignContent:"center" }}> */}
                        
                            {this.MyCardContent(trail)}
                        </CardActionArea>
                        }
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
                            <Pagination count={Math.ceil(this.state.selectedTrails.length/pageSize)} variant="outlined" color="secondary" align="center" onClick={this.paginationClick} />
                        </Stack>
                     </Grid>
                </Grid>
                </Box>
            </Container>
            </ThemeProvider>      
        );
    }
}

export default ListExerciseTrail;
