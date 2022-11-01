

import React, { memo } from "react";

import "./index.css"
import test from "../../../data/blocklyPalette.json"
import BlocklyExecControll from "../../../components/blocklyExecControll";
import { createTheme, ThemeProvider,Container,CssBaseline, Typography, Box, TextField, Divider } from '@mui/material';
import UsersController from "../../../controller/userController";
import { useParams } from "react-router-dom";
import ExerciseController from "../../../controller/ExerciseController";
import SucessAlertDialogSlide from "../../../components/userDialogue";
import TrailController from "../../../controller/trailController";
import { Paragliding } from "@mui/icons-material";
import Tour from "reactour";


const theme = createTheme();

const tourConfig = [
    {
      // updateDelay: 1500,
      selector: '[data-tut="reactour__all__page"]',
      content: `Bem vindo Ao Jack Learning!!! Este é o ambiente de desenvolvimento das tarefas.`
    },
    {
      selector: '[data-tut="reactour__exercise__info"]',
      content: `Aqui você pode encontrar as informações necessárias para o desenvolvimento da tarefa.`
    },
    {
      selector: '[data-tut="reactour__instances"]',
      content: `Aqui você encontra as instâncias que exemplificam o algoritimo.\nSeu algoritmo deverá antender corretamente a todas as instâncias para ser aprovado. `
    },
    {
      selector: '[data-tut="reactour__instances__left"]',
      content: `A esquerda temos a entrada de cada instancia. `
    },
    {
      selector: '[data-tut="reactour__instances__right"]',
      content: `A direita tempos a saida esperada para a determinada entrada. `
    },
    {
      selector: '[data-tut="reactour__workspace"]',
      content: `Esta é a sua area de desenvolvimento, você pode encontrar e arrastar os blocos a partir do menu a esquerda. \n\nDesenvolva os algoritmos com atenção e capricho atendendo oque foi solicitado.`
    },
    {
      selector: '[data-tut="reactour__input__area"]',
      content: `Você pode inserir aqui valores que servirão de entrada para seu algoritmo.`
    },
    {
      selector: '[data-tut="reactour__output__area"]',
      content: `Aqui você pode observar os valores de saida gerados pelo seu algoritmo após a execução.`
    },
    {
      selector: '[data-tut="reactour__execution"]',
      content: `Você pode executar seus algoritmos quantas vezes achar necessário dentro do ambiente local.`
    },
    {
      selector: '[data-tut="reactour__submit"]',
      content: `Quando terminar, você pode submeter seu algoritmo para ser testado e avaliado.`
    },
    {
      selector: '[data-tut="reactour__general"]',
      content: `Estas foram as instruções iniciais, a partir de agora você pode se aventurar e desenvolver seus algoritmos. `
    }

  ];

const Infotemplate = (props) =>{
    const {param} = useParams()
    console.log(param)
    const regex = new RegExp('(^[0-9]*-[0-9]*-[0-9]*$)');
    let params = param.split("-")
    if (!regex.test(param) || params.length>4){
        window.location.href = "/exerciseTrail"
    }
    let trailId=params[0]
    let maxLenghtTrail=params[1]
    let exerciseId=params[params.length-1]
    console.log("exercise")
    let exercise = ExerciseController.getExercise(exerciseId)
    let trail = TrailController.getTrail(parseInt(trailId))

    //*******TOUR*********
    const accentColor = "#5cb7b7";
    const [isTourOpen, setTourOpen] = React.useState(param==="0-0-0");
    console.log("trail")
    console.log(trail)
    if (!exercise){
        window.location.href = "/exerciseTrail"
        return <>ERRO EXERCICIO NAO ENCONTRADO</>
    }

    // *******TOUR*********
    const closeTour = () => {
    setTourOpen(false);
    };
    const openTour = () => {
    setTourOpen(true);
    };
    // props.exerciseRef(exercise);

    return <Box data-tut="reactour__exercise__info" sx={{ width: '100%', maxWidth: 500 }}  ref={props.exerciseRef} >
        <Tour
            onRequestClose={closeTour}
            disableInteraction={false}
            steps={tourConfig}
            isOpen={isTourOpen}
            maskClassName="mask"
            className="helper"
            rounded={5}
            accentColor={accentColor}
            
        />
        <Typography  sx={{ "textAlign": 'center', "fontWeight": "bold"}} variant="h4" gutterBottom component="div" id="title" >
            {trail.trailName}
        </Typography>
        <Typography sx={{ "textAlign": 'center', "fontWeight": "bold"}} variant="h5" gutterBottom component="div" id="title" >
            {exercise.title}
        </Typography>
        <Typography sx={{ "textAlign": 'center'}} variant="caption" display="block" visibility="hidden" position="absolute" gutterBottom id="id_exercise">
            n°:{trailId}-{maxLenghtTrail}-{exercise.id}
        </Typography>
        <Typography sx={{ "textAlign": 'center'}} variant="caption" display="block"  gutterBottom id="id_exercise">
            Posição na trilha:{parseInt(maxLenghtTrail)+1} de {trail.exercisesTrail.length}
        </Typography>


        <Typography variant="body1" id="description" gutterBottom>
            {exercise.description}
        </Typography>
        <Typography variant="button" display="block" gutterBottom sx={{
            "marginTop":"16px",
            "fontWeight": "bold"
        }}>
                Exemplos:
            </Typography>
        {/* <Typography variant="button" display="block" gutterBottom>
            Input:
        </Typography> */}
        <Box
        component="div" 
        id="io_box"
        sx={{
            '& .MuiTextField-root': { m: 0.2, width: '48%' },
            
        }}
        noValidate
        autoComplete="off"
        data-tut="reactour__instances"
        >
            {exercise.IOlist.map((element,pos,list) => {
                return <>
                        <Typography
                            sx={{ mt: 0.5, ml: 2,mb:1 }}
                            color="text.secondary"
                            display="block"
                            variant="body"
                            textAlign="center"
                            
                            >
                            {`instancia ${pos+1}`}
                            <Divider component="div" />
                        </Typography>
                        <div key={`io-${pos}`} id={`io-${pos}`}>
                                
                                <TextField
                                id={`input-${pos}`}
                                label={`Entrada ${pos+1}:`}
                                multiline
                                rows={5}
                                defaultValue={element.input}
                                // variant="filled"
                                // htmlFor="component-disabled"
                                disabled
                                // sx={{
                                //     "& .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                                //       color: "rgba(0, 0, 0, 1)" // (default alpha is 0.38)
                                //     }
                                //   }}
                                // InputProps={{
                                //     readOnly: true,
                                // }}
                                data-tut="reactour__instances__left"
                                />
                                <TextField
                                id={`output-${pos}`}
                                label={`Saída ${pos+1}: `}
                                multiline
                                rows={5}    
                                defaultValue={element.output}
                                // style={{"textarea:disabled": {color:"rgba(255,255,0,1) !important"}}}
                                // variant="filled"
                                // sx={{":disabled": {color:"rgba(255,255,0,1) !important"}}}                                
                                disabled
                                data-tut="reactour__instances__right"
                                // InputProps={{
                                //     readOnly: true,
                                // }}
                                />
                            </div>
                    </>
            })}
            
        
        </Box>
    </Box>  
}

class Exercise extends React.Component{
    
    constructor(props){
        super(props);
        // console.log(props)
        // this.handleReservation = this.handleReservation.bind(this)
        // console.log(this.props.match)
        
        // this.refForm= React.createRef();
        const data= UsersController.getSession(); 
        this.state={
            session:{
                ...data
            },
            message:null,
            executeXML:()=>{alert("none")},
            setInput:()=>{alert("none")},
            getOutput:()=>{alert("none")},
            getXML:()=>{alert("none")}
            // exerciseData: {}
        }
        this.exerciseRef = React.createRef();
        // this.exerciseData = {};
        // console.log(data)
        // this.alertControll = props.alertControll;
    }
    
    updateExerciseData = (exerciseData) =>{

        // console.log("update exercise Data")
        this.exerciseData = exerciseData
        // console.log(this.exerciseData)
        // this.setState({
        //     exerciseData:exerciseData
        //   })
    }
    sendSolution = () =>{
        
        
        let ids = this.exerciseRef.current.children.id_exercise.textContent.split(":")[1].split("-")
        let trailId = parseInt(ids[0])
        let maxLenghtTrail  =parseInt(ids[1])
        let exerciseId = parseInt(ids[2])
        let currentExercise = ExerciseController.getExercise(exerciseId)
        console.log("currentExercise")
        console.log(currentExercise)
        const IOlist = [...currentExercise.IOlist]
        

        let IOData = {
            title:currentExercise.title,
            id: exerciseId,
            trailId,
            maxLenghtTrail,
            description:currentExercise.description,
            //ajustar
            IOlist,
            userData:{...this.state.session}
        }
        
        console.log(IOData)
        // console.log(IOData.title)
        // console.log(IOData.description)
        // console.log(this.refIO)
        let IOLen = IOData.IOlist.length;

        // console.log(IOLen)
        IOData["xml"] = this.state.getXML()

        if (!IOData["xml"] || IOData["xml"] ===`<xml xmlns="https://developers.google.com/blockly/xml"></xml>`){
            alert("não é permitido algoritmos em branco, por favor, elabore um algoritmo para validação ")
            return
        }

        for(let i=0;i<IOLen;i++){
            // console.log(`input-${i}`)
            // console.log(this.refForm.current[`input-${i}`].value)
            let IOobject = IOData.IOlist[i]
            this.state.setInput(IOobject["input"])
            this.state.executeXML()

            if (this.state.getOutput() !== IOobject["output"]){
                alert(`A Saída ${i+1} esperada não corresponde com o resultado da saída do algoritmo`)
                return
            }

            // console.log(`output-${i}`)
            // console.log(this.refForm.current[`output-${i}`].value)
            // IOData["IOlist"].push(IOobject)
        }
        
        ExerciseController.saveExerciseSolution(IOData)
        // alert(`PARABENS O ALGORITMO FUNCIONOU PARA TODOS OS CASOS`)
        this.setState({message: <SucessAlertDialogSlide action={this.redirect} actionParams={{href:`/exerciseTrail/${trailId}`}} enable={true} title={"Parabens!!!"} message={"Você é Demais!!! O Algoritmo funcionou para todos os casos!"}/>})
        // window.location.href =`/exerciseTrail/${trailId}`

    }
    redirect = ({href})=>{
        window.location.href = href
    }
    updateActions = ({executeXML, setInput, getOutput, getXML})=> {
        this.setState({
          executeXML: (executeXML || function(){alert("none")}),
          setInput: setInput || function(){alert("none")},
          getOutput: getOutput || function(){alert("none")},
          getXML: getXML ||function(){alert("none")}
        })
    }
    
    render() {
        if (this.state.session.id ===-1){
            window.location.href = "/login"
            return <></>
        }

        return (
            <ThemeProvider theme={theme}>
                <Container  component="main" maxWidth="xs">
                <CssBaseline />
                {this.state.message}
            <div className="exercise" data-tut="reactour__all__page" >
               
               
                    <div className="column describe">
                       
                        <Infotemplate exerciseRef={this.exerciseRef} ></Infotemplate>

                    </div>
                    <div  className="workSpace">
                        <BlocklyExecControll  toolBox={test}  exerciseData= {this.exerciseRef} sendSolution={this.sendSolution}
                        updateActions={this.updateActions}/>

                    </div>
                
                
            </div>
            </Container>
            </ThemeProvider>      
        );
    }
}

export default Exercise;
