import { useState, useContext } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import AuthContext from '../context/AuthContext'
import './css/RegisterPage.css'  

function RegisterPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    username: '',
    password: '',
    password2: ''
  })

  const {registerUser} = useContext(AuthContext)

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      username: '',
      password: '',
      password2: ''
    }

    let isValid = true

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is a required field.'
      isValid = false
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is a required field.'
      isValid = false
    }

    if (!birthday.trim()) {
      newErrors.birthday = 'Birthday is a required field.'
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is a required field.'
      isValid = false
    } 
    
    if (!username.trim()) {
      newErrors.username = 'Username is a required field.'
      isValid = false
    }

    if (!password.trim()) {
      newErrors.password = 'Password is a required field.'
      isValid = false
    }

    if (!password2) {
      newErrors.password2 = 'Please confirm your password'
      isValid = false
    } 

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(validateForm()) {
      registerUser(email, username, firstName, lastName, birthday, password, password2)
    }
  }

  return (
    <div>
      <section className="register-section">
        <div className="register-container">
          <div className="register-row">
            <div className="register-column">
              <div className="register-card">
                <div className="register-card-inner">
                  <div className="register-card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="register-header">
                        <span className="register-title">
                          Welcome to <b>Register Page👋</b>
                        </span>
                      </div>
                      <h5 className="register-subtitle">
                        Sign Up
                      </h5>
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          placeholder="First Name"
                          onChange={e => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                          placeholder="Last Name"
                          onChange={e => setLastName(e.target.value)}
                        />
                        {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
                          placeholder="Birthday"
                          onChange={e => setBirthday(e.target.value)}
                        />
                        {errors.birthday && <div className="error-message">{errors.birthday}</div>}
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="Email Address"
                          onChange={e => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="error-message">{errors.email}</div>}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                          placeholder="Username"
                          onChange={e => setUsername(e.target.value)}
                        />
                        {errors.username && <div className="error-message">{errors.username}</div>}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="error-message">{errors.password}</div>}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
                          placeholder="Confirm Password"
                          onChange={e => setPassword2(e.target.value)}
                        />
                        {errors.password2 && <div className="error-message">{errors.password2}</div>}
                      </div>
                      <div className="form-button">
                        <button
                          className="register-btn"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                      <p className="login-prompt">
                        Already have an account?{" "}
                        <Link to="/login" className="login-link">
                          Login Now.
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RegisterPage