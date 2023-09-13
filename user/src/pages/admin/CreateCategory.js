import React,{useEffect, useState} from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/form/CategoryForm'
import {Modal} from 'antd'

function CreateCategory() {
  const [categories, setCategories] = useState([])
  // state for creating category
  const [name, setName] = useState("")
  // state for antd modals
  const [visible , setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")
  // calling api for create category
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
      if(data?.success){
        toast.success(data.message)
        getAllCategory()
        setName("")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("Error in Creating Category",error)
      toast.error("Something Went Wrong in Input Form!")
    }
  }

  //get All-Category
  const getAllCategory = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      // console.log(data)
      if(data?.success){
        setCategories(data?.allCategory)
        toast.success(data.message)
      } else {
      toast.error(data.message)
      }
    } catch (error) {
      console.log("Error in Getting All-Category!",error)
      toast.error("Something went wrong!")
    }
  }
  // for initial lifecycyle
  useEffect(() => {
    getAllCategory()
  },[])
  // calling api for UpdateCategory
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`
      ,{name:updatedName})
      if(data?.success){
        toast.success(data.message)
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log("Error in Updating Category",error)
      toast.error("Something Went Wrong in Updating Category!")
      
    }
  }

  // calling apui for delete category
  const handleDelete = async (id) => {
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
      if(data?.success){
        toast.success(data.message)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("Errror",error)
      toast.error("Something went wrong in delete category!")
    }
  }
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3 p-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9 p-3'>
                    <h1> Manage Categories</h1>
                    <div className='p-3'>
                      <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                    </div>
                    <div className='w-75'>
                    <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button 
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true)
                            setUpdatedName(c.name)
                            setSelected(c)
                          }}
                          
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger ms-2"
                        onClick={() => {
                          handleDelete(c._id)
                        }}
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

                    </div>
                    <Modal onCancel={() => {setVisible(false)}} footer={null} open={visible}>
                      <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName}/>
                    </Modal>
                </div>
            </div>
         </div>
    </Layout>
   
  )
}

export default CreateCategory