import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import {Toaster} from 'react-hot-toast'
function Layout({ children, title, description, keywords, author }) {
  return (
    
    <div>
      <Header />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <main style={{minHeight:'80vh'}}>
          <Toaster />
          {children}
       </main>
      
      <Footer />
    </div>
   
  )
}

// setting defalut SEO
Layout.defaultProps = {
  title: "Ecom-Web-App",
  description: "MERN Full Stack Project",
  keywords: "MERN, React, Mongodb, Node, Express",
  author: "Manisha"
}
export default Layout