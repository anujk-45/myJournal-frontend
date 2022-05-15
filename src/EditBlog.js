import { useEffect, useState } from "react";
import { useParams} from "react-router";
import { useNavigate } from "react-router-dom";

const EditBlog = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:5000/';
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [markdown, setMarkdown] = useState(blog.markdown);
  const [isPending, setIsPending] = useState(false);
  const token = localStorage.getItem('jwtSecurity');

  const navigate = useNavigate();
  
  useEffect(()=> {
    console.log("Insider edit blog useEffect");
    fetch(`${API}blogs/edit/`+id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      // console.log(response);
      if(!response.ok){
        throw new Error('Unable to fetch blog');
      }
      return response.json();
    }).then((result) => {
        console.log('Blog',result.title, result.description, result.markdown);
        setBlog(result);
        setTitle(result.title);
        setDescription(result.description);
        setMarkdown(result.markdown);
    }).catch((e) => {
      console.log(e);
    })
  }, [id, token, API]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true)
    fetch(`${API}blogs/edit/`+id , {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
      markdown
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => {
    if(!response.ok){
      throw new Error('Error in updating the blog')
    }
    setIsPending(false);
    return response.json()
  }).then(result => {
    console.log("Blog updated succesfully", result)
    navigate('/blogs');
  }).catch((e) => {
    setIsPending(false);
    console.log(e)
  })
    
    console.log(blog)
  }

  return ( 
    <div className="create">
      <h2>Edit Blog</h2>
      <form onSubmit = {handleSubmit}>
        <label>Blog title</label>
        <input type="text" 
        required
        value = {title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Description</label>
        <textarea 
        required
        value = {description}
        onChange = {(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Markdown</label>
        <textarea 
        rows={10}
        required
        value = {markdown}
        onChange = {(e) => setMarkdown(e.target.value)}
        ></textarea>
        {!isPending && <button>Update</button>}
        {isPending && <button disabled>Updating...</button>}
        
      </form>
    </div>
   );
}
export default EditBlog;