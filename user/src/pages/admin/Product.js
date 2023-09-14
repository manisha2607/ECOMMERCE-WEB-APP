import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Product = () => {
    const [products, setProduct] = useState([])

    // method for calling get product api
    const getAllProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`)
            // console.log(data.products)
            if (data?.success) {
                setProduct(data?.products)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error", error)
            toast.error("Something Went Wrong!")
        }
    }

    // for initial lifecycle
    useEffect(() => {
        getAllProduct()
    }, [])
    return (
        <Layout>
            <div>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>All Products</h1>
                        <div className='d-flex flex-wrap'>
                            {products?.map((p) => (
                                <Link key={p._id}
                                    to={`/dashboard/admin/products/${p.slug}`}
                                    className='product-link'
                                >
                                    <div className="card m-2" style={{ width: '18rem' }}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name} </h5>
                                            <h5 className='text-center'>Rs.{p.price} </h5>
                                            <p className="card-text">{p.description.substring(0, 16)}... </p>

                                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                        </div>
                                    </div>

                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Product