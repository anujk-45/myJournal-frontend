import { useState } from "react";
import { useNavigate } from "react-router";

const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [isPending,setIsPending] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    const API = process.env.REACT_APP_API || 'http://localhost:5000/';
    console.log(e.target.value);
    e.preventDefault();
    const blog = {title, description, markdown};
    const token = localStorage.getItem('jwtSecurity');
    setIsPending(true)
    fetch(`${API}blogs/addBlog`, {
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
      throw new Error('Error in adding the blog')
    }
    return response.json()
  }).then(result => {
    console.log("Blog added succesfully", result)
    setIsPending(false);
    navigate('/blogs');
  }).catch((e) => {
    setIsPending(false);
    console.log(e)
  })
    
    console.log(blog)
  }

  return ( 
    <div className="create">
      <h2>Add a New Blog</h2>
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
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Update Blog</button>}
        
      </form>
    </div>
   );
}
 
export default Create;