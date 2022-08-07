import React  from 'react';
// import { BlocklyWorkspace } from 'react-blockly';
import Blockly from 'blockly'
import './index.css'
import MyBlocklyEditor from '../blockEditor';
import ReadBySep from '../../services/inputTextService';
//import {Interpreter} from "js-interpreter"
//import test from "../../data/blocklyPalette.json"

import "../customBlocks/customBlocks"
import Grid from '@material-ui/core/Grid/Grid';
import Box from '@material-ui/core/Box/Box';
import styled from '@material-ui/core/styles/styled';
import { Paper } from '@material-ui/core';
import test from "../../data/blocklyPalette.json"
import getWindowDimensions from '../../services/windowDimensions';



class BlocklyExecControll extends React.Component{


  constructor(props){
    super(props);
    //console.log(props)
    
    // this.myToolBox = props.toolBox;
    this.myToolBox = test;
    // const { height, width } = getWindowDimensions();
    
    this.state ={
      xml:'',
      // windowSize: {height,width}
    }
    this.dataInput = React.createRef()
    this.dataOutput = React.createRef()
    //this.BlocklyEditor = React.createRef()
    const func= {
      getXML:this.getXML,
      setInput:this.setInput,
      getOutput:this.getOutput,
      executeXML: this.execCode
    }
    if (props.updateActions)
      props.updateActions(func)
    console.log(props.updateActions)

    //delete
    this.exerciseData = props.exerciseData
    this.sendSolution = props.sendSolution
  }

  getOutput = () =>{
    return this.dataOutput.current.value
  }
  setInput = (input) =>{
    this.dataInput.current.value = input
  }

  getXML = () =>{
    console.log(this.state.xml)
    return this.state.xml
  }

  // return (
  //   <div>
  //     width: {width} ~ height: {height}
  //   </div>
  // );

  updateXml= (xmlup)=>{
    console.log(xmlup)
    this.setState({
      xml:xmlup
    })
    console.log("liguagem")
    console.log(this.toLanguage(this.xml))
  }
  
  toLanguage = (workspace) => {
    window.LoopTrap = 1000; //Define a quatidade de instruções maxima que sera executada
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 1) throw "Infinite loop.";\n';
    return Blockly.JavaScript.workspaceToCode(this.xml);
  }
  

  execCode = (event)=>{
    this.dataOutput.current.value = "";
    let jsCode = this.toLanguage();
    const entradaDeDados = new ReadBySep(this.dataInput.current.value, "\n")
    const salvarSaida = (text = "",sep = "")=>{
        this.dataOutput.current.value = this.dataOutput.current.value + text + sep;
    }
    
    eval(jsCode);

  }
  testeInput = (event)=>{
    console.log(this.dataInput.current.value)
    let splitline = new ReadBySep(this.dataInput.current.value, "\n")

    console.log(splitline.getValues())
    console.log(splitline.getIndex())
    console.log(splitline.getNextValue())
    console.log(splitline.getNextValue())
    console.log(splitline.getNextValue())

  }
  submitSolution = (event) =>{
    // console.log(this.exerciseData)
    this.sendSolution()
  }
  
  render() {
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    return (

      
      <div className="app-container">
      
          <MyBlocklyEditor toolBox={this.myToolBox} updateXml={this.updateXml} />
        
          <div className="main output-panel">
            <button onClick={this.execCode} >Executar</button>
            <button onClick={this.testeInput}>Parar</button>
            <button onClick={this.submitSolution}>Enviar</button>
            <br></br>
        
            <textarea ref={this.dataInput} className='textarea input'></textarea>
            <textarea ref={this.dataOutput} className='textarea output' disabled ></textarea>
          </div>
      
      </div>
      
    )
  }
}

export default BlocklyExecControll;