import httpService from "./httpService";
import {apiUrl} from "../config.json";

const apiEndPoint = apiUrl + "/adminauthent";

//Fetching frontent admin data from the login form (email and password) to the server
//Taking the response data (token) from the server and saving it in the session storage
//Required login after every closing of the browser;
export function adminLogin(admin){
    return httpService
        .post(apiEndPoint,admin)
        .then(response => {
            if(response.data){
                sessionStorage.setItem("admin",response.data);
            }
            return response.data;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

//Function for retrieving the currently logged Admin (token)
export function getCurrentAdmin() {
    return sessionStorage.getItem("admin");
}

//Fuction removing the admin token from the sessionStorage
export function adminLogout() {
    sessionStorage.removeItem("admin");
}
