

import React, { memo } from "react";
import MyBlocklyEditor from "../../../components/blockEditor";
import "./index.css"
import test from "../../../data/blocklyPalette.json"
import BlocklyExecControll from "../../../components/blocklyExecControll";
import { createTheme, ThemeProvider,Container,CssBaseline } from '@mui/material';

const theme = createTheme();
class Exercise extends React.Component{


    render() {

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
            <div className="exercise" >
               
               
                    <div className="column describe">
                        <h1>Exercicio1</h1>
                        <p>Qui aute reprehenderit laboris laborum ipsum tempor tempor voluptate id adipisicing incididunt tempor incididunt excepteur. Nisi anim exercitation proident voluptate. Eu ipsum et dolore qui esse ad duis in ipsum aliqua deserunt commodo.</p>
                    
                        <h3>Entrada</h3>
                        <h3>Saida</h3>
                    </div>
                    <div  className="workSpace">
                        <BlocklyExecControll toolBox={test} />

                    </div>
                
                
            </div>
            </Container>
            </ThemeProvider>      
        );
    }
}

export default Exercise;
