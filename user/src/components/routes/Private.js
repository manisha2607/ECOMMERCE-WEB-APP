import { useEffect, useState } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

function Private() {
    const [ok, setOk] = useState(false)

    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const checkAuth = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/user-auth`)
            if(res.data.ok){
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if(auth?.token) {
            checkAuth()
        }
    },[auth.token])
    return ok ? <Outlet /> : <Spinner />
}

export default Private