import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const API = process.env.REACT_APP_API || 'http://localhost:5000/';
  const token = localStorage.getItem('jwtSecurity');
  let navigate = useNavigate();

  const handleLogout = () => {
    fetch(`${API}admin/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      } 
    }).then(response => {
      // console.log(response)
      if(response.status === 500){
        throw new Error('Error occured')
      }
      localStorage.removeItem('jwtSecurity')
      console.log('logged out')
      navigate('/')
    })
    .catch(error => console.log(error))
  }

  return ( 
    <nav className="navbar">
      <h1>AKJ</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/">About</Link>
        { token && <Link to="/create">Add Blog</Link> }
        { token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
   );
}
 
export default Navbar;