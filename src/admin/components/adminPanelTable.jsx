import React from 'react';
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import {Table} from "react-bootstrap";

function AdminPanelTable(props) {

    const {tabs} = props;

    return (
        <Table bordered variant="light" hover>
            <tbody>
            {tabs.map(tab => {
                return (
                    <tr key={tab._id}>
                        <td>
                            {tab.name}
                        </td>
                        <td>
                            <Link
                                to={tab.link1To}>
                                {tab.link1Name}
                            </Link>
                        </td>
                        <td>
                            <Link
                                to={tab.link2To}>
                                {tab.link2Name}
                            </Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    );
}

AdminPanelTable.propTypes = {
    tabs: PropTypes.array.isRequired
}

export default AdminPanelTable;
