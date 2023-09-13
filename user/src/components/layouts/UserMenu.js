import React from 'react'
import { NavLink } from 'react-router-dom'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import { MdProductionQuantityLimits } from 'react-icons/md'

function UserMenu() {
  return (
    <div className='text-center'>
        <div className="list-group">
        <h4>User Portal</h4>
  <NavLink to={'/dashboard/user/profile'} className="list-group-item list-group-item-action">
    <BiSolidCategoryAlt /> User Profile
  </NavLink>
  <NavLink to={'/dashboard/user/order'} className="list-group-item list-group-item-action"> <MdProductionQuantityLimits /> User Order</NavLink>
  
</div>

    </div>
  )
}

export default UserMenu