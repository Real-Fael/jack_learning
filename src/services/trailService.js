import LocalStorage from "./apiServices/localStorage";

class TrailService{

    
   
    static registerTrail(TrailData){
        
        
        try{
            LocalStorage.storeTrailData(TrailData);

        }catch(e){
            throw e;
        }
    }

    static editTrail(TrailData){
        
        try{
            LocalStorage.StoreOrEditTrailData(TrailData);

        }catch(e){
            throw e;
        }
    }

    static removeTrail(TrailData){
        
        try{
            LocalStorage.removeTrailData(TrailData);

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