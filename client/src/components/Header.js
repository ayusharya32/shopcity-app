import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { logOut } from "../redux/actions/authActions"
import { getCurrentUser } from "../redux/actions/userActions"

function Header() {
    const history = useHistory()
    const dispatch = useDispatch()

    const authState = useSelector(state => state.authState)
    const { isAuthenticated } = authState

    const userState = useSelector(state => state.userState)
    const { user } = userState

    const [searchKeyword, setSearchKeyword] = useState('')

    const totalItems = user ? user.cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.quantity
    }, 0) : 0

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [dispatch])

    function onCartButtonClicked() {
        history.push("/cart")
    }

    function onSearchFormSubmitted(e) {
        e.preventDefault()

        if(searchKeyword.trim() === "" && !history.location.pathname.includes("search")) {
            return
        }

        if(searchKeyword.trim() === "" && history.location.pathname.includes("search")) {
            history.push("/")
            return
        }
        history.push(`/search/${searchKeyword}`)
    }

    function onLogOutButtonClicked() {
        dispatch(logOut())
    }

    return (
        <header>
            <nav>
                <div className="nav-left">
                    <p>Shop City</p>
                </div>
                <div className="nav-center">
                    <form onSubmit={onSearchFormSubmitted}>
                        <input 
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            type="text" 
                            placeholder="Search.." 
                        />
                        <button className="btn-primary" type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
                { (isAuthenticated && user) && (
                    <div className="nav-right">
                        <div className="dropdown">
                            <button className="btn-primary btn-dropdown">
                                {user.name} <span><i className="fas fa-angle-down"></i></span>
                            </button>
                            <div className="dropdown-content">
                                <Link to="/profile">My Profile</Link>
                                <Link to="/orders">My Orders</Link>
                                <button onClick={onLogOutButtonClicked}>Log Out</button>
                            </div>
                        </div>
                        <button 
                            onClick={onCartButtonClicked}
                            className="btn-primary btn-cart"
                        >
                            <i className="fas fa-shopping-cart"></i> ({totalItems})
                        </button>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header
