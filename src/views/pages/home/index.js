

import { Container, createTheme, CssBaseline, Grid, List, Paper, styled, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import RankingItemsList from "../../../components/rankingItemsList";
import TrailController from "../../../controller/trailController";
import UsersController from "../../../controller/userController";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Home(props){
    
    let usersData = UsersController.getAllUsersData()
    let trailList = TrailController.getTrailList()

    console.log(usersData)
    let teacherList = usersData.filter((element)=>element.isteacher)
    let studentList = usersData.filter((element)=>!element.isteacher)
    console.log(teacherList)
    console.log(studentList)
    // let teacher_data = users_data.filter((element)=>)
    console.log("list")
    console.log(trailList)
    studentList = studentList.map((value,index,array)=>{
        let quant = 0
        if (value.hasOwnProperty("trailSolved")){
            value.trailSolved.forEach(trailSolved => {
                console.log(trailSolved) 
                trailSolved.solutions.forEach(sulutions=>{
                    // Buscar pelo trail_id as dificuldades das listas
                    quant+=1
                })
            })
        }
        value["points"] = quant
        return value
    })
    console.log("studentList")
    console.log(studentList)

    let bestStudents = studentList.sort((a,b)=>{
       
        if (a.points===b.points)
            return 0
        if (a.points>b.points)
            return -1
        if (a.points<b.points)
            return 1
    })
    console.log("best Alunos")
    console.log(bestStudents)
    

    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div  style={{left:"0", right:"0px", position:"absolute"}}  >

            
                <Grid container  xs  justifyContent="flex-end" >
                    <Grid  container justifyContent="center"  sx={{width:400, marginTop: 2}} >
                        <Typography component="h1"  variant="h5">
                        <EmojiEventsIcon sx={{ color: "rgb(240,201,100)" }} fontSize="large" /> Alunos
                        </Typography>
                    
                        <List key={"student-list"} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {bestStudents.map((item,index,array)=>{
                                console.log("item")
                                console.log(`${item.firstName} ${item.lastName}`)
                                let fullName = `${item.firstName} ${item.lastName}`
                                
                            return <RankingItemsList index={index} primary={fullName} secondary={`${item.points} pontos`} myKey="student-list"></RankingItemsList>
                            })}
                        </List>
                    </Grid>
                </Grid>
                {/* <Grid item xs>
                    <Grid container justifyContent="center" sx={{width:400,marginTop: 2}} >
                        <Typography component="h1" variant="h5">
                            Rankin Professores
                        </Typography>
                    </Grid>
                     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                         <RankingItemsList></RankingItemsList> 

                    </List> 
                </Grid>
                <Grid item xs>
                    <Grid container justifyContent="center" sx={{width:400,marginTop: 2}} >
                        <Typography component="h1" variant="h5">
                            Rankin Trilhas
                        </Typography>
                    </Grid>
                     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <RankingItemsList></RankingItemsList>
                    </List> 
                </Grid> */}
            
        </div>

        </Container>
    </ThemeProvider>    
    );


    
}

export default Home;
