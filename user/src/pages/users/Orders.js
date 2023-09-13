import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'

function Orders() {
  return (
    <Layout>
        <div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3 p-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9 p-3'>
                    <h1>Users Order</h1>
                </div>
            </div>
        </div>
    </Layout>
    
  )
}

export default Orders