import axios from "axios";
import {toast} from "react-toastify";

//General intercepting the server responses;
axios.interceptors.response.use(success =>{
    return (success);
}, error => {
    const expectedError = error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if(expectedError){
        console.log(error.response.data);
        toast.error(error.response.data, {
            position: 'top-center'
        });
    }
    if(!expectedError){
        console.log(error);
        toast.error('An Unexpected error occurred!');
    }
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
