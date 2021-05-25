import React, {Component} from 'react';
import {getAllUsersAdmin} from "../../services/userService";
import TableComponent from "../components/tableComponent";
import {Button} from "react-bootstrap";

class UserAllList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        const {data: users} = await getAllUsersAdmin();
        this.setState({
            users
        });
    }

    handleDelete = () => {
        console.log('Handle delete');
    }

    adminRedirect = () =>{
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <Button
                onClick={this.adminRedirect}>
                    BACK TO ADMIN PANEL
                </Button>
                <TableComponent
                    handleDelete={this.handleDelete}
                    items={this.state.users}
                    url="/admin/userupdate/"
                />
            </div>
        );
    }
}

export default UserAllList;
