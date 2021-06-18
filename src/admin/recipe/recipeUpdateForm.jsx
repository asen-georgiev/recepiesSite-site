import React, {Component} from 'react';
import Joi from "joi";
import RecipeRegisterComponent from "../components/recipeRegisterComponent";
import {Button, Image} from "react-bootstrap";
import {getRecipe, updateRecipeAdmin} from "../../services/recipeService";
import {toast, Zoom} from "react-toastify";
import {picUrl} from "../../config.json";
import {uploadImageAdmin} from "../../services/imageService";

class RecipeUpdateForm extends Component {
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
            url: null,
            uploadedPictures: null,
            visiblePictures: null
        }
    }

    schema = Joi.object({
        recipeTitle: Joi.string()
            .required()
            .min(5)
            .max(100)
            .trim(true)
            .label('Recipe title'),
        recipeText: Joi.string()
            .required()
            .min(50)
            .max(5000)
            .label('Recipe text'),
        recipeType: Joi.string()
            .required()
            .min(3)
            .max(30)
            .trim(true)
            .label('Recipe type'),
        recipePictures: Joi.array()
            .items(Joi.string())
            .allow('')
            .label('Recipe pictures'),
        recipeProducts: Joi.string()
            .required()
            .min(5)
            .max(500)
            .label('Recipe products'),
        recipeBGLanguage: Joi.boolean()
            .required()
            .label('BG language'),
        recipeENLanguage: Joi.boolean()
            .required()
            .label('ENG language')
    })


    adminRedirect = () => {
        this.props.history.push("/admin/recipelist");
    }


    async componentDidMount() {
        const url = picUrl;
        await this.populateRecipeForm();
        this.setState({url});
    }


    handleChange = (event) => {
        const recipe = {...this.state.recipe};
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        recipe [name] = value;

        this.setState({
            recipe,
            isDisabled: false
        });
    }


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
            console.log(event.target.files);
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validateRecipeUpdate();
        this.setState({errors: errors || {}});
        if (errors) return;

        if (this.state.uploadedPictures !== null) {
            try {
                const data = new FormData();

                for (let image of this.state.uploadedPictures) {
                    data.append('file', image);
                }
                await uploadImageAdmin(data);
                toast('Images were successfully uploaded!', {
                    position: "top-center",
                    transition: Zoom
                });
            } catch (error) {
                if (error.response) console.log(error.response.statusText);
            }
        }


        const recipe = {
            recipeTitle: this.state.recipe.recipeTitle,
            recipeText: this.state.recipe.recipeText,
            recipeType: this.state.recipe.recipeType,
            recipePictures: this.state.recipe.recipePictures,
            recipeProducts: this.state.recipe.recipeProducts,
            recipeBGLanguage: this.state.recipe.recipeBGLanguage,
            recipeENLanguage: this.state.recipe.recipeENLanguage
        };

        toast('Recipe updated successfully!', {
            position: 'top-center',
            transition: Zoom
        });
        this.setState({
            isDisabled: true
        });
        await updateRecipeAdmin(recipe, this.state.recipe._id);

    }


    mapToViewModel(recipe) {
        return {
            _id: recipe._id,
            recipeTitle: recipe.recipeTitle,
            recipeText: recipe.recipeText,
            recipeType: recipe.recipeType,
            recipePictures: recipe.recipePictures,
            recipeProducts: recipe.recipeProducts,
            recipeBGLanguage: recipe.recipeBGLanguage,
            recipeENLanguage: recipe.recipeENLanguage
        };
    }


    maxSelectedImages = (event) => {
        let files = event.target.files;
        if (files.length > 10) {
            toast.error('Only 10 images allowed to upload!', {
                position: "top-center",
                transition: Zoom
            });
            event.target.value = null;
            return false;
        }
        return true;
    }


    async populateRecipeForm() {
        try {
            const recipeId = this.props.match.params.id;
            const {data: recipe} = await getRecipe(recipeId);
            this.setState({recipe: this.mapToViewModel(recipe)});
        } catch (error) {
            if (error.response && error.response.status === 404)
                toast.error('There is no Recipe with the given ID', {
                    position: "top-center",
                    transition: Zoom
                });
        }
    }


    validateRecipeUpdate = () => {
        const recipe = {
            recipeTitle: this.state.recipe.recipeTitle,
            recipeText: this.state.recipe.recipeText,
            recipeType: this.state.recipe.recipeType,
            recipePictures: this.state.recipe.recipePictures,
            recipeProducts: this.state.recipe.recipeProducts,
            recipeBGLanguage: this.state.recipe.recipeBGLanguage,
            recipeENLanguage: this.state.recipe.recipeENLanguage
        };
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
                    BACK TO RECIPE LIST
                </Button>
                <RecipeRegisterComponent
                    recipe={this.state.recipe}
                    handleSubmit={this.handleSubmit}
                    handleImages={this.handleImages}
                    handleChange={this.handleChange}
                    errors={this.state.errors}
                    isDisabled={this.state.isDisabled}/>

                {this.state.visiblePictures === null &&
                this.state.recipe.recipePictures.map(pic => {
                    return (
                        <Image
                            key={pic}
                            src={this.state.url + pic}
                            style={{width: 300, height: "auto"}}/>
                    )
                })}

                {this.state.visiblePictures &&
                this.state.visiblePictures.map(pic => {
                    return (
                        <Image
                            key={pic}
                            src={pic}
                            style={{width: 300, height: "auto"}}/>
                    )
                })}

            </div>
        );
    }
}

export default RecipeUpdateForm;
