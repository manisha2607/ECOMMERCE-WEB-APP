import React from 'react'
import Layout from '../components/layouts/Layout'
import { useAuth } from '../Context/auth'

function Home() {
  const [auth, setAuth] = useAuth()

  return (
    <Layout title={"Home-Page "}>
    <h1>Homepage</h1>
    <pre>{JSON.stringify(auth, null, 4)} </pre>
    </Layout>
  )
}

export default Home