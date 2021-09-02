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
                <div className="container">
                    <h1 className="section-title">My Profile</h1>
                    <form onSubmit={onUpdateProfileFormSubmitted}>
                        <div className="name">
                            <label htmlFor="name">Name</label>
                            <input 
                                name="name" 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}     
                            />
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input 
                                name="email" 
                                type="text" 
                                value={email} 
                                disabled     
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input 
                                name="password" 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="confirm-password">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input 
                                name="confirm-password" 
                                type="password" 
                                placeholder="Confirm Password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn-update-profile btn-primary" type="submit">Update</button>
                    </form>
                </div>
            }
        </section>
    )
}

export default Profile
