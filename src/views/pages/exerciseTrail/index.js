

import React from "react";


// import {makeStyles} from "@mui/styles"
import UsersController from "../../../controller/userController";
import { DropResult } from 'react-beautiful-dnd';
import { Card, CardActionArea, CardContent, CardMedia, Container, createTheme, CssBaseline, ImageList, ThemeProvider, Typography } from "@mui/material";
import TrailController from "../../../controller/trailController";




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

const tileData = [
    {
      img:
        "https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg",
      title: "title"
    },
    {
      img:
        "https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg",
      title: "title"
    }]


class ExerciseTrail extends React.Component{
    
    constructor(props){
        super(props);
        console.log(props)
        let listTrails = TrailController.getTrailList()
        const data= UsersController.getSession(); 
        this.state={
            session:{
                ...data
            },
            listTrails:listTrails
        }
        
         
    }
    
   
    
    render() {

        // const { studentId } = useParams();

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <ImageList sx={{ width: "100%",
                    height: "auto"}} spacing={3}>
                    {this.state.listTrails.map((trail,index) => (
                        // <></>
                    <Card key={index+1}>
                        <CardActionArea>
                            {/* <CardMedia
                                component="img"
                                alt="Contemplative Reptrail"
                                height="160"
                                image={"" + trail.img}
                                title="Contemplative Reptrail"
                                
                            /> */}
                            <CardContent>
                            <Typography gutterBottom variant="title" component="h2" noWrap>
                                {trail.trailName}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="h2" >
                                {trail.trailDescription}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    ))}
                </ImageList>
            </Container>
            </ThemeProvider>      
        );
    }
}

export default ExerciseTrail;
