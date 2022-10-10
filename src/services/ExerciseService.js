import LocalStorage from "./apiServices/localStorage";

class ExerciseService{

    
   
    static registerExercise(ExerciseData){
        
        
        try{
            LocalStorage.storeExerciseData(ExerciseData);

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