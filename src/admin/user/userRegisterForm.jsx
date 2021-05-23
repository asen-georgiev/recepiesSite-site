import React, {Component} from 'react';
import Joi from "joi";
import {toast,Zoom} from "react-toastify";
import {registerUserAdmin} from "../../services/userService";
import UserRegisterComponent from "../components/userRegisterComponent";
import {uploadImageAdmin} from "../../services/imageService";
import {Image} from "react-bootstrap";

class UserRegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                userName:'',
                userPassword:'',
                userEmail:'',
                userPicture:'',
                userAddress:'',
                userTelephone:''
            },
            errors:{},
            isDisabled:true,
            uploadedPicture:'',
            visiblePicture:''
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
    })


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

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validateUserRegister();
        this.setState({errors: errors || {}});
        console.log(errors);
        if(errors) return;

       const user = {
           userName: this.state.user.userName,
           userPassword: this.state.user.userPassword,
           userEmail: this.state.user.userEmail,
           userPicture: this.state.user.userPicture,
           userAddress: this.state.user.userAddress,
           userTelephone: this.state.user.userTelephone
       };

       await registerUserAdmin(user);
       toast('Successful registration!',{
           position: "top-center",
           transition:Zoom
       });

       const data = new FormData();
       data.append('file', this.state.uploadedPicture);
       await uploadImageAdmin(data);
       toast('Image uploaded!',{
           position: "top-center",
           transition: Zoom
       });

       this.setState({
           isDisabled: true
       });

       setTimeout(() => {
           window.location.href = "/admin"
       },2000);
    }



    handleImage = (event) => {
        const user  = {...this.state.user};
        user['userPicture'] = event.target.files[0].name;

       this.setState({
           isDisabled: false,
           user,
           uploadedPicture: event.target.files[0],
           visiblePicture: URL.createObjectURL(event.target.files[0]),
       });

        console.log(event.target.files[0]);
    }


    validateUserRegister = () => {
        const user = {
            userName: this.state.user.userName,
            userPassword: this.state.user.userPassword,
            userEmail: this.state.user.userEmail,
            userPicture: this.state.user.userPicture,
            userAddress: this.state.user.userAddress,
            userTelephone: this.state.user.userTelephone
        }
        const options = {abortEarly: false};
        const result = this.schema.validate(user,options);

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

                {this.state.visiblePicture &&
                <Image
                src={this.state.visiblePicture}
                style={{width:330, height:'auto'}}/>}


               <UserRegisterComponent
                   user={this.state.user}
                   errors={this.state.errors}
                   handleChange={this.handleChange}
                   handleImage={this.handleImage}
                   handleSubmit={this.handleSubmit}
                   isDisabled={this.state.isDisabled}/>
            </div>
        );
    }
}

export default UserRegisterForm;
