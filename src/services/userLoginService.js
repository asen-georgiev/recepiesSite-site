import httpService from "./httpService";
import {apiUrl} from "../config.json";

const apiEndPoint = apiUrl + "/userauthent";

//Fetching the User input data to the server
//Taking the response token and storing it in the localStorage so the User always stays logged until logout
export function userLogin(data){
    return httpService
        .post(apiEndPoint,data)
        .then(response => {
            if(response.data){
                localStorage.setItem("user",response.data);
            }
            return response.data;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}



//Logging out the user by removing the user item from the local storage
export function userLogout(){
    localStorage.removeItem("user");
}


//Returning the currently logged User from the localStorage(token)
export function getCurrentUser(){
    return localStorage.getItem("user");
}
