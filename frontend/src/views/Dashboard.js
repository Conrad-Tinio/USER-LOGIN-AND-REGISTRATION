import {useState, useEffect, useContext} from 'react'
import useAxios from "../utils/useAxios"
import {jwtDecode} from 'jwt-decode'
import AuthContext from '../context/AuthContext'
import './css/Dashboard.css' 

function Dashboard() {

    const [response, setResponse] = useState("")
    const api = useAxios();
    const token = localStorage.getItem("authTokens")

    const {user, logoutUser} = useContext(AuthContext)

    if (token){
      const decode = jwtDecode(token)
      var user_id = decode.user_id
      var username = decode.username
      var first_name = decode.first_name
      var last_name = decode.last_name
      var full_name = decode.full_name
      var image = decode.image
    }

    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await api.get("/test/")
          setResponse(response.data.response)
        } catch (error) {
          console.log(error);
          setResponse("Something went wrong")
        }
      }
      fetchData()
    }, [])

    
    useEffect(() => {
      const fetchPostData = async () => {
        try{
          const response = await api.post("/test/")
          setResponse(response.data.response)
        } catch (error) {
          console.log(error);
          setResponse("Something went wrong")
        }
      }
      fetchPostData()
    }, [])


  return (
   
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="dashboard-header">
          <span>
            <span className='welcome-message'>Welcome, <b className='username'> {first_name + " " + last_name}!</b>  </span>
          </span>
        </div>
        <div className='alert-success'>
          <strong>{response}</strong>
        </div>
        <div className='logout-btn-body'>
          <div className='logout-btn'> 
            <button className='logout-button' onClick={logoutUser}>Logout</button>
          </div>
        </div>
      </main>
    </div>
    
  )
}

export default Dashboard