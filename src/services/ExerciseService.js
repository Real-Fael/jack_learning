import LocalStorage from "./apiServices/localStorage";

class ExerciseService{

   
   
    static saveExerciseSolution(solutionData){
        
        
        try{
            LocalStorage.updateUserData(solutionData);

        }catch(e){
            throw e;
        }
    }

    static registerExercise(ExerciseData){
        
        
        try{
            LocalStorage.storeExerciseData(ExerciseData);

        }catch(e){
            throw e;
        }
    }
    static editExercise(ExerciseData){
        
        
        try{
            LocalStorage.StoreOrEditExerciseData(ExerciseData);

        }catch(e){
            throw e;
        }
    }

    
    static getExercise(exerciseId){
        
        
        try{
            return LocalStorage.getExerciseData(exerciseId);

        }catch(e){
            throw e;
        }
    }

    static getExerciseList(){
        
        
        try{
            return LocalStorage.getExerciseList();

        }catch(e){
            throw e;
        }
    }

}


export default ExerciseService;