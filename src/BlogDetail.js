import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from 'classnames'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const BlogDetail = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:5000/';

  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('jwtSecurity');

  // for comments
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [commentState, setCommentState] = useState('Add Comment');

  
  useEffect(() => {
    fetch(`${API}blogs/`+ id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      } 
    }).then((response) => {
      if(!response.ok){
        throw new Error('Unable to fetch blog')
      }
      return response.json()
    }).then((result) => {
      console.log("Blog ",result)
      setBlog(result);
      setComments(result.comments);
    }).catch((e) => {
      console.log(e);
    })
  },[id,API])

  const editBlog = (blog) => {
    navigate('/editBlog/'+blog._id);
  }

  const deleteBlog = (blog) => {
    console.log(blog._id);
    fetch(`${API}blogs/`+ id, {
      method: 'DELETE',
      body: JSON.stringify({id: blog._id}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      } 
    }).then((response) => {
      if(!response.ok){
        throw new Error('unable to Delete the blog')
      }
      return response.json()
    }).then((result) => {
      console.log('Successfully Deleted Blog',result);
      navigate('/');
    }).catch((e) => {
      console.log(e);
    })
  }

  const newComment = {name, comment};

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}blogs/updateBlog`, {
      method:'POST',
      body: JSON.stringify({id, newComment}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if(!response.ok){
        console.log(response);
        throw new Error('Error in updating comment')
      }
      console.log(response, blog);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleComment = () => {
    if(commentState === 'Add Comment'){
      setFormIsOpen(true);
      setCommentState('Close');
    }else {
      setFormIsOpen(false);
      setCommentState('Add Comment');
    }
  }
  
  return (
    <div className="blog-details">
      <div>
        <h1 className="main-heading">{blog.title}</h1>
        <div>
          {token && <button id="blog-details-button" onClick={() => {editBlog(blog)}}>Edit Blog</button>}
          {token && <button id="blog-details-button" onClick={() => {deleteBlog(blog)}}>Delete</button>}
        </div>
        <div className="markdown">
          <ReactMarkdown>{blog.markdown}</ReactMarkdown>
        </div>
        <div className="comment-section">
          <h2>Comments 💬<button onClick={handleComment}>{commentState}</button></h2>
          <div className={classNames('comment-form', {'hidden-comment-form': !formIsOpen})}>
            <form onSubmit = {handleSubmit}>
              <label htmlFor="text">Name</label>
              <input type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name" 
              required 
              />
              <label htmlFor="text">Comment</label>
              <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment" 
              required />
              <button>Comment</button>
            </form>
          </div>
          <div className="comment-list">
            {Array.from(comments).map((comment) => (
              <div className="comment-preview" key = {comment._id}>
                <div className="comment-line1">
                  <h4 id="commment-name">{comment.name}</h4>
                  <p>{comment.addedAT.toString().substring(0,10)}, {comment.addedAT.toString().substring(11,19)}</p>
                </div>
                <p id="comment-comment">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail;