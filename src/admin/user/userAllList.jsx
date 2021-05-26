import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {deleteUserAdmin, getAllUsersAdmin} from "../../services/userService";
import TableComponent from "../components/tableComponent";
import {toast, Zoom} from "react-toastify";


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


    handleDelete = async (user) => {
        const allUsers = this.state.users;
        const users = allUsers.filter(usr => usr._id !== user._id);
        this.setState({users});

        try {
            await deleteUserAdmin(user._id);
            toast(`User : ${user.userName} was successfully deleted`, {
                position: "top-center",
                transition: Zoom
            })
        } catch (error) {
            if (error.response && error.response.status === 404) console.log("User with the given ID was already deleted!");
            toast.error("This user has already been deleted!");
            this.setState({users: allUsers});
        }
    }

    adminRedirect = () => {
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
