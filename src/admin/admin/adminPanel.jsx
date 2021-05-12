import React, {Component} from 'react';
import table from "../components/adminPanelTabs";
import AdminPanelTable from "../components/adminPanelTable";
import {adminLogout} from "../../services/adminLoginService";
import {Button} from "react-bootstrap";


class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: table
        }
    }

    adminLogout = () => {
        adminLogout();
    }

    render() {
        return (
            <div>
                <AdminPanelTable
                    tabs={this.state.table}/>
                <Button
                    href="/adminlogin"
                    onClick={this.adminLogout}>
                    LOGOUT
                </Button>
            </div>
        );
    }
}

export default AdminPanel;
