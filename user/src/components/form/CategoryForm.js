import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (

    <>
     <form onSubmit={handleSubmit} className='w-75'>
  <div className="mb-3">
    <input type="text" onChange={(e) => setValue(e.target.value)} value={value} className="form-control" placeholder='Create New Category'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
    </form>

    </>
  )
}

export default CategoryForm