import Bloglist from './Bloglist';
import useFetch from "./useFetch";

const Blogs = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:5000/';
  const url = `${API}blogs`;
  const flag = '1';
  const {data: blogs, isPending, error} = useFetch({ url, flag });

  return (
    <div className="home">
      {error && <div>{error}</div>}
      { isPending && <div>Loading...</div> }
      {blogs && <h1>All Blogs ✍️</h1> }
      {blogs && <Bloglist blogs = {blogs}/>}
    </div>
  )
}

export default Blogs;