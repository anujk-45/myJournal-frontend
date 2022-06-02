import { useEffect, useState } from 'react';
import Bloglist from './Bloglist';

const Home = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:5000/';
  const url = `${API}blogs`;
  // const {data: blogs, isPending, error} = useFetch({ url, flag });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(()=> {
    console.log("Inside useEffect");
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      } 
    }).then((response) => {
      setIsPending(false)
      if(!response.ok){
        throw new Error('Unable to fetch blogs')
      }
      return response.json()
    }).then((result) => {
      // console.log("Blog list",result)
      setBlogs(result)
    }).catch((e) => {
      setError(e);
      console.log(e);
    })
  },[url]);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {blogs && <h1>Hello World👋, I'm Anuj</h1>}
      { isPending && <div>Loading...</div> }
      {/* {blogs && <h2>Most Popular Blogs</h2>} */}
      {blogs && <Bloglist blogs = {blogs}/>}
    </div>
  )
}
 
export default Home;
