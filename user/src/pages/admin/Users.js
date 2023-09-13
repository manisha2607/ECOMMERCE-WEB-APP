import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'

function Users() {
  return (
    <Layout>
        <div className='container-fulid m-3 p-3' >
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9 p-3'>
                    <h1>Users</h1>
                </div>
            </div>
        </div>
    </Layout>
    
  )
}

export default Users