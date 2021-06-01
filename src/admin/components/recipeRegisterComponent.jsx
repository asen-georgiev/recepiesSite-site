import React from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel, FormCheck} from "react-bootstrap";
import * as PropTypes from 'prop-types';

function RecipeRegisterComponent(props) {

    const {recipe, handleChange, handleImages, handleSubmit, errors, isDisabled} = props;

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormControl
                    autoFocus={true}
                    name="recipeTitle"
                    placeholder="Enter Recipe's title"
                    type="text"
                    value={recipe.recipeTitle}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    as="textarea"
                    name="recipeText"
                    placeholder="Enter Recipe's full text. Max 5000 symbols"
                    rows="10"
                    value={recipe.recipeText}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    name="recipeType"
                    placeholder="Enter Recipe's type"
                    type="text"
                    value={recipe.recipeType}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    as="textarea"
                    name="recipeProducts"
                    placeholder="Enter Recipe's products. Separate each product with a coma."
                    rows="5"
                    value={recipe.recipeProducts}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <FormCheck
                    label="Bulgarian language"
                    name="recipeBGLanguage"
                    type="checkbox"
                    value={recipe.recipeBGLanguage}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <FormCheck
                    label="English language"
                    name="recipeENLanguage"
                    type="checkbox"
                    value={recipe.recipeENLanguage}
                    onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <Form.File
                    label="Maximum images allowed to upload: 10 (not mandatory)"
                    multiple
                    name="recipePictures"
                    type="file"
                    onChange={handleImages}
                />
            </FormGroup>
            <Button
                type="submit"
                disabled={isDisabled}>
                CREATE
            </Button>
        </Form>
    );
}

RecipeRegisterComponent.propTypes = {
    recipe: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleImages: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired
}

export default RecipeRegisterComponent;
