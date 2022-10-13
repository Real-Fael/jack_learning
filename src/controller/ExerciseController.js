import ExerciseService from "../services/ExerciseService";
import UsersController from "./userController";


class ExerciseController {
 
    static cadExerciseCheck(ExerciseData){

        try{
            ExerciseService.registerExercise(ExerciseData)

        }catch(e){
            throw e;
        }

       
    }

    

    static saveExerciseSolution(solutionData){

        try{

            let userData = UsersController.getUserData(solutionData.userData.email)
            console.log("userData")
            console.log(userData)
            let findtrail = -1
            let findSolution = -1
            if (userData.hasOwnProperty("trailSolved")){
                userData.trailSolved.forEach((element,elementIndex) => {
                    if ((element.trail_id===solutionData.trailId)){
                        findtrail = elementIndex
                        userData.trailSolved[elementIndex].qtdSolved= (userData.trailSolved[elementIndex].qtdSolved==solutionData.maxLenghtTrail)?userData.trailSolved[elementIndex].qtdSolved+1:userData.trailSolved[elementIndex].qtdSolved
                        userData.trailSolved[elementIndex].solutions.forEach((solution,solutionIndex) => {
                            if ((solution.exerciseId===solutionData.id)){
                                findSolution = elementIndex
                                solution.xml=solutionData.xml
                            }
                        })
                        if (findSolution === -1) userData.trailSolved[elementIndex].solutions.push({"exerciseId":solutionData.id,"xml":solutionData.xml})
                    }
                })
                if (findtrail=== -1) userData.trailSolved.push({"trail_id":solutionData.trailId, "qtdSolved":1, solutions:[{"exerciseId":solutionData.id,"xml":solutionData.xml}]})
                   
            }else{
                userData["trailSolved"] = [{"trail_id":solutionData.trailId, "qtdSolved":1, solutions:[{"exerciseId":solutionData.id,"xml":solutionData.xml}]}]

            }
            console.log(userData)
            return ExerciseService.saveExerciseSolution(userData)

        }catch(e){
            throw e;
        }

    }

    static getExercise(exerciseId){

        try{
            return ExerciseService.getExercise(exerciseId)

        }catch(e){
            throw e;
        }

       
    }
    static getExerciseList(){

        try{
            return ExerciseService.getExerciseList()

        }catch(e){
            throw e;
        }

       
    }
}

export default ExerciseController;