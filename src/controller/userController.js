import UserService from "../services/userService";


class UsersController {
 
    static registerCheck(userData){

        if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.confirmPassword) 
            // eslint-disable-next-line
            throw "Todos os campos devem ser preenchidos";
        
        try{
            UserService.registerLogins(userData)

        }catch(e){
            throw e;
        }

       
    }

    static loginCheck(userData){
        // eslint-disable-next-line
        if (!(userData.email && userData.password)) throw "Todos os campos devem ser preenchidos";
        try{
            UserService.loginValidate(userData)
        }catch(e){
            throw e;
        }  
    }
    
    static getSession(){
      
      const session= UserService.getSession();
      return (!!session)? session:{id:-1,user:""}//Padronização para quando nao houver sessao ativa
    }
    static logout(){
        UserService.logout()
    }

}

export default UsersController;