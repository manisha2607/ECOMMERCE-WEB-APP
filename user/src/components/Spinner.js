import React,{useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Spinner({path = "login"})  {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue)
        },1000)
        count === 0 && navigate(`/${path}`,{
            state: location.pathname
        })
        return () => clearInterval(interval)
    }, [count, navigate, location, path])

  return (
    <>
        <div className="d-flex justify-content-center align-items-center flex-column" style={{height:"100vh"}}>
         <h1> Redirecting to you in {count} second... </h1>
         <div className="spinner-border" role="status">
        <h5 className="visually-hidden">Loading...</h5>
</div>


      </div>
    </>
    
  )
}

export default Spinner