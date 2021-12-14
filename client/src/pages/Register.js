import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { registerUser } from "../redux/actions/authActions"

function Register({ history }) {
    const dispatch = useDispatch()
    const authState = useSelector(state => state.authState)
    const { isAuthenticated, loading, error, success } = authState

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if(isAuthenticated) {
            history.push("/")
        }

        if(success) {
            toast.success(success)
        }

        if(error) {
            toast.error(getAuthErrorMessage(error))
        }
    }, [isAuthenticated, success, error, history])

    function onRegisterFormSubmitted(e) {
        e.preventDefault()

        if(password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        dispatch(registerUser(name, email, password))
    }

    function getAuthErrorMessage(err) {
        if('message' in err) {
            return err.message
        } 
        
        return `${err.name || ""} ${err.email || ""} ${err.password || ""}`
    }

    return (
        <section className="register">
            <div className="register-content col-9 col-md-6 col-xxl-4 p-3 mx-5">
                <h1 className="text-center mb-3">Shop City</h1>
                { loading ? <Loader /> :
                    <form onSubmit={onRegisterFormSubmitted}>
                        <div className="mb-3">
                            <input 
                                onChange={(e) => setName(e.target.value)}
                                type="text" 
                                className="form-control"
                                placeholder="Name"
                                required
                            />
                        </div>
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
                        <div className="mb-3">
                            <input 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password" 
                                className="form-control"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                        <div className="text-center py-1 d-grid gap-2">
                            <button 
                                disabled={loading}
                                type="submit" 
                                className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>
                    </form>              
                }
            </div>
        </section>
    )
}

export default Register
