import ExerciseService from "../services/ExerciseService";


class ExerciseController {
 
    static cadExerciseCheck(ExerciseData){

        try{
            ExerciseService.registerExercise(ExerciseData)

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
}

export default ExerciseController;