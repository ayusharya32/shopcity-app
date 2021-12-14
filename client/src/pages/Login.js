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
            <div className="login-content col-9 col-md-6 col-xxl-4 p-3 mx-5">
                <h1 className="text-center py-2">Shop City</h1>
                { loading ? <Loader /> :
                    <form onSubmit={onLoginFormSubmitted}>
                        <div className="mb-3">
                            <input 
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                                className="form-control"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" 
                                className="form-control" 
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="text-center py-1  d-grid gap-2">
                            <button 
                                disabled={loading}
                                type="submit" 
                                className="btn btn-primary">
                                Log In
                            </button>
                        </div>
                    </form>
                }
            </div>
            <div className="sign-up container col-9 col-md-6 col-xxl-4 my-4 py-3">
                <p className="text-center">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </section>
    )
}

export default Login
