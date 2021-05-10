import './App.css';
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {getCurrentAdmin} from "./services/adminLoginService";
import jwtDecode from "jwt-decode";
import AdminLoginForm from "./admin/admin/adminLoginForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            admin:null
        }
    }

    componentDidMount() {
        const jwtAdmin = getCurrentAdmin();
        if(jwtAdmin){
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
            </Switch>
        </div>
    );
  }
}

export default App;


