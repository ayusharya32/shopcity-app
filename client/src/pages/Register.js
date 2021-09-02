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
            <div className="container">
                <h1>Shop City</h1>
                { loading ? <Loader /> :
                    <form onSubmit={onRegisterFormSubmitted}>
                        <input 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text" 
                            placeholder="Name" 
                            required
                        />
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
                        <input 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            type="password" 
                            placeholder="Confirm Password"
                            required 
                        />
                        <button 
                            disabled={loading} 
                            className="btn-register btn-primary" 
                            type="submit">
                            Register
                        </button>                
                    </form>
                }
            </div>
        </section>
    )
}

export default Register
