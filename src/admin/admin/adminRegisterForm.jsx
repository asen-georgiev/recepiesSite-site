import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import Joi from "joi";
import {toast,Zoom} from "react-toastify";
import AdminRegisterComponent from "../components/adminRegisterComponent";
import {registerAdmin} from "../../services/adminService";

class AdminRegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: {
                adminName: '',
                adminPassword: '',
                adminEmail: '',
                isAdmin: false
            },
            errors: {},
            isDisabled: true
        }
    }

    schema = Joi.object({
        adminName: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label('Admin name'),
        adminEmail: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label('Admin email'),
        adminPassword: Joi.string()
            .required()
            .min(8)
            .max(255)
            .label('Admin password'),
        isAdmin: Joi.boolean()
            .required()
            .valid(true)
            .messages({
                'any.only': `Admin rights must be declared explicitly`
            })

    })


    //Handling the event of the input of the form and setting the new properties in the state
    handleChange = (event) => {
        const admin = {...this.state.admin};
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        admin [name] = value;

        this.setState({
            admin,
            isDisabled: false
        });
    }

    //Handling the submitted form
    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validateAdminInput();
        this.setState({
            errors:errors || {}
        });
        if(errors) return;

        const admin = {
            adminName: this.state.admin.adminName,
            adminEmail: this.state.admin.adminEmail,
            adminPassword: this.state.admin.adminPassword,
            isAdmin: this.state.admin.isAdmin
        };

        await registerAdmin(admin);

        toast('Admin registration was successful!',{
            position: "top-center",
            transition: Zoom
        });
    }


    //Validating the input from the registration form with the Joi schema validation
    //If errors then storing them in the error object in the state;
    validateAdminInput = () => {
        const admin = {
            adminName: this.state.admin.adminName,
            adminEmail: this.state.admin.adminEmail,
            adminPassword: this.state.admin.adminPassword,
            isAdmin: this.state.admin.isAdmin
        };
        const options = {abortEarly: false};
        const result = this.schema.validate(admin, options);
        console.log(result);

        if (!result.error) return null;
        const errors = {};

        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }


    //Redirecting to Admin panel page through history push method
    adminRedirect = () => {
        this.props.history.push('/admin');
    }



    render() {
        return (
            <div>
                <Button
                    onClick={this.adminRedirect}>
                    BACK TO ADMIN PANEL
                </Button>
                <AdminRegisterComponent
                    admin={this.state.admin}
                    errors={this.state.errors}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    isDisabled={this.state.isDisabled}
                />
            </div>
        );
    }
}

export default AdminRegisterForm;
