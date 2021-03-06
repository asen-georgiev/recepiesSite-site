import './App.css';
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {getCurrentAdmin} from "./services/adminLoginService";
import jwtDecode from "jwt-decode";
import AdminAllList from "./admin/admin/adminAllList";
import AdminLoginForm from "./admin/admin/adminLoginForm";
import AdminPanel from "./admin/admin/adminPanel";
import AdminRegisterForm from "./admin/admin/adminRegisterForm";
import AdminUpdateForm from "./admin/admin/adminUpdateForm";
import CommentAllList from "./admin/admin/comment/commentAllList";
import UserRegisterForm from "./admin/user/userRegisterForm";
import UserAllList from "./admin/user/userAllList";
import UserUpdateForm from "./admin/user/userUpdateForm";
import RecipeRegisterForm from "./admin/recipe/recipeRegisterForm";
import RecipeAllList from "./admin/recipe/recipeAllList";
import RecipeUpdateForm from "./admin/recipe/recipeUpdateForm";
import EmailAllList from "./admin/email/emailAllList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: null
        }
    }

    componentDidMount() {
        const jwtAdmin = getCurrentAdmin();
        if (jwtAdmin) {
            const admin = jwtDecode(jwtAdmin);
            this.setState({admin});
            console.log(admin);
        }
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <Switch>
                    <Route path="/adminlogin" component={AdminLoginForm}/>
                    {this.state.admin &&
                    <Switch>
                        <Route path="/admin/adminlist" component={AdminAllList}/>
                        <Route path="/admin/adminregister" component={AdminRegisterForm}/>
                        <Route path="/admin/adminupdate/:id" component={AdminUpdateForm}/>
                        <Route path="/admin/commentlist" component={CommentAllList}/>
                        <Route path="/admin/emaillist" component={EmailAllList}/>
                        <Route path="/admin/userlist" component={UserAllList}/>
                        <Route path="/admin/userregister" component={UserRegisterForm}/>
                        <Route path="/admin/userupdate/:id" component={UserUpdateForm}/>
                        <Route path="/admin/recipelist" component={RecipeAllList}/>
                        <Route path="/admin/reciperegister" component={RecipeRegisterForm}/>
                        <Route path="/admin/recipeupdate/:id" component={RecipeUpdateForm}/>
                        <Route path="/admin" component={AdminPanel}/>
                    </Switch>}
                </Switch>
            </div>
        );
    }

}

export default App;


