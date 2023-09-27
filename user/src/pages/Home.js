import React, { useState, useEffect } from 'react'
import Layout from '../components/layouts/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Checkbox } from 'antd'

function Home() {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])

  // getting all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`)
      // console.log(data.products)
      if (data?.success) {
        setProducts(data.products)
      }

    } catch (error) {
      console.log("Error", error)
      toast.error("Something Went Wrong!")
    }
  }

  // for initial lifecycle
  useEffect(() => {
    getAllProducts()
  }, [])

  //get All-Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      // console.log(data.allCategory)
      if (data?.success) {
        setCategories(data?.allCategory)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("Error in Getting All-Category!", error)
      toast.error("Something went wrong!")
    }
  }
  // for initial lifecycyle
  useEffect(() => {
    getAllCategory()
  }, [])

  // Handling filter
  const handleFilter = async (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      console.log(all)
      setChecked(all)
    }
  }
  return (
    <Layout title={"Home-Page "}>
      <div className='row mt-3'>
        <div className='col-md-2 d-flex flex-column'>
          <h5 className='text-center'>Filter by category</h5>
          {categories?.map((c) => (
            <Checkbox className='m-1' key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
        <div className='col-md-10'>
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name} </h5>
                  <h5 className='text-center'>Rs.{p.price} </h5>
                  <p className="card-text">{p.description.substring(0, 16)}... </p>

                  {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
                <button className='btn btn-primary ms-1'>More Details</button>
                <button className='btn btn-secondary ms-1'>Add Cart</button>
              </div>


            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home