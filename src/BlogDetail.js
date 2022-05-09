import { useParams } from "react-router-dom";
// import useFetch from "./useFetch";
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:5000/';

  const { id } = useParams();
  const [blog, setBlog] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem('jwtSecurity');
  
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
  
  return (
    <div className="blog-details">
      <div>
        <h1 className="main-heading">{blog.title}</h1>
        <div>
          {token && <button onClick={() => {editBlog(blog)}}>Edit Blog</button>}
          {token && <button onClick={() => {deleteBlog(blog)}}>Delete</button>}
        </div>
      </div>
      <div className="markdown">
        <ReactMarkdown>{blog.markdown}</ReactMarkdown>
      </div>
    </div>
  )
}

export default BlogDetail;