import { useState } from "react";
import { useNavigate } from "react-router";

const AdminLogin = () => {

  const API = process.env.REACT_APP_API || 'http://localhost:5000/';

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isErr, setIsErr] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {id, password}
    console.log(data);
    fetch(`${API}admin/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      } 
    })
    .then(response => {
      // console.log(response)
      if(response.status === 400){
        setIsErr(true)
        throw new Error('Invalid Credentials')
      }
      return response.json()
    }).then(result => {
      setIsErr(false)
      // console.log('Success: ', result)
      localStorage.setItem('jwtSecurity', result.token)
      navigate('/');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return(
    <div className="create">
      <h2>Login</h2>
      <form onSubmit = {handleSubmit}>
        <label htmlFor="text">Email</label>
        <input type="text" 
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter ID" 
        required 
        />
        <label htmlFor="psw">Password</label>
        <input type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password" 
        required />
        <button>Login</button>
      </form>
      {isErr && <h2>Invalid Credentials</h2>}
    </div>
  )
}

export default AdminLogin;