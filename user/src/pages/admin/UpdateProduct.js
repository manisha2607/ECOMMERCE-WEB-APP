import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'


const { Option } = Select

function UpdateProduct() {
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    // const [category, setCategory] = useState("")
    const [shipping, setShipping] = useState("")
    const [selectCategory, setSelectCategory] = useState("")
    const [displayCategory, setDisplayCategory] = useState("")
    const [id, setId] = useState("")

    const navigate = useNavigate()
    const params = useParams()

    //get single product
    const getSingleProduct = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setName(data.product.name)
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setSelectCategory(data.product.category._id)
            setDisplayCategory(data.product.category.name)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)


        } catch (error) {
            console.log("Error", error)
            toast.error("Something Went Wrong!")
        }
    }
    // for initial lifecycle for get single product
    useEffect(() => {
        getSingleProduct()
    }, [])

    //get AllProducts
    const getAllCtegory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            console.log(data)
            if (data?.success) {
                setCategories(data?.allCategory)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error", error)
            toast.error("Something went Wrong!")
        }
    }
    // for initial lifeCycle
    useEffect(() => {
        getAllCtegory()
    }, [])

    // handlinmg create
    const handleUpdate = async (e) => {
        e.preventDefault()
        // console.log("we are here")
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("category", selectCategory)
            productData.append("shipping", shipping)
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData)
            if (data?.success) {
                toast.success(data.message)
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log("Error", error)
            toast.error("Something Wenr Wrong!")
        }
    }
    // calling api for delete the product
    const handleDelete = async () => {
        try {
            let ans = window.prompt("Are you sure to delete this product ?")
            if (!ans) {
                return
            }
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
            if (data?.success) {
                toast.success(data.message)
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error", error)
            toast.error("Something Went Wrong while deleting product!")
        }
    }
    return (
        <Layout title={"Update-Product"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3 p-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 p-3'>
                        <h1> Update Product </h1>
                        <div className='m-1 w-75'>
                            <Select bordered={false}
                                placeholder='Select a Category'
                                size='large'
                                showSearch className='form-select mb-3'
                                onChange={(value, Option) => {
                                    setSelectCategory(value)
                                    setDisplayCategory(Option)
                                }}
                                value={displayCategory}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' name='photo' accept='image/*'
                                        onChange={(e) => {
                                            setPhoto(e.target.files[0])
                                        }} hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ? (
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)}
                                            alt='Product-Photo'
                                            height={"200px"}
                                            className='img img-responsive'
                                        />
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${id}`}
                                            alt='Product-Photo'
                                            height={"200px"}
                                            className='img img-responsive'
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={name}
                                    placeholder='Enter Name of Product'
                                    className='form-control'
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='mb-3'>
                                <textarea type='text' value={description}
                                    placeholder='Write Description'
                                    className='form-control'
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='mb-3'>
                                <input type='number' value={price}
                                    placeholder='Enter Price of Product'
                                    className='form-control'
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='mb-3'>
                                <input type='number' value={quantity}
                                    placeholder='Enter Quantity of Product'
                                    className='form-control'
                                    onChange={(e) => {
                                        setQuantity(e.target.value)
                                    }}
                                />
                            </div>
                            <Select bordered={false}
                                placeholder='Select Shipping'
                                size='large'
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => {
                                    setShipping(value)
                                }}
                                value={shipping ? "YES" : "NO"}
                            >
                                <Option value='0'>No</Option>
                                <Option value='1'>YES</Option>
                            </Select>
                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-primary'
                                onClick={handleUpdate}
                            >Update Product</button>
                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-danger'
                                onClick={handleDelete}
                            >Delete Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default UpdateProduct