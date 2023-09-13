import React,{useState} from 'react'
import Layout from '../../components/layouts/Layout'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
 function SignUp() {
    // Creating state for form data
    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress ] = useState("");
    const [question, setQuestion] = useState("");

    // making variable of use navigate
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault() 
      // console.log(name, email, password, phone, address);
      // toast.success("Register Successfully")
      try {
          let res = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/register`, {
          name,
          email,
          password,
          phone,
          address,
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
    <Layout title={"Sign-up"}>
       <div className='form-container'>
       <h2>SignUp Form</h2>
       <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName1" 
    placeholder='Enter your name...' required/>
  </div>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder='Enter your email...' id="exampleInputEmail1" required />
  </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder='Enter your password...'  id="exampleInputPassword1" required/>
  </div>
  <div className="mb-3">
    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder='Enter your number...' id="exampleInputPhone1" required />
  </div>
  <div className="mb-3">
    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder='Enter your address...' id="exampleInputAdress1" required/>
  </div>
  <div className="mb-3">
    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="form-control" placeholder='what is your hobby?' id="exampleInputquestion1" required/>
  </div>
  
  
  <button type="submit" className="btn btn-primary submit-btn">Submit</button>
</form>

  </div>

    </Layout>
    
  )
}

export default SignUp