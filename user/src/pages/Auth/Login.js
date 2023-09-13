import React,{useState} from 'react'
import Layout from '../../components/layouts/Layout'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/auth'

function Login()  {

  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");
  //creating object of useAuth
  const [auth, setAuth] = useAuth()

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault() 
    // console.log(name, email, password, phone, address);
    // toast.success("Register Successfully")
    try {
        let res = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/sign-In`, { 
        email,
        password
        }
        )
        if(res.data.success){
           toast.success(res.data.message);
           setAuth({
            ...auth, 
            user: res.data.user,
            token: res.data.token
           })
           localStorage.setItem("auth", JSON.stringify(res.data))
           navigate(location.state || '/');
        } else {
          toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!")
    }
  }

  return (
    <Layout title={"Login"}>
        <div className='form-container'>
        <h2>Login Form</h2>
       <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder='Enter your email...' id="exampleInputEmail1" required />
  </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder='Enter your password...'  id="exampleInputPassword1" required/>
  </div>  
  <button type="submit" className="btn btn-primary submit-btn">LogIn</button>
  <div className='mb-3'>
  <button type="button" className="btn btn-primary submit-btn" onClick={() => {
    navigate('/forgot-password')
  }} >Forgot-Password?</button>
  </div>
</form>

  </div>
    </Layout>
  ) 
}

export default Login