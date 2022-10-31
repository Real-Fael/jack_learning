class LocalStorage{

    

    static getExerciseData(exerciseId){
        let exists= null;
        let exercise = this.getExerciseList();
        for(let i=0;i<exercise.length;i++){
            // console.log(exercise[i].id , exerciseId )
            if(exercise[i].id===parseInt(exerciseId)) {
                exists={...exercise[i]};
                break;
            }
        }
        return exists;
    }


    static getExerciseList(){
        let exercises = [];
        if (window.localStorage.hasOwnProperty("exercises"))
            exercises = JSON.parse(window.localStorage.getItem("exercises"));

        return exercises;
    }


    static storeExerciseData(exerciseData){
        
        //caso retorne um objeto ja existe esse usuario
        // eslint-disable-next-line
        // if (this.getUserLoginInformation(exerciseData.email)) throw "Usuário ja cadastrado"
        
        let exercises = this.getExerciseList();
        exercises.push({
            ...exerciseData, id: (exercises[exercises.length-1].id+1)
        })
        window.localStorage.setItem("exercises",JSON.stringify(exercises));
    }
    static StoreOrEditExerciseData(exerciseData){
        
        //caso retorne um objeto ja existe esse usuario
        // eslint-disable-next-line
        // if (this.getUserLoginInformation(exerciseData.email)) throw "Usuário ja cadastrado"
        let exerciseDataAux={...exerciseData}
        let exercises = this.getExerciseList();

        let nextId = (exercises.length!==0?(exercises[exercises.length-1].id+1):0) 
        exerciseDataAux.id = (exerciseDataAux.id!==null)?parseInt(exerciseDataAux.id):nextId
        
        if (exercises.length===0|| exerciseDataAux.id===exercises[exercises.length-1].id +1){
            exercises.push(exerciseDataAux)
        }else{
            exercises[exerciseDataAux.id] = exerciseDataAux
        }

        // exercises.push({
        //     ...exerciseData, id: (exercises[exercises.length-1].id+1)
        // })
        window.localStorage.setItem("exercises",JSON.stringify(exercises));
    }

    
    




    static getUserLoginInformation(email){
        let exists= null;
        let logins = this.getLoginsList();
        for(let i=0;i<logins.length;i++){
            if(logins[i].email===email) {
                exists={...logins[i]};
                break;
            }
        }
        return exists;
    }
    static getUserLoginPosition(email){
        let exists= null;
        let logins = this.getLoginsList();
        for(let i=0;i<logins.length;i++){
            if(logins[i].email===email) {
                exists=i;
                break;
            }
        }
        return exists;
    }
    static getLoginsList(){
        let logins = [];
        if (window.localStorage.hasOwnProperty("logins"))
            logins = JSON.parse(window.localStorage.getItem("logins"));

        return logins;
    }


   
    // static getUserData(userId){
    //     let exists= null;
    //     let user = this.getLoginsList();
    //     for(let i=0;i<user.length;i++){
    //         // console.log(user[i].id , userId )
    //         if(user[i].id===parseInt(userId)) {
    //             exists={...user[i]};
    //             break;
    //         }
    //     }
    //     return exists;
    // }

   

    static updateUserData(userData){
        
        //caso retorne um objeto ja existe esse usuario
        // eslint-disable-next-line
        // if (this.getUserLoginInformation(userData.email)) throw "Usuário ja cadastrado"
        let logins = this.getLoginsList();
        let updateData = {...userData}
        // delete updateData.id
        logins[this.getUserLoginPosition(userData.email)]={
            ...updateData
        }
        window.localStorage.setItem("logins",JSON.stringify(logins));
    }

    static storeUserData(userData){
        
        //caso retorne um objeto ja existe esse usuario
        // eslint-disable-next-line
        if (this.getUserLoginInformation(userData.email)) throw "Usuário ja cadastrado"
        
        let logins = this.getLoginsList();
        logins.push({
            ...userData, id:(logins.length!==0?(logins[logins.length-1].id+1):0) 
        })
        window.localStorage.setItem("logins",JSON.stringify(logins));
    }

    static storeSession({id,email,firstName,lastName,isteacher}){
        window.localStorage.setItem("session",JSON.stringify({id,email,firstName,lastName,isteacher}));

    }
    static deleteThisSession(){
        if (window.localStorage.hasOwnProperty("session"))
            window.localStorage.removeItem("session");
    }
    static getSession(){
        if (window.localStorage.hasOwnProperty("session"))
            return JSON.parse(window.localStorage.getItem("session"));

        return null;
    }


    static getTrailData(trailId){
        let exists= null;
        let trail = this.getTrailList();
        for(let i=0;i<trail.length;i++){
            // console.log(trail[i].id , trailId )
            if(trail[i].id===parseInt(trailId)) {
                exists={...trail[i]};
                break;
            }
        }
        return exists;
    }
    static getPositionTrailData(trailId){
        let exists= null;
        let trail = this.getTrailList();
        for(let i=0;i<trail.length;i++){
            // console.log(trail[i].id , trailId )
            if(trail[i].id===parseInt(trailId)) {
                exists=i;
                break;
            }
        }
        return exists;
    }
    
    static getTrailList(){
        let trail = [];
        if (window.localStorage.hasOwnProperty("trail"))
            trail = JSON.parse(window.localStorage.getItem("trail"));

        return trail;
    }


    static storeTrailData(trailData){
        
        //caso retorne um objeto ja existe esse usuario
        // eslint-disable-next-line
        // if (this.getUserLoginInformation(trailData.email)) throw "trilha ja cadastrada"
        
        let trail = this.getTrailList();
        trail.push({
            ...trailData, id :(trail.length!==0?(trail[trail.length-1].id+1):0) 
        })
        window.localStorage.setItem("trail",JSON.stringify(trail));
    }
    static StoreOrEditTrailData(trailData){
        
        //caso retorne um objeto ja existe esse usuario
        // eslint-disable-next-line
        // if (this.getUserLoginInformation(trailData.email)) throw "trilha ja cadastrada"
        let trailDataAux={...trailData}
        let trail = this.getTrailList();
        let nextId= (trail.length!==0?(trail[trail.length-1].id+1):0) 
        trailDataAux.id = (trailDataAux.id!==null)?parseInt(trailDataAux.id):nextId
        if (trailDataAux.id===trail[trail.length-1].id +1){
            trail.push(trailDataAux)
        }else{
            trail[trailDataAux.id] = trailDataAux
            
        }

        window.localStorage.setItem("trail",JSON.stringify(trail));
    }
    static removeTrailData(trailId){
        
        //caso retorne um objeto ja existe esse usuario
        // eslint-disable-next-line
        // if (this.getUserLoginInformation(trailData.email)) throw "trilha ja cadastrada"
        
        let trail = this.getTrailList();
        let position = this.getPositionTrailData(trailId)
        trail.splice(position,1)

        window.localStorage.setItem("trail",JSON.stringify(trail));
    }

}

export default LocalStorage;