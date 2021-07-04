import React from 'react';
import {Button, Image, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {picUrl} from "../../config.json";
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

                            if (key === 'userPicture') {
                                return (
                                    <td key={key}>
                                       <Image
                                       src={picUrl+item[key]}
                                       style={{width:100, height:'auto'}}/>
                                    </td>
                                )
                            } else {
                                return (
                                    <td key={key}>
                                        {item[key]}
                                    </td>
                                )
                            }
                        })
                    }

                    <td>
                        <Link
                            to={`${url}${item._id}`}>
                            Update
                        </Link>
                    </td>

                    <td>
                        <Button
                            onClick={() => handleDelete(item)}>
                            Delete
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
