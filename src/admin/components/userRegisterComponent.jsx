import React from 'react';
import {Button,Form,FormGroup,FormControl,FormLabel} from "react-bootstrap";
import * as PropTypes from "prop-types";

function UserRegisterComponent(props) {

    const{user,errors,handleChange,handleImage,handleSubmit,isDisabled} = props;

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                {errors.userPicture &&
                <FormLabel>
                    {errors.userPicture}
                </FormLabel>}
                <Form.File
                id="image"
                name="image"
                label="Select image for Profile picture"
                onChange={handleImage}/>
            </FormGroup>
            <FormGroup>
                {errors.userName &&
                <FormLabel>
                    {errors.userName}
                </FormLabel>}
                <FormControl
                autoFocus={true}
                name="userName"
                placeholder="Please enter User's full name"
                type="text"
                value={user.userName}
                onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                {errors.userEmail &&
                <FormLabel>
                    {errors.userEmail}
                </FormLabel>}
                <FormControl
                name="userEmail"
                placeholder="Please enter User's email"
                type="email"
                value={user.userEmail}
                onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                {errors.userAddress &&
                <FormLabel>
                    {errors.userAddress}
                </FormLabel>}
                <FormControl
                name="userAddress"
                placeholder="Please enter User's address: country / city / street / postal code"
                type="text"
                value={user.userAddress}
                onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                {errors.userTelephone &&
                <FormLabel>
                    {errors.userTelephone}
                </FormLabel>}
                <FormControl
                name="userTelephone"
                placeholder="Please enter User's personal telephone"
                type="text"
                value={user.userTelephone}
                onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                {errors.userPassword &&
                <FormLabel>
                    {errors.userPassword}
                </FormLabel>}
                <FormControl
                name="userPassword"
                placeholder="Please enter User's password : min 8 symbols"
                type="password"
                value={user.userPassword}
                onChange={handleChange}/>
            </FormGroup>
            <Button
            type="submit"
            disabled={isDisabled}>
                REGISTER
            </Button>
        </Form>
    );
}


UserRegisterComponent.propTypes = {
    user:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleImage:PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired
}

export default UserRegisterComponent;
