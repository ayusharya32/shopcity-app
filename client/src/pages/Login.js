import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../redux/actions/authActions";
import { toast } from 'react-toastify'
import Loader from "../components/Loader"

function Login({ history }) {
    const dispatch = useDispatch()
    const authState = useSelector(state => state.authState)

    const { isAuthenticated, loading, error, success } = authState

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(isAuthenticated) {
            history.push("/")
        }

        if(error) {
            toast.error(getAuthErrorMessage(error))
        }

        if(success) {
            toast.success(success)
            setEmail('')
            setPassword('')
        }
    }, [isAuthenticated, error, success, history])

    function onLoginFormSubmitted(e) {
        e.preventDefault()

        dispatch(loginUser(email, password))
    }

    function getAuthErrorMessage(err) {
        if('message' in err) {
            return err.message
        } 
        
        return `${err.name || ""} ${err.email || ""} ${err.password || ""}`
    }

    return (
        <section className="login">
            <div className="login-content">
                <h1>Shop City</h1>
                { loading ? <Loader /> :
                    <form onSubmit={onLoginFormSubmitted}>            
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="text" 
                            placeholder="Email" 
                            required
                        />                
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password" 
                            placeholder="Password" 
                            required
                        /> 
                        <button 
                            disabled={loading} 
                            className="btn-login btn-primary" 
                            type="submit">
                            Log In
                        </button>               
                    </form>
                }
            </div>
            <div className="sign-up">
                <p>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </section>
    )
}

export default Login
