

import React, { useState } from "react";
import { BlocklyWorkspace } from 'react-blockly';
import test from "../../../data/blocklyPalette.json"
// import "./index.css"

class NewExercise extends React.Component{


    render() {

        return (
            <div >
            <a>NewExercise</a>
            </div>
        );
    }
}

function MyBlocklyEditor2() {
  const [xml, setXml] = useState();

  return (
    <div class="app-container">
        <div id="blocklyDiv" class="main blockly-panel">

            <BlocklyWorkspace
            className="width-100" // you can use whatever classes are appropriate for your app's CSS
            toolboxConfiguration={test} // this must be a JSON toolbox definition
            initialXml={xml}
            onXmlChange={setXml}
            />

        </div>



     </div>
  )
}
export default MyBlocklyEditor2;


