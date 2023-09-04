import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const PublicRoute = ({ children }) => {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies()

  useEffect(() => {
    if (cookies["token"]) {
      return navigate("/")
    }
  })
  
  return children
}

export default PublicRoute
