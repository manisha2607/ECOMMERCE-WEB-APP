import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'

function Profile() {
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3 p-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9 p-3'>
                    <h1>User Profile</h1>
                </div>
            </div>
        </div>
    </Layout>
    
  )
}

export default Profile