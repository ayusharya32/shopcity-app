import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { updateProfile } from "../redux/actions/userActions"

function Profile() {
    const dispatch = useDispatch()

    const userState = useSelector(state => state.userState)
    const { user, loading } = userState

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isProfileLoaded, setIsProfileLoaded] = useState(false)

    useEffect(() => {
        if(user && !isProfileLoaded) {
            setName(user.name)
            setEmail(user.email)

            setIsProfileLoaded(true)
        }
    }, [user, isProfileLoaded])

    function onUpdateProfileFormSubmitted(e) {
        e.preventDefault()
        
        const arePasswordsEmpty = password.trim() === "" && password.trim() === confirmPassword.trim()

        if(name.trim().length !== 0 && arePasswordsEmpty) {
            dispatch(updateProfile({ name }))
        }

        if(name.trim().length !== 0 && !arePasswordsEmpty) {
            
            if(password !== confirmPassword) {
                toast.error("Passwords do not match")
                return
            }

            dispatch(updateProfile({ name, password }))
        }
    }

    return (
        <section className="profile">
            {loading ? <Loader /> :
                <div className="container col-11 col-md-9 col-lg-6 mt-3 mb-3">
                    <h1 className="fs-1">My Profile</h1>
                    <form onSubmit={onUpdateProfileFormSubmitted} className="mt-4">
                        <div class="mb-3">
                            <label htmlFor="name" class="form-label fw-bold">Name</label>
                            <input 
                                name="name"
                                type="text" 
                                class="form-control" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}  
                            />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="email" class="form-label fw-bold">Email address</label>
                            <input 
                                name="email"
                                type="email" 
                                class="form-control" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                disabled
                            />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="password" class="form-label fw-bold">Password</label>
                            <input 
                                name="password"
                                type="password" 
                                class="form-control" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}  
                            />
                            <div id="passwordHelpBlock" class="form-text">
                                Your password must be greater than 6 characters with at least one uppercase, one lowercase and one special character.
                            </div>
                        </div>
                        <div class="mb-3">
                            <label htmlFor="confirmPassword" class="form-label fw-bold">Confirm Password</label>
                            <input 
                                name="confirmPassword"
                                type="password" 
                                class="form-control" 
                                id="confirmPassword" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}  
                            />
                        </div>
                        <button 
                            className="btn btn-primary" 
                            type="submit"
                            disabled={loading}>
                            Update
                        </button>
                    </form>
                </div>
            }
        </section>
    )
}

export default Profile
