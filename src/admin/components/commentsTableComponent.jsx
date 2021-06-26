import React from 'react';
import {Button, Table} from "react-bootstrap";
import * as PropTypes from "prop-types";

function CommentsTableComponent(props) {
    const {comments, handleDelete, handleUpdate} = props;
    return (
        <Table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Comment</th>
                <th>User name</th>
                <th>User email</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {comments.map(comment => {
                return (
                    <tr key={comment._id}>
                        <td>{new Date(comment.commentDate).toLocaleString()}</td>
                        <td>{comment.commentText}</td>
                        <td>{comment.user.userName}</td>
                        <td>{comment.user.userEmail}</td>
                        <td>
                            <Button
                                onClick={() => handleUpdate(comment)}>
                                Update
                            </Button>
                        </td>
                        <td>
                            <Button
                                onClick={() => handleDelete(comment)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    );
}

CommentsTableComponent.propTypes = {
    comments: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired
}

export default CommentsTableComponent;
