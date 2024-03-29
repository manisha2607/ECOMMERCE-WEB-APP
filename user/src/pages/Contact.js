import React from 'react'
import Layout from '../components/layouts/Layout'
import {BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi';

function Contact() {
  return (
    <Layout title={"Contact-Us"}>
    <div className='row contact-us'>
      <div className='col-md-6'>
        <img className='contact-img' src='/images/Contact.jpg' alt='Contact-Image'
        style={{width:"90%"}} />
      </div>
      <div className="col-md-5 text-cont about-text">
          <h1 className="bg-dark p-2 text-white text-center">Contact</h1>
          <p className="text-justify mt-2">
            We are known for the better quality with best price, still if you
            want to know more about the products, shipping trust, payment
            security etc. and any kind of customer support.
          </p>
          <p className="text-justify mt-2">
            Feel free to reach out to us because we are here for helping you end
            to end. We are available 24x7.
          </p>
         
          <p className='mt-3'>
            <BiMailSend /> : vaidyahimanshu502@gmail.com
          </p>
          <p className='mt-3'>
            <BiPhoneCall /> :+91-829-401-3841{" "}
          </p>
          <p className='mt-3'>
            <BiSupport /> : 012-3456789{" "}
          </p>
        </div>
     </div>
    </Layout>
  )
  }


export default Contact
// import Layout from '../components/layouts/Layout'

  
