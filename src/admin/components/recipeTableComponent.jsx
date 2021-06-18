import React from 'react';
import {Table, Image, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {picUrl} from "../../config.json";
import * as PropTypes from "prop-types";

function RecipeTableComponent(props) {

    const {handleDelete, recipes, url} = props;

    return (
        <Table>
            <tbody>
            {recipes.map((recipe, index) => {
                return (
                    <tr key={index}>
                        <td>
                            {recipe.recipeTitle}
                        </td>
                        <td>
                            {recipe.recipeText}
                        </td>
                        <td>
                            {recipe.recipeType}
                        </td>
                        <td>
                            {recipe.recipePictures.map(pic => {
                                return (
                                    <Image
                                        key={pic}
                                        src={picUrl + pic}
                                        style={{width: 100, height: 'auto'}}/>
                                )
                            })}
                        </td>
                        <td>
                            {recipe.recipeProducts}
                        </td>
                        <td>
                            {new Date(recipe.recipeDate).toLocaleString()}
                        </td>
                        <td>
                            <Link
                                to={`${url}${recipe._id}`}>
                                Update
                            </Link>
                        </td>
                        <td>
                            <Button
                                onClick={() => handleDelete(recipe)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    );
}

RecipeTableComponent.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    recipes: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired
}

export default RecipeTableComponent;
