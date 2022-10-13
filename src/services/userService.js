import LocalStorage from "./apiServices/localStorage";

class UserService{

    static validationPass= "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
   
    static registerLogins(userData){
        if (userData.password !== userData.confirmPassword)
            // eslint-disable-next-line
            throw "As senhas devem ser iguais";
        
        let passVerify = true;
        //Expressão regular para verificar se existe letras e números caracteres especiais e tamanho de no mínimo 8 
        const regexPass= new RegExp(this.validationPass);
        
        if(!regexPass.test(userData.password))  passVerify=false;
        
        //****************ENABLE*************

        // if(!passVerify)
        //     // eslint-disable-next-line
        //     throw "A senha deve possuir ao menos 8 caracteres, contendo no mínimo uma letra, um numero e um caracter especial"
        
        try{
            LocalStorage.storeUserData(userData);

        }catch(e){
            throw e;
        }
    }

    static loginValidate(userData){
        let loginInformation= LocalStorage.getUserLoginInformation(userData.email);
        // eslint-disable-next-line
        if (!loginInformation) throw "email incorreto";
        // eslint-disable-next-line
        if (userData.password!==loginInformation.password) throw "Senha incorreta";
        console.log("salvando Sessao")
        console.log(loginInformation)
        
        LocalStorage.storeSession(loginInformation);
    }
    static getUserData(email){
        return LocalStorage.getUserLoginInformation(email);
    }

    static getSession(){
        return LocalStorage.getSession();
    }
    static logout(){
        LocalStorage.deleteThisSession();
    }

}


export default UserService;