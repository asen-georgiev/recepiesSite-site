import httpService from "./httpService";
import {apiUrl} from '../config.json';
import {toast} from "react-toastify";
import {getCurrentAdmin} from "./adminLoginService";
import {getCurrentUser} from "./userLoginService";

const apiEndPoint = apiUrl + "/users";

//Returning the concatenated url for the get, put, delete requests when ID needed;
function userUrl(userId){
    return `${apiEndPoint}/${userId}`;
}



//Registering single User object in the DB no token needed;
//Server is returning token and we store it directly in the Localstorage so, second login is not needed after registration.
export function registerUser(user){
    return httpService
        .post(apiEndPoint,user)
        .then(response => {
            if(response.data){
                localStorage.setItem("user",response.data);
            }
            return response.data
        })
        .catch(error => {
            toast.error(error.response.data);
            return Promise.reject(error);
        })
}

//Retrieving single User object from Db - user rights only
export function getUser(userId){
    return httpService
        .get(userUrl(userId),{
            headers:{
                'x-auth-token':getCurrentUser()
            }
        });
}

//Updating single User object - user rights only
export function updateUser(user,userId){
    return httpService
        .put(userUrl(userId),user,{
            headers: {
                'x-auth-token': getCurrentUser()
            }
        })
        .then(response => {
            if(response.data){
                localStorage.setItem("user",response.data);
            }
            return response.data
        })
        .catch(error => {
            toast.error(error.response.data);
            return Promise.reject(error);
        })
}

//Deleting single User object from the DB - user rights only
export function deleteUser(userId){
    return httpService
        .delete(userUrl(userId),{
            headers:{
                'x-auth-token':getCurrentUser()
            }
        });
}

//Updating the User password with automatically generated one in case of forgetting
export function updateUserPassword(userEmail){
    return httpService
        .put(apiEndPoint+"/passupdate",userEmail);
}



//Registering single User object in the DB - admin rights only
export function registerUserAdmin(user){
    return httpService
        .post(apiEndPoint,user,{
            headers:{
                'x-auth-token': getCurrentAdmin()
            }
        });
}

//Retrieving single User object from DB - admin rights only
export function getUserAdmin(userId){
    return httpService
        .get(userUrl(userId),{
            headers:{
                'x-auth-token': getCurrentAdmin()
            }
        });
}

//Retrieving all the User objects from the DB - admin rights only
export function getAllUsersAdmin(){
    return httpService
        .get(apiEndPoint,{
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}

//Updating single user object - admin rights only
export function updateUserAdmin(user,userId){
    return httpService
        .put(userUrl(userId),user,{
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}

//Deleting single User object from the DB - admin rights only
export function deleteUserAdmin(userId){
    return httpService
        .delete(userUrl(userId),{
            headers:{
                'x-auth-token':getCurrentAdmin()
            }
        });
}
