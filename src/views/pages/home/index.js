

import { Container, createTheme, CssBaseline, Grid, List, Paper, styled, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import RankingItemsList from "../../../components/rankingItemsList";
import TrailController from "../../../controller/trailController";
import UsersController from "../../../controller/userController";

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

    let bestStudents = studentList.sort((a,b)=>{
        let quantA=0// a.hasOwnProperty("trailSolved")? a.trailSolved.length:0
        let quantB=0// b.hasOwnProperty("trailSolved")? b.trailSolved.length:0
        if (a.hasOwnProperty("trailSolved")){
            a.trailSolved.forEach(trailSolved => {
                console.log(trailSolved) 
                trailSolved.solutions.forEach(sulutions=>{
                    // Buscar pelo trail_id as dificuldades das listas
                    quantA+=1
                })
            })
        }

        if (b.hasOwnProperty("trailSolved")){
            b.trailSolved.forEach(trailSolved => {
                console.log(trailSolved) 
                trailSolved.solutions.forEach(sulutions=>{
                    // Buscar pelo trail_id as dificuldades das listas
                    quantB+=1
                })
            })
        }

        if (quantA===quantB)
            return 0
        if (quantA>quantB)
            return -1
        if (quantA<quantB)
            return 1
    })
    console.log("best Alunos")
    console.log(bestStudents)
    

    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div  style={{left:"0", right:"0px", position:"absolute"}}  >

            <Grid container spacing={1}  sx={{marginTop:"0px"}} >
                <Grid item xs >
                    <Grid container justifyContent="center" sx={{width:400,marginTop: 2}} >
                        <Typography component="h1" variant="h5">
                            Rankin Alunos
                        </Typography>
                    </Grid>
                    <List key={"student-list"} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {bestStudents.map((item,index,array)=>{
                            console.log("item")
                            console.log(`${item.firstName} ${item.lastName}`)
                            let fullName = `${item.firstName} ${item.lastName}`
                            
                           return <RankingItemsList index={index} primary={fullName} secondary="points" myKey="student-list"></RankingItemsList>
                        })}
                    </List>
                </Grid>
                <Grid item xs>
                    <Grid container justifyContent="center" sx={{width:400,marginTop: 2}} >
                        <Typography component="h1" variant="h5">
                            Rankin Professores
                        </Typography>
                    </Grid>
                    {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                         <RankingItemsList></RankingItemsList> 

                    </List> */}
                </Grid>
                <Grid item xs>
                    <Grid container justifyContent="center" sx={{width:400,marginTop: 2}} >
                        <Typography component="h1" variant="h5">
                            Rankin Trilhas
                        </Typography>
                    </Grid>
                    {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <RankingItemsList></RankingItemsList>
                    </List> */}
                </Grid>
            </Grid>
        </div>

        </Container>
    </ThemeProvider>    
    );


    
}

export default Home;
