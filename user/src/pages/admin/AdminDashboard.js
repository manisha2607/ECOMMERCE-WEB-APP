import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu  from '../../components/layouts/AdminMenu'
import { useAuth } from '../../Context/auth'

function AdminDashboard() {
  const [auth] = useAuth()

  return (
    <Layout title={"Admin-Dashboard"}>
        <div className='container-fluid m-3 p-3 ' >
        <div className='row '>
          <div className='col-md-3'>
              <AdminMenu />
          </div>
          <div className='col-md-9 p-3'>
            <div className='card w-75 p-3'>
              <h5> Admin Name : {auth?.user?.name} </h5>
              <h5> Admin Email : {auth?.user?.email} </h5>
              <h5> Admin Contact : {auth?.user?.phone} </h5>
              <h5> Admin Hobby : {auth?.user?.question} </h5>
            </div>
          </div>
        </div>

        </div>
    </Layout>
    
  )
}

export default AdminDashboard