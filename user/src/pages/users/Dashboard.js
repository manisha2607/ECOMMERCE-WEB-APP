import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../Context/auth'
function Dashboard() {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard"}>
         <div className='container-fluid p-3 m-3'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu />
            </div>
            <div className='col-md-9 p-3'>
            <div className='card w-75 p-3'>
              <h5> User Name : {auth?.user?.name} </h5>
              <h5> User Email : {auth?.user?.email} </h5>
              <h5> User Contact : {auth?.user?.phone} </h5>
              <h5> User Hobby : {auth?.user?.question} </h5>
            </div>
            </div>
          </div>
         </div>
    </Layout>

   
  )
}

export default Dashboard