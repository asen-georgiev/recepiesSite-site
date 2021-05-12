import httpService from "./httpService";
import {getCurrentAdmin} from "./adminLoginService";
import {apiUrl} from "../config.json";

const apiEndPoint = apiUrl + "/admins";

//Function for exact URL when using ID param for updating, deteting or retrieving Admin object by ID
function adminUrl(adminId) {
    return `${apiEndPoint}/${adminId}`;
}


//Retrieving single Admin object from DB - admin rights only.
export function getAdmin(adminId) {
    return httpService
        .get(adminUrl(adminId), {
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}


//Retrieving all Admin objects from the DB - admin rights only
export function getAllAdmins() {
    return httpService
        .get(apiEndPoint, {
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}


//Creating Admin object in the DB - admin rights only.
export function registerAdmin(admin) {
    return httpService
        .post(apiEndPoint, admin, {
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}


//Updating single Admin object in the DB - admin rights only.
export function updateAdmin(admin, adminId) {
    const body = {...admin};
    return httpService
        .put(adminUrl(adminId), body, {
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}


//Deleting single Admin object from the DB - admin rights only.
export function deleteAdmin(adminId) {
    return httpService
        .delete(adminUrl(adminId), {
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}
