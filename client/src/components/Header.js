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
            <nav class="navbar navbar-expand-lg navbar-light bg-light custom-nav">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Shop City</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    { (isAuthenticated && user) && (
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle ms-1" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {user.name} </a>
                                <ul class="dropdown-menu mb-1" aria-labelledby="navbarDropdown">
                                    <li><Link class="dropdown-item" to="/profile">My Profile</Link></li>
                                    <li><Link class="dropdown-item" to="/orders">My Orders</Link></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={onLogOutButtonClicked}>Log Out</button></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <button 
                                    onClick={onCartButtonClicked}
                                    className="btn btn-success ms-2"
                                >
                                    <i className="fas fa-shopping-cart"></i> Cart ({totalItems})
                                </button>
                            </li>
                        </ul>
                    )}
                    <form class="d-flex" onSubmit={onSearchFormSubmitted}>
                        <input 
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            class="form-control me-2" 
                            type="search" 
                            placeholder="Search.." 
                            aria-label="Search" 
                        />
                        <button 
                            class="btn btn-success" 
                            type="submit">
                            Search
                        </button>
                    </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
