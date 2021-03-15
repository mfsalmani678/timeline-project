import JWTService from 'service/JWTService.js';
import BackendAPIDAO from 'dao/BackendAPIDAO.js';
import UserDAO from 'dao/UserDAO.js';
import JwtDAO from 'dao/JwtDAO.js';
import store from "reduxStore/Store.js"
import {userAdded} from "reduxStore/actions/UserActions.js";

class LoginService {

    static myInstance = null;

    static getInstance() {
        if (LoginService.myInstance == null) {
            LoginService.myInstance = new LoginService();
        }
        return this.myInstance;
    }

    //################################## SERVICE METHODS ###########################################
    doLogin(userObject, loginComponentCallback) {

        const loginDAOResponseCallback = (response) => {
            if(response.status === 200) {
                const decodedUser = JWTService.getInstance().decryptJsonWebToken(response.data.token);
                UserDAO.getInstance().saveUser(decodedUser);
                JwtDAO.getInstance().saveJWT(response.data.token);
                store.dispatch(userAdded(decodedUser));
                if(loginComponentCallback !== undefined) {
                    loginComponentCallback({success: true, data:{tokenid: response.data.token}, message: response.message});
                }
            } else {
                if(loginComponentCallback !== undefined) {
                    loginComponentCallback({success: false, data:{}, message: response.message});
                }
            }
        };
        const request = {
            api: 'login',
            requestBody: userObject,
            serviceCallback: loginDAOResponseCallback,
            jwt: ''
        }
        BackendAPIDAO.getInstance().post(request);
    }

    doLogout() {
		localStorage.clear();  
    }

    doSignUp(userObject, signupComponentCallback) {
        const loginDAOResponseCallback = (response) => {
            if(response.status === 200) {
                console.log("Response Signup" , response.data);
                if(signupComponentCallback !== undefined) {
                    signupComponentCallback({success: true, data:{tokenid: response.data.token}, message: response.message});
                }
            } else {
                if(signupComponentCallback !== undefined) {
                    signupComponentCallback({success: false, data:{}, message: response.message});
                }
            }
        };

        const dataObject = {
            username: userObject.firstName + userObject.lastName,
            first_name: userObject.firstName,
            last_name: userObject.lastName,
            email: userObject.emailId,
            password: userObject.password
        }
        console.log("Data Object", dataObject);
        const request = {
            api: 'register',
            requestBody: dataObject,
            serviceCallback: loginDAOResponseCallback,
            jwt: ''
        }
        BackendAPIDAO.getInstance().post(request);
    }
}

export default LoginService;