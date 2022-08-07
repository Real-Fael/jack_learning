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
            ...exerciseData, id:exercises.length
        })
        window.localStorage.setItem("exercises",JSON.stringify(exercises));
    }


    static getUserLoginInformation(email){
        let exists= null;
        let logins = this.getLoginsList();
        for(let i=0;i<logins.length;i++){
            if(logins[i].email===email) {
                exists={...logins[i], id:i};
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


   


    static storeUserData(userData){
        
        //caso retorne um objeto ja existe esse usuario
        // eslint-disable-next-line
        if (this.getUserLoginInformation(userData.email)) throw "Usuário ja cadastrado"
        
        let logins = this.getLoginsList();
        logins.push({
            ...userData
        })
        window.localStorage.setItem("logins",JSON.stringify(logins));
    }

    static storeSession({id,email,firstName,lastName,isteacher}){
        window.sessionStorage.setItem("session",JSON.stringify({id,email,firstName,lastName,isteacher}));

    }
    static deleteThisSession(){
        if (window.sessionStorage.hasOwnProperty("session"))
            window.sessionStorage.removeItem("session");
    }
    static getSession(){
        if (window.sessionStorage.hasOwnProperty("session"))
            return JSON.parse(window.sessionStorage.getItem("session"));

        return null;
    }

   

}

export default LocalStorage;