import React, {Component} from 'react';
import {deleteAdmin, getAllAdmins} from "../../services/adminService";
import TableComponent from "../components/tableComponent";
import {toast, Zoom} from "react-toastify";
import {Button} from "react-bootstrap";

class AdminAllList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: []
        }
    }


    async componentDidMount() {
        const {data: admins} = await getAllAdmins();
        // admins.map(admin => {
        //     delete admin.adminPassword;
        // })
        this.setState({
            admins
        });
        console.log(this.state.admins);
    }



    //First creating new array with objects different from the selected for deletion admin object.
    //And setting the admins array in the state.
    //After that trying to delete the admin object from the DB and if there is an error
    //I am again setting the admins object to the previous array - allAdmins;
    handleDelete = async (admin) => {
        const allAdmins = this.state.admins;
        const admins = allAdmins.filter(adm => adm._id !== admin._id);
        this.setState({admins});

        try {
            await deleteAdmin(admin._id);
            toast(`Admin : ${admin.adminName} was successfully deleted`, {
                position: "top-center",
                transition: Zoom,
            });
        } catch (e) {
            if (e.response && e.response.status === 404) console.log("Admin with the given ID was not found!");
            toast.error("This Admin has already been deleted.");
            this.setState({admins: allAdmins});
        }
    }


    //I am redirecting back to Admin Panel
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
                    items={this.state.admins}
                    url="/admin/adminupdate/"/>
            </div>
        );
    }
}

export default AdminAllList;
