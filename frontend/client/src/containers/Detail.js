import Layout from "components/Layout";
import { useParams } from "react-router-dom";
import { useGetPostsQuery, useGetCommentsQuery} from 'features/blogApi';
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { getMyUser, postComment } from "features/user";



const Detail = (props) => {
    
    const userName = useSelector(state => state.user.username)
    const { isAuthenticated } = useSelector(state => state.user);
    const params = useParams();
    const dispatch = useDispatch();
    const comment = useRef(null);


    const { 
        data:posts,
        isLoading: postLoading,
        isSuccess: postSuccess,
        isError: postError,
        error
       } = useGetPostsQuery()
    
    const {
        data: postedComments,
        isLoading: commentsLoading,
        isSuccess: commentsSuccess,
    } = useGetCommentsQuery()

    let content = []
    let len
    let commentLen
    let comments

    

    const onSubmit = e => {
        let commentPost = comment.current.value
        dispatch(postComment({comment: commentPost,post: postId, username: userName}))
        e.preventDefault();
        window.location.reload(false);
    }
    if (postLoading || commentsLoading) {
        content = <h1>Loading...</h1>
        return ( content)
        
    } else if (postSuccess && commentsSuccess) {
        len = posts.length;
        commentLen = postedComments.length;
        var currentComments = []
        var filteredComments = []
        var postId
        var post

        for (let count = 0; count < len; count++) {
    
            if (posts[count].slug === params.slug) {
                post = count;
                postId = posts[count].id
            }

        for (let count=0; count < commentLen; count++) {
                if (postedComments[count].post === postId ){
                    currentComments.push(postedComments[count])
                }
            
        
        }
        /* Converting to a set removes duplicates */
        const removeDuplicates = [...new Set(currentComments)]
        filteredComments = Array.from(removeDuplicates);
        

            if (isAuthenticated) {
                comments = 
                <div className="mb-3">
                    <label htmlFor="commentTextArea" className="form-label">Post a comment:</label>
                    <textarea ref={comment} className="form-control" id="commentTextArea" rows="3"></textarea>
                    <button type="button" onClick={onSubmit} className="btn btn-primary mt-3"
                    >Submit</button>
                </div>

              
            }
            else if (!isAuthenticated) {
                comments = <div className="alert alert-dark">Log in to post a comment</div>

            }
        }
    } else if (postError) {
        content = <div>{error.toString()}</div>
    }

    const renderComments = (props) => {
            let length = filteredComments.length;
            let rendered = [];
            if (length === 0){
                rendered = "No comments yet"
            }   else {  
                for (let count=0; count < length; count++ ) {
                    rendered.push(
                        <div className="card mt-1 mb-1" key={filteredComments[count].id}>
                        <div className="card-body">
                            <p className="card-author">{filteredComments[count].username} says:</p>
                            <p className="card-text">{filteredComments[count].comment}</p>
                        </div>
                    </div>
                    
                    );
            
                }
            }
            return rendered;
        }
        
    return (
        <Layout title='Post Detail' content='Detailed view of blog post'>            
            <div className="card mb-3">
            <div className='card-header'><span className='badge text-bg-success'>Category: {posts[post].category}</span></div>

                <img src={posts[post].image} className="card-img-top" alt={posts[post].title}/>
                <div className="card-body">
                    <h1 className="card-title">{posts[post].title}</h1>
                    <p className="card-author text-muted">Posted by {posts[post].author_name} on {posts[post].date}</p>
                    <p className="card-text">{posts[post].post}</p>
                </div>
                </div>
                <div>{comments}</div>
                
                <div className="col">
                    <div>
                    <ul className="list-group list-group-flush">
                        {renderComments()}
                    </ul>
                    </div>
                </div>
            
        </Layout>
    )
}

export default Detail;