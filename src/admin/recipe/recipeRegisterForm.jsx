import React, {Component} from 'react';
import Joi from 'joi';
import RecipeRegisterComponent from "../components/recipeRegisterComponent";
import {toast, Zoom} from "react-toastify";
import {Button} from "react-bootstrap";
import {createRecipeAdmin} from "../../services/recipeService";
import {uploadImageAdmin} from "../../services/imageService";

class RecipeRegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                recipeTitle: '',
                recipeText: '',
                recipeType: '',
                recipePictures: [],
                recipeProducts: '',
                recipeBGLanguage: false,
                recipeENLanguage: false
            },
            errors: {},
            isDisabled: true,
            uploadedPictures: null,
            visiblePictures: null
        }
    }

    //Validating schema
    schema = Joi.object({
        recipeTitle: Joi.string()
            .required()
            .min(5)
            .max(100)
            .trim(true),
        recipeText: Joi.string()
            .required()
            .min(50)
            .max(5000),
        recipeType: Joi.string()
            .required()
            .min(3)
            .max(30)
            .trim(true),
        recipePictures: Joi.array()
            .items(Joi.string())
            .allow(''),
        recipeProducts: Joi.string()
            .required()
            .min(5)
            .max(500),
        recipeBGLanguage: Joi.boolean()
            .required(),
        recipeENLanguage: Joi.boolean()
            .required()
    })


    //Redirecting back to Admin panel with history push prop
    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    //Handling the input event from the Recipe create input form
    handleChange = (event) => {
        const recipe = {...this.state.recipe}
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        recipe[name] = value;
        this.setState({
            recipe,
            isDisabled: false
        });
    }


    //Handling the pictures upload Event for the Recipe - multiple pics selection
    handleImages = (event) => {

        if (this.maxSelectedImages(event)) {
            const visibleFiles = [];
            const recipeFiles = [];
            const recipe = {...this.state.recipe};
            const name = event.target.name;

            for (let i = 0; i < event.target.files.length; i++) {
                visibleFiles.push(URL.createObjectURL(event.target.files[i]));
                recipeFiles.push(event.target.files[i].name);
            }
            recipe[name] = recipeFiles;

            this.setState({
                recipe,
                visiblePictures: visibleFiles,
                uploadedPictures: event.target.files,
                isDisabled: false
            });
            console.log(recipeFiles);
        }
    }


    //Handling the submit form event
    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validateRecipeInput();
        this.setState({
            errors: errors || {}
        });
        if (errors) return;

        //First registering the Recipe object.
        const recipe = {
            recipeTitle: this.state.recipe.recipeTitle,
            recipeText: this.state.recipe.recipeText,
            recipeType: this.state.recipe.recipeType,
            recipePictures: this.state.recipe.recipePictures,
            recipeProducts: this.state.recipe.recipeProducts,
            recipeBGLanguage: this.state.recipe.recipeBGLanguage,
            recipeENLanguage: this.state.recipe.recipeENLanguage
        }
        await createRecipeAdmin(recipe);

        toast.success("Recipe successfully created!", {
            position: "top-center",
            transition: Zoom
        });

        //If Recipe object is successfully created then uploading the pictures to gallery
        if (this.state.uploadedPictures !== null) {

            const data = new FormData();

            for (let image of this.state.uploadedPictures) {
                data.append('file', image);
            }
            await uploadImageAdmin(data);
            toast('Images were successfully uploaded!', {
                position: "top-center",
                transition: Zoom
            });
        }

        this.setState({
            isDisabled: true
        });
    }


    //Defining the maximum uploaded files amount, if amount is bigger than allowed - returning false;
    maxSelectedImages = (event) => {
        let files = event.target.files;
        if (files.length > 10) {
            toast.error("Only 10 images allowed to upload!", {
                position: "top-center",
                transition: Zoom
            });
            event.target.value = null;
            return false;
        }
        return true;
    }


    //Validating the input form values via Joi schema validation
    validateRecipeInput = () => {
        const recipe = {
            recipeTitle: this.state.recipe.recipeTitle,
            recipeText: this.state.recipe.recipeText,
            recipeType: this.state.recipe.recipeType,
            recipePictures: this.state.recipe.recipePictures,
            recipeProducts: this.state.recipe.recipeProducts,
            recipeBGLanguage: this.state.recipe.recipeBGLanguage,
            recipeENLanguage: this.state.recipe.recipeENLanguage
        }

        const options = {abortEarly: false};
        const result = this.schema.validate(recipe, options);

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }


    render() {
        return (
            <div>
                <Button
                    onClick={this.adminRedirect}>
                    BACK TO ADMIN PANEL
                </Button>
                <RecipeRegisterComponent
                    recipe={this.state.recipe}
                    handleChange={this.handleChange}
                    handleImages={this.handleImages}
                    handleSubmit={this.handleSubmit}
                    errors={this.state.errors}
                    isDisabled={this.state.isDisabled}/>
            </div>
        );
    }
}

export default RecipeRegisterForm;
