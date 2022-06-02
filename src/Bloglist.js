import { Link } from "react-router-dom";

const Bloglist = ({ blogs}) => {
  return ( 
    <div className="blog-list">
      <div className="home">
        {Array.from(blogs).map((blog) => (
          <div className="blog-preview" key = {blog._id}>
            <Link to={`/blogs/${blog._id}`}>
              <h2>{ blog.title }</h2>
              <p>{blog.description}</p>
              {/* <p>👁 {blog.views}</p> */}
              <p>{blog.createdAt.toString().substring(0,10)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
   );
}

export default Bloglist;