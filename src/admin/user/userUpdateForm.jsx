import React, {Component} from 'react';
import {Button, Image} from "react-bootstrap";
import Joi from "joi";
import {picUrl} from "../../config.json";
import {toast, Zoom} from "react-toastify";
import UserRegisterComponent from "../components/userRegisterComponent";
import {getUserAdmin, updateUserAdmin} from "../../services/userService";
import {uploadImageAdmin} from "../../services/imageService";

class UserUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                userName: '',
                userPassword: '',
                userEmail: '',
                userPicture: '',
                userAddress: '',
                userTelephone: ''
            },
            errors: {},
            isDisabled: true,
            url:null,
            uploadedPicture: null,
            visiblePicture: null
        }
    }

    schema = Joi.object({
        userName: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label('User name'),
        userPassword: Joi.string()
            .required()
            .min(8)
            .max(255)
            .label('User password')
            .trim(true),
        userEmail: Joi.string()
            .required()
            .min(5)
            .max(50)
            .trim(true)
            .label('User email'),
        userPicture: Joi.string()
            .required()
            .min(5)
            .max(100)
            .label('User picture'),
        userAddress: Joi.string()
            .required()
            .min(5)
            .max(100)
            .label('User address'),
        userTelephone: Joi.string()
            .required()
            .min(5)
            .max(50)
            .trim(true)
            .pattern(new RegExp('^[\\+]?[0-9]?()[0-9](\\s|\\S)(\\d[0-9]{7,})$'))
    });


    adminRedirect = () => {
        this.props.history.push("/admin/userlist");
    }


    async componentDidMount() {
        const url = picUrl;
        await this.populateUserForm();
        this.setState({ url });
    }


    handleChange = (event) => {
       const user = {...this.state.user};
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;
       user [name] = value;

       this.setState({
           user,
           isDisabled: false
       });
    }


    handleImage = (event) => {
       const user = {...this.state.user};
       const target = event.target;
       const value = event.target.files[0].name;
       const name = target.name;
       user[name] = value;
       this.setState({
           user,
           uploadedPicture: event.target.files[0],
           visiblePicture: URL.createObjectURL(event.target.files[0])
       });
       console.log(event.target.files[0].name);
    }


    handleSubmit =  async(event) => {
       event.preventDefault();
       const errors = this.validateUserUpdate();
       this.setState({errors:errors || {}});
       if(errors) return;

        //Uploading only if the uploadPicture property !== null
        if(this.state.uploadedPicture !== null){
            try {
                const data = new FormData();
                data.append('file', this.state.uploadedPicture);
                await uploadImageAdmin(data);
                toast("New Image successfully uploaded!", {
                    position: "top-center",
                    transition: Zoom,
                });
            }
            catch (error) {
                if(error.response) console.log(error.response.statusText);
            }
        }

       const user = {
           userName: this.state.user.userName,
           userPassword: this.state.user.userPassword,
           userEmail: this.state.user.userEmail,
           userPicture: this.state.user.userPicture,
           userAddress: this.state.user.userAddress,
           userTelephone: this.state.user.userTelephone
       };

       await updateUserAdmin(user,this.state.user._id);
       toast('User updated successfully!',{
           position: 'top-center',
           transition: Zoom
       });

    }



    mapToViewModel(user) {
        return {
            _id: user._id,
            userName: user.userName,
            userPassword: '',
            userEmail: user.userEmail,
            userPicture: user.userPicture,
            userAddress: user.userAddress,
            userTelephone: user.userTelephone
        };
    }



    async populateUserForm() {
        try {
            const userId = this.props.match.params.id;
            const {data: user} = await getUserAdmin(userId);
            this.setState({user: this.mapToViewModel(user)});
        }
        catch (error) {
            if(error.response && error.response.status === 404)
                toast.error('There is No User with the given ID',{
                    position: "top-center",
                    transition: Zoom
                });
        }
    }



    validateUserUpdate = () => {
        const user = {
            userName: this.state.user.userName,
            userPassword: this.state.user.userPassword,
            userEmail: this.state.user.userEmail,
            userPicture: this.state.user.userPicture,
            userAddress: this.state.user.userAddress,
            userTelephone: this.state.user.userTelephone
        };
        const options = {abortEarly: false};
        const result = this.schema.validate(user,options);
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
                    BACK TO USER LIST
                </Button>

                {this.state.visiblePicture === null &&
                <Image
                src={this.state.url + this.state.user.userPicture}
                style={{width: 300, height: "auto"}}/>}

                {this.state.visiblePicture !== null &&
                <Image
                src={this.state.visiblePicture}
                style={{width: 300, height: "auto"}}/>}

                <UserRegisterComponent
                    errors={this.state.errors}
                    handleChange={this.handleChange}
                    handleImage={this.handleImage}
                    handleSubmit={this.handleSubmit}
                    isDisabled={this.state.isDisabled}
                    user={this.state.user}/>
            </div>
        );
    }
}

export default UserUpdateForm;
