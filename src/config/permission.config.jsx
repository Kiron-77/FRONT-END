import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import LoadingComponent from "../component/common/loading/loading.component"
import Authsvc from "../pages/auth/auth.service"

const CheckPermission = ({accessBy,children }) => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const getLoggedInUser = async()=> {
    try {
        const userDetail = await Authsvc.getLoggedInUserDetail()
        if (!userDetail) {
            localStorage.removeItem("_au")
            localStorage.removeItem("_ud")
            toast.error("Invalid Token")
            navigate("/login")
        } else {
            localStorage.setItem("_ud",JSON.stringify({userId:userDetail.result._id,name:userDetail.result.name,role:userDetail.result.role}))
            if (userDetail.result.role === accessBy) {
                setLoading(false)
            } else {
                toast.warn("You do not have previledge to access this pannel")
                navigate("/"+userDetail.result.role)
            }
        }
    } catch (exception) {
        console.log(exception)
        toast.error("Something went wrong!!")
        navigate("/")
    }
    }
    useEffect(() => {
        let token = localStorage.getItem("_au") || null
        if (token) {
        getLoggedInUser(token)
        } else {
            toast.error("Please login to access")
            navigate("/login")
        }
    },[])
    return (<>
        {
            loading ? <LoadingComponent/> : children
    }
    </>)
}
export default CheckPermission