import React from 'react'
import { NavLink } from 'react-router-dom'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'

function AdminMenu() {
  return (

    <div className='text-center'>
        <div className="list-group">
        <h4>Admin Portal</h4>
  <NavLink to={'/dashboard/admin/create-category'} className="list-group-item list-group-item-action">
    <BiSolidCategoryAlt /> Create-Category
  </NavLink>
  <NavLink to={'/dashboard/admin/create-product'} className="list-group-item list-group-item-action"> <MdProductionQuantityLimits /> Create-Product</NavLink>
  <NavLink to={'/dashboard/admin/products'} className="list-group-item list-group-item-action"> <FiUsers /> Products </NavLink>
  <NavLink to={'/dashboard/admin/users'} className="list-group-item list-group-item-action"> <FiUsers /> Users</NavLink>
  
</div>

    </div>
  )
}

export default AdminMenu