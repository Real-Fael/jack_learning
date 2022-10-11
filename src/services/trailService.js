import LocalStorage from "./apiServices/localStorage";

class TrailService{

    
   
    static registerTrail(TrailData){
        
        
        try{
            LocalStorage.storeTrailData(TrailData);

        }catch(e){
            throw e;
        }
    }

    
    static getTrail(TrailId){
        
        
        try{
            return LocalStorage.getTrailData(TrailId);

        }catch(e){
            throw e;
        }
    }

    static getTrailList(){
        
        
        try{
            return LocalStorage.getTrailList();

        }catch(e){
            throw e;
        }
    }

}


export default TrailService;