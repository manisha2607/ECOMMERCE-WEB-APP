import React,{useState} from 'react'
import Layout from '../../components/layouts/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const ForgetPassword = () => {
    const [email, setEmail ] = useState("");
    const [newPassword, setNewPassword ] = useState("");
    const [question, setQuestion ] = useState("");
    //creating object of useAuth
    
  
    const navigate = useNavigate();
    
  
    const handleSubmit = async (event) => {
      event.preventDefault() 
      // console.log(name, email, password, phone, address);
      // toast.success("Register Successfully")
      try {
          let res = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/forgot-password`, { 
          email,
          newPassword,
          question
          }
          )
          if(res.data.success){
             toast.success(res.data.message);
             navigate('/login');
          } else {
            toast.error(res.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error("Something went wrong!")
      }
    }
  
  return (
    <Layout title={"Forget-Password"}>
        <div className='form-container'>
        <h3>Reset-Password-Form</h3>
       <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder='Enter your email...' id="exampleInputEmail1" required />
  </div>
  <div className="mb-3">
    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="form-control" placeholder='Enter your hobby...'  id="exampleInputPassword1" required/>
  </div> 
  <div className="mb-3">
    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" placeholder='Enter your newPassword...'  id="exampleInputPassword1" required/>
  </div>  
   
  <button type="submit" className="btn btn-primary">Reset-Password</button>
  
</form>

  </div>
    </Layout>
    
  )
}

export default ForgetPassword