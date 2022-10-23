import TrailService from "../services/trailService";


class TrailController {
 
    static registerCheck(trailData,mode){

        if (!trailData.trailName || !trailData.difficultyLevel || !trailData.trailDescription|| !trailData.congratulationsMessage || !(trailData.exercisesTrail.length!==0)) 
            // eslint-disable-next-line
            throw "Todos os campos devem ser preenchidos";
        if (!trailData.creatorTrail.isteacher)
            // eslint-disable-next-line
            throw "Somente Professores podem cadastrar trilhas";
        try{
            if (mode==="edit"){
                TrailService.editTrail(trailData)
                return
            }
            TrailService.registerTrail(trailData)

        }catch(e){
            throw e;
        }

       
    }

    static cadTrailCheck(TrailData){

        try{
            

        }catch(e){
            throw e;
        }

       
    }

    static getTrail(trailId){

        try{
            return TrailService.getTrail(trailId)

        }catch(e){
            throw e;
        }

       
    }
    static removeTrail(trailId){

        try{
            return TrailService.removeTrail(trailId)

        }catch(e){
            throw e;
        }

       
    }
    static getTrailList(){

        try{
            return TrailService.getTrailList()

        }catch(e){
            throw e;
        }

       
    }
}

export default TrailController;