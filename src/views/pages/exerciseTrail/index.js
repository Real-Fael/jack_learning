

import React from "react";


// import {makeStyles} from "@mui/styles"
import UsersController from "../../../controller/userController";
import { DropResult } from 'react-beautiful-dnd';
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Container, createTheme, CssBaseline, Grid, IconButton, ImageList, Pagination, Stack, ThemeProvider, Typography } from "@mui/material";
import TrailController from "../../../controller/trailController";
import { stringAvatar } from "../../../controller/utilsController";
import {getWindowDimensions} from "../../../services/windowDimensions";
import trailFeatures from "../../../data/trailFeatures.json"
import { ComboBox } from "../../../components/comboBox";
import { ErrorAlert } from "../../../components/alerts";


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


class ExerciseTrail extends React.Component{
    
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
   
    
    render() {

        // const { studentId } = useParams();

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <Grid container justifyContent="flex-end" sx={{width:400,marginTop: 2}} >
                        <ComboBox trailFeatures={this.difficultyLevels} onSelect={this.selectLevel} defaultValue={this.difficultyLevels.length-1} ></ComboBox>
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
                    }} spacing={1} cols={Math.trunc((this.state.dimensionPage.width/400))} >
                    {this.state.selectedTrails.map((trail,index) => {if ((index>=((this.state.pagination-1)*pageSize)) && (index<(this.state.pagination*pageSize))) return(
                        // <></>
                    <Card key={`key-${(trail.id+1)}`} sx={{
                        maxWidth: 500,
                        height: "100%"
                      }}>
                        <CardActionArea href="/exercisetrail"  sx={{ width: "100%",
                        height: "100%"}} key={`${(trail.id+1)}`}>
                            {/* <CardMedia
                                component="img"
                                alt="Contemplative Reptrail"
                                height="160"
                                image={"" + trail.img}
                                title="Contemplative Reptrail"
                                
                            /> */}
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
                                    <Avatar {...stringAvatar(trail.creatorTrail.firstName +' '+ trail.creatorTrail.lastName)} src="/static/images/avatar/5.jpg" />
                                </Grid>
                            </Grid>
                            {/* </IconButton> */}
                            <CardContent>
                            <Typography gutterBottom variant="title" component="h2" noWrap>
                                {trail.trailName}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="h3" >
                                {trail.trailDescription}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="h4" align="right" >
                                {trail.difficultyLevel}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
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
                            <Pagination count={10} variant="outlined" color="secondary" align="center" onClick={this.paginationClick} />
                        </Stack>
                     </Grid>
                </Grid>
                </Box>
            </Container>
            </ThemeProvider>      
        );
    }
}

export default ExerciseTrail;
