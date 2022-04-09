import React  from 'react';
// import { BlocklyWorkspace } from 'react-blockly';
import Blockly from 'blockly'
import './index.css'
import MyBlocklyEditor from '../blockEditor';
import ReadBySep from '../../services/inputTextService';
//import {Interpreter} from "js-interpreter"
//import test from "../../data/blocklyPalette.json"

import "../customBlocks/customBlocks"


class BlocklyExecControll extends React.Component{


  constructor(props){
    super(props);
    //console.log(props)
    
    this.myToolBox = props.toolBox;
    
    
    this.state ={
      xml:''
    }
    this.dataInput = React.createRef()
    this.dataOutput = React.createRef()
    //this.BlocklyEditor = React.createRef()
    

  }
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
  
  render() {
    return (
      <>
       <div className="column workSpace">
                        
                        <div className="row editor">
                            <MyBlocklyEditor toolBox={this.props.toolBox} updateXml={this.updateXml} />

                        </div>
                        <div className="row execution">
                            <div> 
                                <button onClick={this.execCode} >Executar</button>
                                <button onClick={this.testeInput}>Parar</button>
                                <button >Enviar</button>
                                <br></br>

                            </div>
                            
                                <textarea ref={this.dataInput} className='textarea input'></textarea>
                                <textarea ref={this.dataOutput} className='textarea output' disabled></textarea>

                            
                        
                        </div>
                    </div>
      </>
    )
  }
}

export default BlocklyExecControll;