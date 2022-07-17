import React  from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import './index.css'
//import test from "../../data/blocklyPalette.json"



//JSON.parse()

class MyBlocklyEditor extends React.Component{


  constructor(props){
    super(props);
    //console.log(props)
    this.myToolBox = props.toolBox;
    this.xml =  props.xml;
    this.updateXml = props.updateXml;

  }

  // updateXml= (xmlup)=>{
  //   console.log(xmlup)
  //   this.setState({
  //     xml:xmlup
  //   })
  //   console.log(this.toLanguage(this.xml))
  // }
  
  // toLanguage=(workspace)=>{
  //   return Blockly.JavaScript.workspaceToCode(this.xml)
  // }
  
  render() {
    return (
      <>
      
        <div id="blocklyDiv" class="main blockly-panel">
          <BlocklyWorkspace
            className="blockEditor" // you can use whatever classes are appropriate for your app's CSS
            toolboxConfiguration={this.myToolBox} // this must be a JSON toolbox definition
            initialXml={this.xml}
            
            //teste = True
            //if(teste) {
              onXmlChange={this.updateXml}

            // }
            //else{
            // advertindo
            //}
            //onWorkspaceChange={this.toLanguage}
          />
        </div>
        
      </>
    )
  }
}

export default MyBlocklyEditor;