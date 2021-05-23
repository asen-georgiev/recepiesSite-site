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
import UserRegisterForm from "./admin/user/userRegisterForm";

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
                        <Route path="/admin/userregister" component={UserRegisterForm}/>
                        <Route path="/admin" component={AdminPanel}/>
                    </Switch>}
                </Switch>
            </div>
        );
    }

}

export default App;


