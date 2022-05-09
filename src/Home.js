import Bloglist from './Bloglist';
import useFetch from "./useFetch";
const Home = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:5000/';
  const url = `${API}blogs`;
  const flag = '0';
  const {data: blogs, isPending, error} = useFetch({ url, flag });

  return (
    <div className="home">
      {error && <div>{error}</div>}
      { isPending && <div>Loading...</div> }
      {blogs && <h1>Hello World👋, I'm Anuj</h1>}
      {/* {blogs && <h2>Most Popular Blogs</h2>} */}
      {blogs && <Bloglist blogs = {blogs}/>}
    </div>
  )
}
 
export default Home;
