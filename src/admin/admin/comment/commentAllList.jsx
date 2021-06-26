import React, {Component} from 'react';
import {deleteComment, getComments} from "../../../services/commentService";
import CommentsTableComponent from "../../components/commentsTableComponent";
import {toast, Zoom} from "react-toastify";

class CommentAllList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    async componentDidMount() {
        const {data: comments} = await getComments();
        this.setState({
            comments
        });
        console.log(this.state.comments);
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    handleDelete = async (comment) => {
        const allComments = this.state.comments;
        const comments = allComments.filter(com => com._id !== comment._id);
        this.setState({comments});

        try {
            await deleteComment(comment._id);
            toast(`Comment was successfully deleted!`, {
                position: "top-center",
                transition: Zoom
            });
        } catch (error) {
            if (error.response && error.response.status === 404) console.log('Comment was not found');
            toast.error('This comment has already been deleted!')
            this.setState({comments: allComments});
        }
    }


    handleUpdate = (comment) => {
        this.props.history.push(`/admin/comments/${comment._id}`);
    }

    render() {
        return (
            <div>
                <CommentsTableComponent
                    comments={this.state.comments}
                    handleDelete={this.handleDelete}
                    handleUpdate={this.handleUpdate}/>
            </div>
        );
    }
}

export default CommentAllList;
