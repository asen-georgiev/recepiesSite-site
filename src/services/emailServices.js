import httpService from "./httpService";
import {apiUrl} from "../config.json";
import {toast} from "react-toastify";
import {getCurrentAdmin} from "./adminLoginService";

const apiEndPoint = apiUrl + "/emails";

function emailUrl(emailId) {
    return `${apiEndPoint}/${emailId}`;
}

export function sendEmail(email) {
    return httpService
        .post(apiEndPoint, email)
        .then(response => console.log(response.data))
        .catch(error => {
            toast.error(error.response.data);
            return Promise.reject(error);
        });
}

export function getAllEmails() {
    return httpService
        .get(apiEndPoint, {
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}

export function deleteEmail(emailId) {
    return httpService
        .delete(emailUrl(emailId), {
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}
