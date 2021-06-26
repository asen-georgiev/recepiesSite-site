import httpService from "./httpService";
import {getCurrentAdmin} from "./adminLoginService";
import {getCurrentUser} from "./userLoginService";
import {apiUrl} from "../config.json";

const apiEndPoint = apiUrl + "/comments";
const apiRecipeEndPoint = apiUrl + "/comments/by-recipe";
const apiUserEndPoint = apiUrl + "/comments/by-user";

function commentUrl(id){
    return `${apiEndPoint}/${id}`;
}

function byRecipeUrl(id){
    return `${apiRecipeEndPoint}/${id}`;
}

function byUserUrl(id){
    return `${apiUserEndPoint}/${id}`;
}

//Creating single Comment - user rights only.
export function createCommentUser(comment){
    return httpService
        .post(apiEndPoint, comment,{
            headers: {
                'x-auth-token': getCurrentUser()
            }
        });
}


export function updateCommentUser(comment, commentId){
    const body = {...comment};
    return httpService
        .put(commentUrl(commentId),body,{
            headers: {
                'x-auth-token': getCurrentUser()
            }
        });
}


export function deleteCommentUser(commentId){
    return httpService
        .delete(commentUrl(commentId),{
            headers: {
                'x-auth-token': getCurrentUser()
            }
        });
}


export function getComment(commentId){
    return httpService
        .get(commentUrl(commentId));
}

//Retrieving all Comments from DB - admin rights only.
export function getComments(){
    return httpService
        .get(apiEndPoint,{
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}


export function getCommentsByRecipe(recipeId){
    return httpService
        .get(byRecipeUrl(recipeId));
}


export function getCommentsByUser(userId){
    return httpService
        .get(byUserUrl(userId), {
            headers: {
                'x-auth-token': getCurrentUser()
            }
        });
}


export function deleteComment(commentId){
    return httpService
        .delete(commentUrl(commentId),{
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}






