import httpService from "./httpService";
import {apiUrl} from "../config.json";
import {getCurrentAdmin} from "./adminLoginService";

const apiEndPoint = apiUrl + "/recipes";

//Concatenated URL for get, put, delete requests for single RECIPE object when ID is needed;
function recipeUrl(recipeId){
    return `${apiEndPoint}/${recipeId}`;
}


//Creating single RECIPE object - admin rights only
export function createRecipeAdmin(recipe){
    return httpService
        .post(apiEndPoint,recipe,{
            headers: {
                'x-auth-token':getCurrentAdmin()
            }
        });
}



//Retrieving all RECIPE objects from DB - no token needed
export function getAllRecipes(){
    return httpService
        .get(apiEndPoint);
}



//Retrieve single RECIPE object from DB - no token needed
export function getRecipe(recipeId){
    return httpService
        .get(recipeUrl(recipeId))
}



//Update single RECIPE object from DB - admin rights only
export function updateRecipeAdmin(recipe,recipeId){
    return httpService
        .put(recipeUrl(recipeId),recipe,{
            headers: {
                'x-auth-token': getCurrentAdmin()
            }
        });
}


//Deleting single RECIPE object from DB - admin rights only
export function deleteRecipeAdmin(recipeId){
    return httpService
        .delete(recipeUrl(recipeId),{
            headers:{
                'x-auth-token':getCurrentAdmin()
            }
        });
}
