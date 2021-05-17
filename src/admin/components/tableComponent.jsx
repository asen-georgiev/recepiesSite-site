import React from 'react';
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";


function TableComponent(props) {
    const {items, url, handleDelete} = props;
    return (
        <Table>
            <tbody>
            {items.map(item => (

                <tr key={item._id}>
                    {
                        Object.keys(item).map(key => {
                            return (
                                <td key={key}>
                                    {item[key]}
                                </td>
                            )
                        })
                    }
                    <td>
                        <Link
                            to={`${url}${item._id}`}>
                            UPDATE
                        </Link>
                    </td>
                    <td>
                        <Button
                            onClick={() => handleDelete(item)}>
                            DELETE
                        </Button>
                    </td>
                </tr>

            ))}
            </tbody>
        </Table>
    );
}

TableComponent.propTypes = {
    items: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
}

export default TableComponent;
