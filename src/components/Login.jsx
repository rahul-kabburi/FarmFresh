import React, { useEffect, useState } from 'react'
import { loginStyles } from '../assets/dummyStyles'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCheck, FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'
import Logout from './Logout'

const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem('authToken'))  //checks if the user is logged in
    )
    const [showToast, setShowToast] = useState(false) //for showing success notifications
    const [error, setError] = useState('')           //stores error messages (eg: if "Remember Me" is unchecked)
    const navigate = useNavigate();                  
    const [formData, setFormData] = useState({       //formData holds the value of inputs
        email: "",
        password: "",
        remember: false,
    })
    const [showPassword, setShowPassword] = useState(false)  //toggles password visibility

    //snippet to check if the user is logged in or not (same code from App.jsx)
    useEffect(() => {
        const handler = () => {
            setIsAuthenticated(Boolean(localStorage.getItem('authToken')))
        }
        window.addEventListener('authStateChanged', handler)
        return () => window.removeEventListener('authStateChanged', handler)
    }, [])
    //if the token is already present in localStorage then show <Logout/> component (prevents re-logging in when already logged in) 
    if (isAuthenticated) {
        return <Logout />
    }

    //Form Handler (Handle input changes)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value, }))
    }

    //Handle form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.remember) {
            setError('You must agree to terms and conditions')
            return;
        }
        //Generate Token and store user data
        const token = 'mock_token'           //creates a fake token (mock only)
        const userData = {
            email: formData.email,
            token,
            timestamp: new Date().toISOString(),
        }
        localStorage.setItem('authToken', token) //stores token in localStorage
        localStorage.setItem('userData', JSON.stringify(userData)) //stores user data in localStorage
        setError('')
        setShowToast(true);                        //shows a success toast
        window.dispatchEvent(new Event('authStateChanged')) //triggers authStateCHanges event
        setTimeout(()=>{                     
            navigate('/')   //redirects to home page using setTiemout
        })
    }


    return (
        //Back to home arrow in login page
        <div className={loginStyles.page}>
            <Link to='/' className={loginStyles.backLink}>
                <FaArrowLeft className=' mr-2' /> Back to home
            </Link>

            {/**Toast notification (if login was successful, shows a green confirmation message) */}
            {showToast && (
                <div className={loginStyles.toast}>
                    <FaCheck className=' mr-2' /> Login Successful
                </div>
            )}

            {/**Login card */}
            <div className={loginStyles.loginCard}>
                <div className={loginStyles.logoContainer}>
                    <div className={loginStyles.logoOuter}>
                        <div className={loginStyles.logoInner}><FaUser className={loginStyles.logoIcon} /></div>
                    </div>
                </div>
                <h2 className={loginStyles.title}>Welcome Back</h2>
                <form onSubmit={handleSubmit} className={loginStyles.form}>
                    {/**Email */}
                    <div className={loginStyles.inputContainer}><FaUser className={loginStyles.inputIcon} />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email Address' required className={loginStyles.input} /></div>

                    <div className={loginStyles.inputContainer}>
                        <FaLock className={loginStyles.inputIcon} />
                        <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder='Password'
                            required className={loginStyles.passwordInput} />
                        <button type='button' onClick={() => setShowPassword((v) => !v)} className={loginStyles.toggleButton}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/**Remember me */}
                    <div className={loginStyles.rememberContainer}>
                        <label className={loginStyles.rememberLabel}>
                            <input type="checkbox" name="remember" checked={formData.remember}
                            onChange={handleChange}
                            className={loginStyles.rememberCheckbox} required />
                            Remember me
                        </label>
                        <Link to='#' className={loginStyles.forgotLink}>Forgot?</Link>
                    </div>
                    {error && <p className={loginStyles.error}>{error}</p> }
                    <button type='submit' className={loginStyles.submitButton}>Sign in</button>
                </form>
                {/**Takes the user to sign up page if they dont have an account */}
                <p className={loginStyles.signupText}>
                    Don't have an account?{' '}
                    <Link to='/signup' className={loginStyles.signupLink}>Sign Up</Link>
                </p>
            </div>

        </div>
    )
}

export default Login
