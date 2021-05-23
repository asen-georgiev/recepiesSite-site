import httpService from "./httpService";
import {getCurrentAdmin} from "./adminLoginService";
import {apiUrl} from "../config.json";

const apiEndPoint = apiUrl + "/images";

//Uploading Image(s) to the gallery in the backend API - admin rights only
export function uploadImageAdmin(data){
    return httpService
        .post(apiEndPoint,data,{
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        })
        .then(response => {
            console.log(response.statusText);
        })
}

//Uploading Image to the gallery in the backend API - no token needed
//Beacuse of the User registration process on this stage - later there will be temporary User
export function uploadImageUser(data){
    return httpService
        .post(apiEndPoint,data);
}


//Retrieving all Images from gallery - admin rights only
export function getImaged(){
    return httpService
        .get(apiEndPoint,{
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        })
}
