import React, {Component} from 'react';
import {deleteRecipeAdmin, getAllRecipes} from "../../services/recipeService";
import RecipeTableComponent from "../components/recipeTableComponent";
import {Button} from "react-bootstrap";
import {toast, Zoom} from "react-toastify";

class RecipeAllList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    }


    adminRedirect = () => {
        this.props.history.push('/admin');
    }


    async componentDidMount() {
        const {data:recipes} = await getAllRecipes();
        this.setState({
            recipes
        });
    }


    handleDelete = async (recipe) => {
        const allRecipes = this.state.recipes;
        const recipes = allRecipes.filter(rec => rec._id !== recipe._id);
        this.setState({
            recipes
        });

        try{
            await deleteRecipeAdmin(recipe._id);
            toast(`Recipe was successfully deleted`, {
                position: "top-center",
                transition: Zoom
            });
        }
        catch (error) {
            if(error.response && error.response.status === 404) console.log("Recipe with the given ID was not found!");
            toast.error("This recipe has already been deleted!");
            this.setState({recipes: allRecipes});
        }
    }


    render() {
        return (
            <div>
                <Button
                onClick={this.adminRedirect}>
                    BACK TO ADMIN PANEL
                </Button>
                <RecipeTableComponent
                    handleDelete={this.handleDelete}
                recipes={this.state.recipes}
                url={'/admin/recipeupdate/'}/>
            </div>
        );
    }
}

export default RecipeAllList;
