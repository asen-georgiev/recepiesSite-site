import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import Joi from "joi";
import {toast, Zoom} from "react-toastify";
import AdminRegisterComponent from "../components/adminRegisterComponent";
import {getAdmin, updateAdmin} from "../../services/adminService";

class AdminUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: {
                adminName:'',
                adminPassword: '',
                adminEmail: '',
                isAdmin: false
            },
            errors: {},
            isDisabled: true
        }
    }

    //Input Schema
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
                'any.only':`Admin rights must be declared explicitly`
            })
    })


    //Redirecting to Admin panel after Admin update through history.push method
    adminRedirect = () => {
        this.props.history.push('/admin/adminlist');
    }



    async componentDidMount() {
        await this.populateAdminForm();
    }



    //Handling change from the input form
    handleChange = (event) => {
        const admin = {...this.state.admin};
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        admin [name] = value;
        this.setState({
            admin,
            isDisabled: false
        })
    }



    //Submitting the updated information, validating first, then sending to backend through service the Admin object.
    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validateAdminUpdate();
        this.setState({errors: errors || {}});
        if(errors) return;

        const admin = {
            adminName: this.state.admin.adminName,
            adminEmail: this.state.admin.adminEmail,
            adminPassword: this.state.admin.adminPassword,
            isAdmin: this.state.admin.isAdmin
        };

        await updateAdmin(admin,this.state.admin._id);
        this.setState({isDisabled: true});
        toast('Admin update was successfull!',{
            position: "top-center",
            transition: Zoom,
        });
    }



    //Creating view model(it is not mandatory, but it is helpful and useful for controlling the input properties.
    mapToViewModel(admin) {
        return {
            _id: admin._id,
            adminName: admin.adminName,
            adminEmail: admin.adminEmail,
            adminPassword: '',
            isAdmin: admin.isAdmin
        };
    }



    //Async function populating the Admin form with the property values from the DB
    async populateAdminForm(){
        try{
            const adminId = this.props.match.params.id;
            const {data:admin} = await getAdmin(adminId);
            this.setState({admin:this.mapToViewModel(admin)});
        }
        catch (e) {
            if(e.response && e.response.status === 404)
                console.log('There is no Admin with the given ID');
        }
    }



    //Validating the input from the update form with the Joi schema
    validateAdminUpdate = () => {
        const admin = {
            adminName: this.state.admin.adminName,
            adminEmail: this.state.admin.adminEmail,
            adminPassword: this.state.admin.adminPassword,
            isAdmin: this.state.admin.isAdmin
        };
        const options = {abortEarly:false};
        const result = this.schema.validate(admin,options);
        console.log(result);

        if(!result.error) return null;
        const errors = {};

        for(let item of result.error.details){
            errors[item.path[0]] = item.message;
        }
        return errors;
    }





    render() {
        return (
            <div>
                <Button
                    onClick={this.adminRedirect}>
                    BACK TO ADMIN LIST
                </Button>
                <AdminRegisterComponent
                    admin={this.state.admin}
                    errors={this.state.errors}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    isDisabled={this.state.isDisabled}/>
            </div>
        );
    }
}

export default AdminUpdateForm;
