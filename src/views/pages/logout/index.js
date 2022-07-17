import * as React from 'react'
import UsersController from '../../../controller/userController';


class Logout extends React.Component{

    constructor(props){
        super(props);
        UsersController.logout(); 
        window.location.href = "/login"
    }

    render = () => {
        return <></>
    }
}

export default Logout;