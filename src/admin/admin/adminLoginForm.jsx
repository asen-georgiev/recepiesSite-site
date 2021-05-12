import React, {Component} from 'react';
import AdminLoginComponent from "../components/adminLoginComponent";
import {adminLogin, getCurrentAdmin} from "../../services/adminLoginService";
import Joi from "joi";
import {toast, Zoom} from "react-toastify";

class AdminLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminEmail:'',
            adminPassword:'',
            errors: {},
            isDisabled: false,
            loggedAdmin: null
        }
    }

    //Validating the admin input with Joi
    schema = Joi.object({
        adminEmail : Joi.string()
            .required()
            .min(5)
            .max(50)
            .label("Admin email"),
        adminPassword: Joi.string()
            .required()
            .min(8)
            .max(255)
            .label("Admin password")
    });


    componentDidMount() {
        const loggedAdmin = getCurrentAdmin();
        this.setState({loggedAdmin});
    }


    handleChange = (event) =>{
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;

       this.setState({
           [name]:value
       });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validateAdmin();
        this.setState({
            errors: errors || {}
        });
        if(errors) return;

        console.log('Login form submitted');

        const admin = {adminEmail: this.state.adminEmail, adminPassword: this.state.adminPassword};
        await adminLogin(admin);

        toast('You are now logged in!',{
            position: 'top-center',
            transition: Zoom
        });

        this.setState({isDisabled: true});
        setTimeout(function () {
            window.location.href="/admin";
        },1000);

    }


    //Validating the user input and returning error object if there are any errors
    validateAdmin = () => {
        const admin = {adminEmail: this.state.adminEmail, adminPassword: this.state.adminPassword};
        const options = {abortEarly: false};
        const result = this.schema.validate(admin, options);

        if(!result.error) return null;
        const errors = {};
        console.log("result of errors"+result);
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }


    render() {
        return (
            <div>
                {!this.state.loggedAdmin &&
                <AdminLoginComponent
                    adminEmail={this.state.adminEmail}
                    adminPassword={this.state.adminPassword}
                    disabled={this.state.isDisabled}
                    errors={this.state.errors}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}/>
                }
                {this.state.loggedAdmin &&
                <h2>
                    YOU ARE ALREADY LOGGED IN!
                </h2>
                }
            </div>
        );
    }
}

export default AdminLoginForm;
