import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import Blogs from './Blogs';
import { NotFound } from 'http-errors';
import BlogDetail from './BlogDetail';
import AdminLogin from './AdminLogin';
import EditBlog from './EditBlog';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar /> 
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/blogs" element={<Blogs />}/>
          <Route path="/create" element={<Create />}/>
          <Route  path="/blogs/:id" element={<BlogDetail />}/>  
          <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route path="/editBlog/:id" element={<EditBlog />}/>
          <Route path ="*" element={<NotFound />}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;